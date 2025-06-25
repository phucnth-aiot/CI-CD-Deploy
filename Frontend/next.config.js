// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // backend chạy trên 3000
      },
    ];
  },
};

module.exports = nextConfig;
