/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '*' }] },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true, typescript: true } }],
    });

    config.resolve.fallback = { fs: false, net: false, tls: false };

    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
