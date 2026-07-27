"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MathUtils } from "three"
import type { Mesh, ShaderMaterial } from "three"

// Ashima simplex noise — single evaluation reused for both base displacement
// and spikes (via pow), kept lean since this runs per-vertex every frame.
const NOISE_GLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

// NOTE on performance: the original file used icosahedronGeometry(1.8, 64).
// The second arg is subdivision "detail", which grows the triangle count by
// 4^detail — detail 64 is not a valid/renderable value (it asks for ~10^38
// faces) and would hang or crash the tab. Detail 5 gives a dense-looking
// wireframe (~20k faces) at a cost that runs fine even on integrated/low-end
// GPUs. Bump to 6 only if you've profiled headroom.
const SPHERE_DETAIL = 5

function Sphere() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)
  const { pointer } = useThree()

  const aggroRef = useRef(0)
  const [pressed, setPressed] = useState(false)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAggro: { value: 0 },
    }),
    [],
  )

  const vertexShader = `
    uniform float uTime;
    uniform float uAggro;
    varying float vDisplacement;

    ${NOISE_GLSL}

    float hash(float n) { return fract(sin(n) * 43758.5453123); }

    void main() {
      float speed = mix(0.15, 0.9, uAggro);
      float amp = mix(0.15, 0.55, uAggro);

      float n = snoise(position * (1.5 + uAggro * 2.0) + uTime * speed);
      float displacement = n * amp;

      // reuse the same noise sample for spikes instead of a second
      // evaluation — cheaper, and reads fine since it's driven by uAggro anyway
      float spike = pow(max(n, 0.0), 3.0);
      displacement += spike * uAggro * 0.6;

      vDisplacement = displacement;

      vec3 newPosition = position + normal * displacement;

      // glitch jitter, only active past a hash threshold so it stays rare
      float glitchTime = floor(uTime * 18.0);
      float glitchAmt = step(0.92, hash(glitchTime)) * uAggro;
      newPosition += normal * hash(dot(position, position) + glitchTime) * glitchAmt * 0.08;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform float uTime;
    uniform float uAggro;
    varying float vDisplacement;

    void main() {
      float intensity = 0.3 + vDisplacement * 2.0;

      // theme: charcoal/gray at rest, bleeding into orange under aggro
      vec3 calm = vec3(0.32, 0.33, 0.34);
      vec3 hot  = vec3(1.0, 0.42, 0.05);
      vec3 color = mix(calm, hot, uAggro) * intensity;

      float scan = sin(gl_FragCoord.y * 0.6 + uTime * 20.0) * 0.5 + 0.5;
      float flicker = 1.0 - (scan * 0.15 * uAggro);

      vec3 finalColor = color * flicker;
      float alpha = 0.55 + uAggro * 0.35;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  useEffect(() => {
    const handleDown = () => setPressed(true)
    const handleUp = () => setPressed(false)
    window.addEventListener("pointerdown", handleDown, { passive: true })
    window.addEventListener("pointerup", handleUp, { passive: true })
    return () => {
      window.removeEventListener("pointerdown", handleDown)
      window.removeEventListener("pointerup", handleUp)
    }
  }, [])

  useFrame((state, delta) => {
    const dist = Math.min(1, Math.hypot(pointer.x, pointer.y))
    const proximity = 1 - dist
    const target = Math.min(1, proximity * 1.1 + (pressed ? 0.6 : 0))

    // fast attack, slow release
    const rate = target > aggroRef.current ? 10 : 2.2
    aggroRef.current = MathUtils.damp(aggroRef.current, target, rate, delta)

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta
      materialRef.current.uniforms.uAggro.value = aggroRef.current
    }

    if (meshRef.current) {
      const spin = MathUtils.lerp(0.05, 0.6, aggroRef.current)
      meshRef.current.rotation.y += delta * spin
      meshRef.current.rotation.x = MathUtils.lerp(
        meshRef.current.rotation.x,
        pointer.y * (0.2 + aggroRef.current * 0.5),
        0.08,
      )
      meshRef.current.rotation.z = MathUtils.lerp(
        meshRef.current.rotation.z,
        pointer.x * (0.2 + aggroRef.current * 0.5),
        0.08,
      )
      meshRef.current.scale.setScalar(1 + aggroRef.current * 0.08)
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, SPHERE_DETAIL]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
      />
    </mesh>
  )
}

export function SentientSphere() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-white/10 animate-pulse" />
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="w-full my-0 h-full py-0"
      // capped dpr keeps fragment cost sane on high-density/retina screens
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.5} />
      <Sphere />
    </Canvas>
  )
}