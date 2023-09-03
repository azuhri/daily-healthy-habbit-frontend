/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'],
  },
  // Add the following line to support the new `experimental: true` flag for the `next/router` module
  router: {
    experimental: true,
  },
}


module.exports = nextConfig
