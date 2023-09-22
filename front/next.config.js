/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://j9a409.p.ssafy.io:8080/:path*',
      },
    ]
  },
}

module.exports = nextConfig
