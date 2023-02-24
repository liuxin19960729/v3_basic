## !xxx 对xxxcss属性设置成import

### 对不用的页面使用不用的配置生成多个css文件
```
@config "./tailwind.site.config.js";

@tailwind base;
@tailwind components;
@tailwind utilities;
```
## config 
### content
#### 配置路径
```js
module.export={
 /**
  * 配置所有文件的路径
  */
 content:{
    './*',//dir内所有文件的匹配
    './**'//所有文件夹
    './**/*.{js,html}'//文件后缀的匹配
    // 扫描带有 键raw 而不是 文件对象
    // {raw:"xxxx"}
 }
}
note: ./ 匹配的是项目根路径 而不是 config 的路径(config 是可以自定义位置的)


js 操作dom 的class 也能配置上去 tailwindcss 也会 给使用了class 生成对应的css文件


tailwind 扫描对应文件的原理
1.使用正则表达式提取每个可能的类字符串
2.文件搜过的范围
  2.1:class=""
  2.2:js操作dom classList
  2.3 @apply// 自己写的样式想用tailwindcss
  2.4 任何字符串满足条件的   
自定义stype
.xxx {
 @apply 在这里面使用tailwinds 
}



note:
1.默认路径实意项目路径开始的
2.relative:true 这是以config路径相对路径开始计算



转换源文件
module.export={
    content:{
        files:['./a/**/*{md.html}'],
        // 在提取类之前使用content 可以转换文件内容里面的任何东西
        transform:{
            // 转换md文件的内容
            md:(content)=>{
                // 转换后的内容 返回给tailcss 使用
                return content;
            }
        }
    }
}

自定义提取逻辑
用来检测特定文件名的类名逻辑
module.export ={
    files:['/**/*{wtf.html}'],
    extract:{
        //检查提取wtf 文件的内容
        wtf:(content)=>{
            return xxx.match(//);
        }
    }
}







```

### safelist
```js
  /**
   *  安全列表无论是否使用tailwind 类都会生成 安全列表里面的这些类
   */
  safelist:[
    'bg-red-600'
  ],

安全列表支持正则模式

  safelist:[
    'bg-red-600',
     {
      pattern:/bg-(\w+)-500/
     }
  ],

注意 pattern 不会生成伪类的class


可以使用变量的方式
  safelist:[
    'bg-red-600',
     {
      pattern:/bg-(\w+)-500/
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
     }
  ],

```
### 丢弃类
```js
由于tailwindcss 使用的是正则表达式匹配
可能某个页面 使用tailwindcss 关键字 造成 生成了class

  blocklist:[

  ],

仅支持字符串 


注意:
一旦设置了blocList 的某个class  即使在div 里面使用 该class 也不会有生成类到css


```

### theme 主题
```js
module.export={
      theme: {
    // 配置的扩展
    extend: {
        screens:{
            '3xl':'1600px'
        }
    },
    // 允许我们设置中断的断点
    screens:{

    },
    //允许我们自定义调色板
    colors:{
        transparent:'transparent',
        gray:{
            100:'xxx',
            200:'xxx'
        }
    },
    // 设置间距
    spacing:{
        px:'px',
        0:'0',
        0.5:'0.125rem'
    },
    // 配置独立插件
    borderRadius:{
        'none':'0',
        'sm':'.125rem',
        DEFALT:'.125rem'
    }
  },

}

note:borderRadius
会生成
.rounded-none{
    border-radius:0;
}






```