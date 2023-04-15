import { config } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

config({ path: '.env.local', override: true, debug: true });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
});
