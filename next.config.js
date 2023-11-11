/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  ssr: {
    excludeComponents: ["Button"]
  },
  images: {
    domains: ['static.marinarajaampat.id'],
},
});
