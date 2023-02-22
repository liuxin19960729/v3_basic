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


es 模块实现模块拆分
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>




note:
    es模块不支持 file:// 协议

```

## 模版语法
```js
1.文本插值语法
{{}}

2.v-html 
    当前传入的字符串以 html渲染

3. v-bind (简写 :xxx)
    属性绑定
  

  对个属性绑定

  v-bind="obj"
  同时绑定了 id 和 xx 属性
  export default{
    data(){
        return {
            obj{
                id:'cc',
                xx:'bb'
            }
        }
    }
  }


Vue 只能访问到部分全局对象 ，Math Date 等


4.v-if
    根据 真假值判断 添加和移除dom对象

    v-if 可以和 <template> 结合使用

5.
    v-on:click="" (简写@click)

6.动态属性参数
    动态属性绑定
    v-bind:[xxxx]=""
    :[xxxx]=""

    动态事件绑定
    v-on:[xxx]=""
    @[xxxx] =""


7.动态参数限制
 :['xx' + obj]=""
 
 note :浏览器会把dom上的所有属性全部转化为小写

```

## 响应式基础
### dom更新时机
```
更新数据不会马上迫使dom跟新 在某一时刻所有改变了的dom全部一下子更新

nextTick() 回调函数可以帮助我们在跟新dom 的是够调用 这样我么方位到的dom就是最新的
```
### 深层响应性
```js
export default{
    data(){
        //  里面的响应数据默认是深层次响应
        return {

        }
    }
}
```
## 计算属性
```js
export default{
    computed:{
        ccc(){
            return xxx;
        }
    }
}

```
## 类与样式的绑定
```js
<div :class="{active:isActive}"></div>
    active 是否存在取决于 isActive 


多个字段绑定
<div :class="{xx:xx,xxx:xx,'a-x':xx}">


<div :class="obj">

export default {
    data(){
        return {
            obj:{
                'xx':xx
                gg :zz
            }
        }
    }
}

数组的绑定
<div :class="[xxx,xxx]">
or
<div :class="[{xxx:x,aaa:a},xxx]">
```
### 组件上使用样式
```js
组件上使用class 会把class值给子组件根标签


note:子组件读过根标签的情况下:具体把属性交给某一个标签
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```
### 绑定内联样式
```js
<div :style="xx">

同样支持
    绑定数组
    [cs1,cs2]
    板顶对象
    {'color':'red'}
    样式多字
    {xxx:[xxx,xxx,xx]}
```

## 条件渲染
### v-if
```
v-if
只有为true 才能够被渲染

v-if
v-else

v-if
v-else-if
v-else


<template v-if> 
置于v-if为 true 的时候才可以渲染
<template>

```
### v-show
```
v-show  false display:hidden

```
### note: v-if  和 v-for 在同一个元素 v-if 优先级更加高


## 列表渲染
```js
v-for

数组
(v,i) in xxx
对象 
(v,k) in xxxx

也可以使用 of 来代替 in


v-for ="n in 10"  会从0开始打印到10



<template v-for>
    可以同时渲染下面多个元素
</template>
```
### 通过key来管理状态
```

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