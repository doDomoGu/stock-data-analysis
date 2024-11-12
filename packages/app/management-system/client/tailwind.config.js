/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false // 关闭默认样式
  }
}

