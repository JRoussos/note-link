import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ["**/*"],
                maximumFileSizeToCacheInBytes: 5000000,
            },
            includeAssets: ["**/*"],
            manifest: {
                "theme_color": "#f6f6f6",
                "background_color": "#f6f6f6",
                "display": "standalone",
                "orientation": "portrait",
                "id": "/",
                "scope": "/",
                "start_url": "/home",
                "name": "NoteLink",
                "short_name": "NoteLink",
                "description": "Your notes everywhere.",
                "icons": [
                    {
                        "src": "/icons/logo192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                    },
                    {
                        "src": "/icons/logo512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                    }
                ],
                "share_target": {
                    "action": "/create",
                    "method": "GET",
                    "enctype": "application/x-www-form-urlencoded",
                    "params": {
                        "title": "title",
                        "text": "text",
                        "url": "url",
                    }
                },
                "shortcuts": [
                    {
                        "name": "New note",
                        "url": "/create",
                        "description": "Create and sync a new note.",
                        "icons": [
                            {
                                "src": "/icons/create-icon.png",
                                "type": "image/png",
                                "sizes": "192x192"
                            }
                        ]
                    }
                ]
            },
            devOptions: {
                enabled: true,
            },
            //     manifest,
            //     devOptions: {
            //         enabled: true
            //     },
        })
    ],
})
