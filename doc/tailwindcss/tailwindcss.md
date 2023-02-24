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
 }
}
note: ./ 匹配的是项目根路径 而不是 config 的路径(config 是可以自定义位置的)


js 操作dom 的class 也能配置上去 tailwindcss 也会 给使用了class 生成对应的css文件


tailwind 扫描对应文件的原理
1.使用正则表达式提取每个可能的类字符串
2.文件搜过的范围
  2.1:class=""
  2.2:js操作dom classList


字符串拼接tailcss 找不到(tailwind 只做正则寻找)
text-{{a?"red":"green"}}-600 

完整类名tailwindcss 找的到
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```
