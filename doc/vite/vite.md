# vite
## index.html
```
index.html 入口文件

<script> 标签会被vite 解析
<link> css 也会被vite 解析
```

## npm 的依赖解析和预构建
```js
原生浏览器es 模块不支持 裸模块导入

import {xx} from 'vue'
上面这种形式就称为裸模块导入

vite 做的事情
1.esbuild 会将 CommonJS /UMD 转化为ESM
2.并将 node_modules 对应地址写入 esm 这样能让浏览器找到 
    /node_modules/.vite/deps/vue.js?v=f3sf2ebd 
```

## ts
```
vite 只执行ts的转义工作 不对ts做任何的类型检查

类型检查 
  tsc 或 vie-plugin-checker 等工具检查 esbuild 只转义 这样效率更高<不用全文加载只需要单文件转义>


tsconfig.json
compileroption:"isolatedModules": true

```
## css
```
css import 会被自动创建一个把内容放入style里面

```
### 关闭css注入到页面
```
import xxx from 'xx.css ?inline' 默认不会注入到 页面
```
### 导入 css模块
```
默认  xxx.module.css 会以模块导入
```

## 静态资源处理
```
导入静态资源
import xx from './xx.png'
xx 就是 静态资源的url


js导入 url地址
import xxx from 'xxx.js?url' js文件默认是导入模块  ?url会被导入url地址


以字符串形式加载进来 
import xx  from './xxx?raw'

// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'
```
### 导入json
```
import xxx from 'xxx.json'
or
导入json的某个字段
import {filed} from 'xxx.json'
```

### glob导入
```js
glob 默认是懒加载
const modules =import.meta.glob("/xx.js")
会被转义为
   const modules={
        'xxx/xx.js':()=>import('xxx/xx.js')
   }


设置 glob 为 同步加载
const modules = import.meta.glob('./dir/*.js', { eager: true })

会被转义为

import _xx_xx from 'xx'

const modules  ={
    'xxx.js':_xx_xx
}

```

#### global 传入参数
```
{as:'raw'} 字符串导入
const modules = {
  './dir/foo.js': 'export default "foo"\n',
  './dir/bar.js': 'export default "bar"\n',
}

{as:'url'} 由url导出
```
#### 反面glob导入
```
import.meta.glob(["xx","!xxx"])
! 放在前面把那些数据过滤掉
```
#### 自定义查询导入
```
const modules=import.meta.glob('xxx.js',{
    query:{xx:xx,xxx:xxx}
})

会被转义为

const modules ={
    xxx:()=>import('xxxx.js?xx=xx&xxx=xxx')
}
```
```
glob 支持 别名 和 字符串的路径
必须以字面量的像是传入 不可以以变量和表达式传入
```
### vite 支持动态导入
```
const module=await import(`xx/${file}.js`);
```

## 构建优化
### css 代码分割
```
异步chunk 

异步chunk css加载完成之后才会被放入 link标签中执行

build.cssCodeSplit css 
默认 true 
当我们需要将所有的css放入一个文件 cssCodeSplit 设置为false
```
### 预加载指令生成
```
实验性质
<link rel="modulepreload">是一个特定于模块的版本，<link rel="preload">它解决了后者的一些问题。
```
### 异步chunk 优化
```
Entry 
    async A  chunk  --->C chunk   
    async B chunk   --->C chunk

浏览器请求 A  拿到A 代码块 才知道 需要模块 C


vite 对上面情况优化
vite 知道 A 需要C 块
所以 vite 会重写代码 在需要A的时候会网络请求 A+C 这样减少等待时间

``` 
## 命令行界面
[官网](https://cn.vitejs.dev/guide/cli.html)

### 插件的使用
[官网](https://cn.vitejs.dev/guide/using-plugins.html)
```js
安装插件到 开发依赖
npm add -D xxx

插件的使用
vite.config.js
配置插件
plugins:[
   ...
]
```


## 静态资源
```
public 文件夹配置
publicDir


静态资源路径的获取
const imgUrl = new URL('./img.png', import.meta.url).href‘


```

## lib 模式构建
```
build :lib{

}

entry 必须 入口文件 (非html文件) string| string[]
format :[umd , es] (默认umd es 都会创建)
        多入口 ['es','cjs']
filename 包名
name 是暴露出去的名字 [默认是package 的名字]
```

## 构建生产版本
```
/.index.html 构建入口点
```
### 浏览器兼容
```
构建支持原生ESM script 标签 ,和 import 动态导入 和 import.meta 的浏览器
Chrome >=87
Firefox >=78
Safari >=14
Edge >=88
```
### 构建支持低版本浏览器的文件
```
最低版本:es2015

build.target
vite.config.js
build:{
    target:string|string[]
}

默认值:modules[vite特有 其实就是 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'] ] 


esnext 原生动态导入支持
       编译将尽可能转换为低版本


```