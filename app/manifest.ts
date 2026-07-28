import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "outz.dev - Eduardo de Brito | Portfólio",
    short_name: "outz.dev",
    description: "Fullstack Developer & Cybersecurity Enthusiast | Portfólio",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}