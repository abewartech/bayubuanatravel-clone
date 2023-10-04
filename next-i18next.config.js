/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "id-ID"],
    localeDetection: false
  },
  nonExplicitSupportedLngs: true,
  // localePath,
  reloadOnPrerender: process.env.APP_ENV === "debug"
};
