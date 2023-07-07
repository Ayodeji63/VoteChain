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
            "https://api.defender.openzeppelin.com/autotasks/9d7de3b5-a9ff-4722-8dee-668acd66b18f/runs/webhook/91a62652-c9e3-42f6-b847-41d0c7006df9/8MDaAngKMxh978oTCfezKL",
        NEXT_APP_QUICKNODE_URL: "https://rpc.testnet.fantom.network",
    },
}

module.exports = nextConfig
