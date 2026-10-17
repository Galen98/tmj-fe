import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

// import path from "path";

// export default {
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// };
// import { defineConfig } from "vite";
// import react, { reactCompilerPreset } from "@vitejs/plugin-react";
// import babel from "@rolldown/plugin-babel";

// export default defineConfig({
//     plugins: [
//         react(),

//         babel({
//             presets: [
//                 reactCompilerPreset(),
//             ],
//         }),
//     ],

//     server: {
//         proxy: {
//             /*
//              * =========================================
//              * EXPRESS SANDBOX
//              * =========================================
//              */
//             "/sandbox-api": {
//                 target: "http://localhost:3001",
//                 changeOrigin: true,
//                 secure: false,

//                 rewrite: (path) =>
//                     path.replace(
//                         /^\/sandbox-api/,
//                         "/api"
//                     ),
//             },

//             /*
//              * =========================================
//              * LARAVEL API
//              * =========================================
//              */
//             "/api": {
//                 target: "http://127.0.0.1:8000",
//                 changeOrigin: true,
//                 secure: false,
//             },

//             /*
//              * =========================================
//              * LARAVEL STORAGE / ASSETS
//              * =========================================
//              */
//             "/storage": {
//                 target: "http://127.0.0.1:8000",
//                 changeOrigin: true,
//                 secure: false,
//             },
//         },
//     },
// });