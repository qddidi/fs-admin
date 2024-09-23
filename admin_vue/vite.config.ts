import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  server: {
    port: 8999,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // 设置 `@` 指向 `src` 目录
    },
  },
});
