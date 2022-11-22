// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { viteMockServe } from 'vite-plugin-mock';

// Utilities
import { ConfigEnv, defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import DevConfig from './configs/dev-config.json';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv) => {
  const isDev = command === 'serve';

  return defineConfig({
    plugins: [
      vue(),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: isDev
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./app', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    },
    server: {
      host: '0.0.0.0',
      port: DevConfig.DEV_SERVER_PORT,
      open: true
    }
  });
};
