// next.config.js
/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    myRuntimeEnvVar: process.env.MONGODB_URI,
  },
}
