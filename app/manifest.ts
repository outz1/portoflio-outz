import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "outz.dev - Eduardo de Brito | Portfólio",
    short_name: "outz.dev",
    description: "Portfólio de Eduardo de Brito, Full Stack Developer com foco em software seguro.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}