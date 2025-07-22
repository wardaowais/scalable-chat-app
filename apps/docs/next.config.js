/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  experimental: {
    turbo: {
      rules: {
        // Disable experimental turbo
        "*.{js,jsx,ts,tsx}": [], 
      },
    },
  },
};

export default nextConfig;
