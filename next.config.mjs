/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import rehypeSlug from 'rehype-slug';
import remaerkGfm from 'remark-gfm';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  options: {
    remarkPlugins: [remaerkGfm],
    rehypePlugins: [rehypeSlug],
    // Additional MDX-specific configurations
  },
});

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
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: false,

  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
};

export default withNextIntl(withMDX(nextConfig));
