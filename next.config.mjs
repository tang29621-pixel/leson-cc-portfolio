/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    // AVIF → WebP 顺序；浏览器不支持 AVIF 时降级到 WebP
    formats: ["image/avif", "image/webp"],
    // 30 天：优化后的图片 URL 是不可变 hash
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    esmExternals: "loose",
    // 仅 framer-motion 在 Next 14 兼容列表里；three.js / drei / fiber 是 ESM+副作用，不加
    optimizePackageImports: ["framer-motion"],
  },
  // GLB 模型走原始 public 即可，无需配置 webpack
};

export default nextConfig;
