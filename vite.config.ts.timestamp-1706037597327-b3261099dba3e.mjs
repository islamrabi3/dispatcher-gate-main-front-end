// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/node_modules/unplugin-vue-components/dist/vite.js";
import VueRouter from "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/node_modules/unplugin-vue-router/dist/vite.mjs";
import Layouts from "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Yousoufm/Documents/Work/Development/dispatcher-gate/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({}),
    vue(),
    Components({
      dts: true,
      directoryAsNamespace: true
    }),
    Layouts()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "vitest.setup.ts",
    server: {
      deps: {
        inline: ["vuetify"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxZb3Vzb3VmbVxcXFxEb2N1bWVudHNcXFxcV29ya1xcXFxEZXZlbG9wbWVudFxcXFxkaXNwYXRjaGVyLWdhdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFlvdXNvdWZtXFxcXERvY3VtZW50c1xcXFxXb3JrXFxcXERldmVsb3BtZW50XFxcXGRpc3BhdGNoZXItZ2F0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvWW91c291Zm0vRG9jdW1lbnRzL1dvcmsvRGV2ZWxvcG1lbnQvZGlzcGF0Y2hlci1nYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IFZ1ZVJvdXRlciBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyL3ZpdGUnXHJcbmltcG9ydCBMYXlvdXRzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1sYXlvdXRzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBWdWVSb3V0ZXIoe30pLFxyXG4gICAgdnVlKCksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgTGF5b3V0cygpXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgc2V0dXBGaWxlczogJ3ZpdGVzdC5zZXR1cC50cycsXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgZGVwczoge1xyXG4gICAgICAgIGlubGluZTogWyd2dWV0aWZ5J11cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWCxTQUFTLGVBQWUsV0FBVztBQUV2WixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sYUFBYTtBQU55TixJQUFNLDJDQUEyQztBQVM5UixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxVQUFVLENBQUMsQ0FBQztBQUFBLElBQ1osSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsc0JBQXNCO0FBQUEsSUFDeEIsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixRQUFRLENBQUMsU0FBUztBQUFBLE1BQ3BCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
