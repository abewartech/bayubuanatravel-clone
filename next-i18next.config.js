module.exports = {
  i18n: {
    // all the locales supported in the application
    locales: ["en", "id"],
    // the default locale to be used when visiting
    // a non-localized route (e.g. `/about`)
    defaultLocale: "en"
  },
  reloadOnPrerender: process.env.APP_ENV === 'debug'
};
