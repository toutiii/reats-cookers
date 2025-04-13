export default {
    expo: {
        name: "reats-cookers",
        slug: "reats-cookers",
        version: "0.1.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
            url: "https://u.expo.dev/5e8c63f9-94eb-4a4f-8125-239918afb898",
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.reats.cookers",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
            package: "com.reats.cookers",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        plugins: [
            "expo-secure-store"
        ],
        newArchEnabled: true,
        extra: {
            eas: {
                projectId: "5e8c63f9-94eb-4a4f-8125-239918afb898",
            },
            ENV: process.env.ENV,
            apiBaseUrl:
                process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL ??
                process.env.EXPO_PUBLIC_STAGING_API_BASE_URL ??
                process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL,
            apiKeyBackend:
                process.env.PRODUCTION_API_KEY ??
                process.env.STAGING_API_KEY ??
                process.env.DEVELOPMENT_API_KEY,
            appOriginHeader: process.env.EXPO_PUBLIC_APP_ORIGIN,
        },
        owner: "tout_it",
        runtimeVersion: {
            policy: "appVersion",
        },
    },
};
