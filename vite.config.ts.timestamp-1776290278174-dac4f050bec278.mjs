// vite.config.ts
import { defineConfig } from "file:///C:/cyusa/PERSONAL%20PROJECTS/A.G.R.U.N.I/worker1/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/cyusa/PERSONAL%20PROJECTS/A.G.R.U.N.I/worker1/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\cyusa\\PERSONAL PROJECTS\\A.G.R.U.N.I\\worker1";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@components": resolve(__vite_injected_original_dirname, "src/components"),
      "@composables": resolve(__vite_injected_original_dirname, "src/composables"),
      "@stores": resolve(__vite_injected_original_dirname, "src/stores"),
      "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
      "@assets": resolve(__vite_injected_original_dirname, "src/assets"),
      "@views": resolve(__vite_injected_original_dirname, "src/views"),
      "@i18n": resolve(__vite_injected_original_dirname, "src/i18n")
    }
  },
  server: {
    port: 3e3,
    host: true,
    open: true
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          i18n: ["vue-i18n"],
          icons: ["@iconify/vue"]
        }
      }
    }
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxjeXVzYVxcXFxQRVJTT05BTCBQUk9KRUNUU1xcXFxBLkcuUi5VLk4uSVxcXFx3b3JrZXIxXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxjeXVzYVxcXFxQRVJTT05BTCBQUk9KRUNUU1xcXFxBLkcuUi5VLk4uSVxcXFx3b3JrZXIxXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9jeXVzYS9QRVJTT05BTCUyMFBST0pFQ1RTL0EuRy5SLlUuTi5JL3dvcmtlcjEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFt2dWUoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAnQGNvbXBvbmVudHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICdAY29tcG9zYWJsZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb3NhYmxlcycpLFxyXG4gICAgICAnQHN0b3Jlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3N0b3JlcycpLFxyXG4gICAgICAnQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcclxuICAgICAgJ0Bhc3NldHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMnKSxcclxuICAgICAgJ0B2aWV3cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3ZpZXdzJyksXHJcbiAgICAgICdAaTE4bic6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2kxOG4nKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIG9wZW46IHRydWVcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXHJcbiAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgdmVuZG9yOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10sXHJcbiAgICAgICAgICBpMThuOiBbJ3Z1ZS1pMThuJ10sXHJcbiAgICAgICAgICBpY29uczogWydAaWNvbmlmeS92dWUnXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGVmaW5lOiB7XHJcbiAgICBfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fOiB0cnVlLFxyXG4gICAgX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX186IGZhbHNlLFxyXG4gICAgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXzogZmFsc2VcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsU0FBUyxvQkFBb0I7QUFDclcsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQzdCLGVBQWUsUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNsRCxnQkFBZ0IsUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxNQUNwRCxXQUFXLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzFDLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDeEMsV0FBVyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMxQyxVQUFVLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQ3hDLFNBQVMsUUFBUSxrQ0FBVyxVQUFVO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsVUFDckMsTUFBTSxDQUFDLFVBQVU7QUFBQSxVQUNqQixPQUFPLENBQUMsY0FBYztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTiwyQkFBMkI7QUFBQSxJQUMzQix5QkFBeUI7QUFBQSxJQUN6QiwyQkFBMkI7QUFBQSxFQUM3QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
