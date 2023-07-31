/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "savoy.nordicmade.com",
        // pathname: "/my-bucket/**",
      },
    ],
  },
};

module.exports = nextConfig;
