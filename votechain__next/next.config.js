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
            "https://api.defender.openzeppelin.com/autotasks/61d2d640-256e-4ec8-a7ea-9b8c65f3cf5d/runs/webhook/91a62652-c9e3-42f6-b847-41d0c7006df9/JCMARXHk5G7MJzF4eYccWk",
        NEXT_APP_QUICKNODE_URL:
            "https://opt-goerli.g.alchemy.com/v2/3ORjCx6ybjwSU5YQ0fvTwugBPRmuz05_",
    },
}

module.exports = nextConfig
