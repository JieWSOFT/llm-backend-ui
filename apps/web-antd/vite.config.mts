import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/test': {
            changeOrigin: true,
            headers: {
              referer: 'http://192.168.2.197:3333',
            },
            rewrite: (path) => path.replace(/^\/test/, ''),
            // mock代理目标地址
            target: 'http://localhost:3332/api/v1/',
            ws: true,
          },
        },
      },
    },
  };
});
