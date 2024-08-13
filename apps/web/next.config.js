import bundleAnalyzerPlugin from "@next/bundle-analyzer"

import * as dotenv from "dotenv"

dotenv.config({ path: "../../.env" })

const withBundleAnalyzer = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === "true",
})
import.meta.url
/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ hostname: "github.com" }],
  },
}

export default withBundleAnalyzer(nextConfig)
