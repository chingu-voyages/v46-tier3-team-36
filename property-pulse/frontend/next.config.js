/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*` // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
