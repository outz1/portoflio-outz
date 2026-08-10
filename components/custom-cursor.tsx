"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

export function CustomCursor() {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 500, damping: 32, mass: 0.35 })
  const y = useSpring(pointerY, { stiffness: 500, damping: 32, mass: 0.35 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)")
    setHasFinePointer(pointerQuery.matches)

    const handlePointerChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches)
    pointerQuery.addEventListener("change", handlePointerChange)
    return () => pointerQuery.removeEventListener("change", handlePointerChange)
  }, [])

  useEffect(() => {
    if (!hasFinePointer || reduceMotion) return

    const handleMouseMove = (event: MouseEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setIsVisible(true)
    }
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      setIsHovering(Boolean(target.closest("a, button, [data-cursor-hover]")))
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [hasFinePointer, pointerX, pointerY, reduceMotion])

  if (!hasFinePointer || reduceMotion) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-3 w-3 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-12 w-12 rounded-full border border-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 1 : 0.5, opacity: isVisible && isHovering ? 1 : 0 }}
      />
    </>
  )
}
