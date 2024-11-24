/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Replace with your specific domain(s)
      },
    ],
  },
  // api: {
  //   bodyParser: false,
  //   responseLimit: false,
  // },
}

module.exports = nextConfig 