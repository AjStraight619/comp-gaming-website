import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude test files from server build
      config.module.rules.push({
        test: /\.test\.(js|ts|tsx)$/,
        use: 'ignore-loader',
      });
    }
    return config;
  },
  /* other config options here */
};

export default nextConfig;
