import type { NextConfig } from "next";
import test from "node:test";

const nextConfig: NextConfig = {
    eslint: {
        dirs: ["src"],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

export default nextConfig;
