import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ fix: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "MetagridWidget",
      // the proper extensions will be added
      fileName: "vue-metagrid-widget",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
