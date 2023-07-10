/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    env: {
        NEXT_APP_WEBHOOK_URL:
            "https://api.defender.openzeppelin.com/autotasks/6620e581-0e2a-4848-b8ea-5012f272418f/runs/webhook/91a62652-c9e3-42f6-b847-41d0c7006df9/Rssq8grkJiHbMe2diFXDVU",
        NEXT_APP_QUICKNODE_URL:
            "https://polygon-mumbai.g.alchemy.com/v2/R294dgwjxsihCLrErr51Xs8SNbQYB97Y",
    },
}

module.exports = nextConfig
