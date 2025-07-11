/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.pexels.com', 'avatars.githubusercontent.com'],
  },
  distDir: '.next'
}

module.exports = nextConfig