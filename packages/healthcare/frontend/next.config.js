
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["ui", "config"],
  images: {
    remotePatterns: [
     
    ],
  },
}

module.exports = nextConfig