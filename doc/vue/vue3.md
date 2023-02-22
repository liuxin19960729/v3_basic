## 安装vue的几种方式
### 1. vite 单页面方式
### 2.cdn
```js
unpkg 全局构建版本
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
const { createApp } = Vue



es模块版本
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
</script>


importamp 导入
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

我们可以通过映射表导入其他模块 确保所有导入的库是es版本的库

note:
    导入表不是每一个浏览器都是支持映射表




```

## option 和 compositon
### option
```js
export default{
    // 响应式数据创建
    data(){
        return {

        }
    },
    // 方法创建
    methods:{
        xxx(){

        }
    },
    // 生命周期钩子函数
    mounted(){
    
    }
}

```
### compositon
```js
1.xxx.vue
    <script setup>

    const= a ref("x") // 创建响应式数据

    function aa(); 创建方法

    onMounted(()=>{

    }) // 声明周期函数
```
## vue生命周期
```
beforeCreate:
    组件实例化完成之后立即调用 
    此时props已经解析完全
    
    note:data 和 computed 还没有进行包装处理和响应式处理


created:
    data computed 处理完全 ,与状态相关的数据处理完全

    data computed 响应数据处理完成 
    
    note:此时dom还没有挂载


beforeMounted:
    数据已经处于响应式 但是dom还没有创建 和挂载

mounted:
    dom 已经创建和挂载(插入到document里面)
    1.同步组件已经挂载(不包含Suspense 和 异步组件)

    note:此时可以访问真实dom元素

beforeUpdate:
    发生在更新dom树之前,此时方位到的dom元素是还未改变的dom


updated:
    note:
    父组件的更新钩子将在子组件更新钩子后调用

beforeMounted:
    卸载之前调用
    note:
        响应式数据仍然保持之前的功能

unmounted：
    组件被卸载之后

    note:
        1.所有子组件已经被卸载
        2.响应数据都失效
        
```