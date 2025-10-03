import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/taiyu-notebookLM-website/", // 👈 這裡要加上 repo 名稱
});
