import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            manifest: {
                id: "zygis",
                name: 'Žygis: takas aplink Vilnių (Vilnius 100km)',
                short_name: 'Žygis',
                description: "Parodomoji 100 km tako aplink Vilnių versija veikianti neprisijungus prie interneto, sukurta CartoCon 2024 pranešimui PMTiles: naujas GIS duomenų formatas",
                start_url: '/',
                display: 'standalone',
                dir: 'ltr',
                lang: 'lt',
                display_override: ['standalone', 'browser', 'window-controls-overlay'],
                icons: [
                    {
                        "src": "web-app-manifest-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "web-app-manifest-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ],
                theme_color: "#ffffff",
                background_color: "#ffffff",
            },
            registerType: 'autoUpdate',
            workbox: {
                maximumFileSizeToCacheInBytes: 20 * 1024 ** 2, // 20 MB
                runtimeCaching: [
                    {
                        // Cache all resources in the 'zygis' folder
                        urlPattern: /\/zygis\/.*/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'zygis-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                            rangeRequests: true
                        }
                    },
                    {
                        // Cache sprite JSON and PNG files
                        urlPattern: /https:\/\/basemap\.startupgov\.lt\/vector\/sprite\/.*\.(json|png)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'sprite-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            }
                        }
                    },
                    {
                        // Cache font PBF files
                        urlPattern: /https:\/\/basemap\.startupgov\.lt\/vector\/font\/.*\/\d+-\d+\.pbf$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'font-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 90 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            }
                        }
                    }
                ]
            }
        })
    ],
})
