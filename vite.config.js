import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                terre: 'src/pages/terre.html',
                jupiter: 'src/pages/jupiter.html',
                contact: 'src/pages/contact.html',
                plan: 'src/pages/plan.html',
                accessibilite: 'src/pages/accessibilite.html',
                recherche: 'src/pages/recherche.html',
            },
        },
    },
})
