import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function normalizeBasePath(value: string | undefined) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export default defineConfig(({ isSsrBuild }) => {
  return {
    base: normalizeBasePath(process.env.SITE_BASE_PATH),
    plugins: [react()],
    build: isSsrBuild
      ? undefined
      : {
          manifest: true,
          rollupOptions: { input: "src/entry-client.tsx" },
        },
  };
});
