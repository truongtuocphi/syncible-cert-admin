// next-sitemap.config.ts

import { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.syncible.com', // URL trang web của bạn
  generateRobotsTxt: true, // Tạo robots.txt tự động
  sitemapSize: 7000, // Giới hạn số URL trong một sitemap (mặc định 5000)
  changefreq: 'daily', // Tần suất Google nên crawl trang web
  priority: 0.7, // Độ ưu tiên của các URL
};

export default config;
