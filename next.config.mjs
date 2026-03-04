/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/notes",
        destination: "/api/notes",
      },
    ];
  },
};

export default nextConfig;
