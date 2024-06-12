/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '*' }] },

  // redirects: async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/mint',
  //       permanent: false,
  //     },
  //   ];
  // },

  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // config webpack for svgr to use icon as React component
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true, typescript: true } }],
    });

    config.resolve.fallback = { fs: false, net: false, tls: false };

    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
};

export default nextConfig;
