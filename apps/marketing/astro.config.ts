import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { defineConfig } from "astro/config"
import "dotenv/config"

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap(), react()],
})
