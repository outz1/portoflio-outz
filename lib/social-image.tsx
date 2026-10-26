import { ImageResponse } from "next/og"

export const socialImageSize = { width: 1200, height: 630 }
export const socialImageAlt = "Eduardo de Brito, Full Stack Developer com foco em software seguro"

// Imagem de prévia usada ao compartilhar o link (LinkedIn, WhatsApp, X)
export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 78% 30%, #2a2a2a 0%, #0d0d0d 38%, #050505 70%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#a1a1a1" }}>{"</>"}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a1a1a1" }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#FF5F1F" }} />
            outzdev.me
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 8, color: "#a1a1a1", marginBottom: 28 }}>
            EDUARDO DE BRITO SOARES
          </div>
          <div style={{ fontSize: 96, fontWeight: 300, lineHeight: 1, letterSpacing: -2 }}>Full Stack Developer</div>
          <div style={{ fontSize: 56, fontStyle: "italic", color: "rgba(255,255,255,0.6)", marginTop: 18 }}>
            com foco em software seguro.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Security"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "10px 22px",
                fontSize: 22,
                color: "#c4c4c4",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    socialImageSize,
  )
}
