/** @type {import('tailwindcss').Config} */
const defaultThem = require('tailwindcss/defaultTheme')
// tailwinds 的默认颜色
const colors=require('tailwindcss/colors')
module.exports = {
  /**
   * 配置有哪些地方使用tailwindcss 
   */
  content: [
    "./index.html",
    // "./src/plugins/tailwindcss/index.css",
    "./src/**/*.{js,ts,jsx,tsx,vue}",

  ],
  theme: {
    screens: {
      // 给默认添加一个屏幕断点
      xs: '475px',
      pad: ' 768px',
      // 把原来的数据放入到里面
      ...defaultThem.screens,
      
    },
    colors:{
      ...colors
    },
    extend: {
      colors:{
        mac:{
          100:"#74CFFB",
          200:"#49819D",
          300:"#0B1419",
          DEFAULT:"red",
        }
        
      },

      // 
      screens: {
        xs: '475px'
      }
    }
  },
  /**
   *  安全列表无论是否使用tailwind 类都会生成 安全列表里面的这些类
   */
  safelist: [
    // 'bg-red-600',
    //  {
    //   pattern:/bg-(\w+)-500/
    //  }
  ],
  blocklist: [
    // 'bg-red-500'
  ],
  /**
   * 主题配置
   * 调色 字体 字体比例  ....
   */
  // theme: {
  //   extend: {

  //   },
  //   screens:{

  //   },
  //   colors:{

  //   },
  //   spacing:{

  //   }
  // },

  // plugins: [],

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
