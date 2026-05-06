import { defineConfig } from "vite";
import { resolve } from "path";


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                add: resolve(__dirname, "login.html"),
                about: resolve(__dirname, "about.html")
            }
        }
    },
    base: "/DT207G_Lab4_Webbapp/"
})