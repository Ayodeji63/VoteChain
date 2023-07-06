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
            "https://api.defender.openzeppelin.com/autotasks/51f94b78-fc6c-4a25-afed-4895e27f2ed6/runs/webhook/91a62652-c9e3-42f6-b847-41d0c7006df9/QpwrG9YFyPE9THNEqoaoMz",
        NEXT_APP_QUICKNODE_URL: "https://rpc.testnet.fantom.network",
    },
}

module.exports = nextConfig
