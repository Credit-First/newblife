/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  env: {
    PORT: 8000,
    NEXT_PUBLIC_NETWORK: '',
    NEXT_PUBLIC_TEST_NETWORK: 'https://testnet.bscscan.com',
    NEXT_PUBLIC_RPC_URL: '',
    NEXT_PUBLIC_TEST_RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    NEXT_PUBLIC_MULTICALL: '',
    NEXT_PUBLIC_MULTICALL_DIVISOR: ''
  },
};
