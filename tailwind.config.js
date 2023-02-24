/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * 配置有哪些地方使用tailwindcss 
   */
  content: [
    "./index.html",
    // "./src/plugins/tailwindcss/index.css",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  /**
   * 主题配置
   * 调色 字体 字体比例  ....
   */
  theme: {
    extend: {},
  },

  plugins: [],

  /**
   * tailwind 生成实例前缀
   *  <div class="lx-bg-red-500"> 都需要加上前缀才能使用
   */
  // prefix:"lx-"

  /**
   * true 所有分tailwind 都是!import
   * 
   * #id id选择器 只给对应的选择器天机
   * 
   */
  // import

  /**
   * 分隔器
   * 默认 : 分隔
   */
  // separator:"_"
}
