import { defineConfig } from '@playwright/test'
export default defineConfig({ use: { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE, args: ['--no-sandbox'] } } })
