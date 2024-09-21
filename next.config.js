/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  experimental: {
    runtime: 'edge',
  },
}

/**
 * DEV NOTE: This configuration enables Edge Runtime for all API routes.
 * 
 * AI NOTE: When analyzing this config, check for any custom webpack configurations
 * or environment-specific settings that might affect the build process.
 * 
 * LAYPERSON NOTE: This file contains settings for how our website is built and run.
 * It's now set up to use Vercel's fastest and most efficient way to run our game logic.
 */