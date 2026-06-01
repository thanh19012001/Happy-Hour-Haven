/** @type {import('i18next-cli').I18nextToolkitConfig} */
export default {
  locales: [
    "en",
    "ja",
    "vn"
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public/locales/{{language}}/{{namespace}}.json"
  },
 locize: {
    projectId: 'c7af4ce1-37fc-425a-b470-937d85c78eae',
    // For security, apiKey is best set via an environment variable
    apiKey: process.env.LOCIZE_API_KEY,
    version: 'latest',
  },
}