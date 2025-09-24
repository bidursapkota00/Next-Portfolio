"use client";

import { useEffect } from "react";
import mermaid from "mermaid";

export default function LoadMermaid() {
  useEffect(() => {
    async function initializeMermaid() {
      mermaid.initialize({
        theme: "default",
        startOnLoad: false,
        securityLevel: "loose",
        fontFamily: "inherit",
        fontSize: 16,
        themeCSS: `
                foreignObject {
                  overflow: visible;
                }
              `,
      });
      await mermaid.run({
        querySelector: ".mermaid",
      });
    }
    initializeMermaid();
  }, []);
  return null;
}
