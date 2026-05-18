import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Generadora San Felipe",
    short_name: "GSF",
    description:
      "Central de Ciclo Combinado de 467 MW en República Dominicana",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a1929",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
