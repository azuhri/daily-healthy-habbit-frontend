/** @type {import('next').NextConfig} */
const withPWA  = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
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
