/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'image.tmdb.org',
      port: '',
      pathname: '/t/p/w500/*',
    }
  ]
  }
}

module.exports = nextConfig
