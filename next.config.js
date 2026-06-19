/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Temporarily ignore build errors due to React Three Fiber not fully supporting React 19 JSX types yet
    // TODO: Remove this once @react-three/fiber and @react-three/drei are updated for React 19
    ignoreBuildErrors: true,
  },
}

export default nextConfig