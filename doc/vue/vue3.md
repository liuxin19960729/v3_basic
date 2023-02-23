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
v-for 表单 key是 index值  移动位置不会改变dom 位置而是改变 元素内容

我们可以给key设置 id等唯一的值 这样修改元素位置会修改真实dom位置
```
### 组将上使用v-for
```js
<mycomp v-for="xxx in items" :key="xxx.id">
默认不会给组件传入props值


我们可以通过 props 向组件传入值
<mycomp v-for="(xxx,index) in items" :key="xxx.id"
:id="xxx.id" :index="index"
>
```

### 数组变化侦测
```js
push
pop
shift
unshift
splice
sort
reverse
上面的方法对数组内容产生了影响
```
### 新数组替换原数组
```
1.computed 方式
2.
    methods

```
## 事件处理
```
v-on (简写@)


内联事件
$event 事件参数

```
### 事件修饰符
```
stop 停止时间传递
prevent 阻止默认事件
self 处理事件来自自己元素
capture 捕获阶段处理
once 事件处理一次
passive 用来告诉我们scroll 调用里面不包含 event.preventDefault
```
### 按键修饰符号
```
@keydown.enter enter 键按下
@keyup.page-down

$event.key 满足上条件的时候才会触发
```
## 表单输入值绑定
```js
<input :value="text" @input="event=> text=event.target.value">
简写方式
<input v-model="text">

input textarea 标签绑定 input 事件

input radio checkbox 单选和多选绑定的checked 事件

select 绑定的是value change 事件


多选 值的绑定
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
多选 动态值绑定
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />

单选值绑定
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />

选择器值绑定
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```
### 修饰符
```
.lazy :例如失去焦点的时候触发更新事件
.number 数字(默认输入的都是字符串)
.trim 去除两端空格
```
### 侦听器
```js
export defalut{
    data(){
        return {
            vv:1,
            obj:{
                zz:0;
            }
        }
    },
    watch:{
        // 每当vv改变的时候吃法该监听器
        vv(nv,ov){

        },
        //对象属性监听
        'obj.zz'(nv,ov){

        }
    }
}
```
### 深层次监听
```js
watch 默认浅层监听(对象 属性值改变 不会触发)

设置深层次监听
watch:{
    obj:{
        handler(nv,ov){

        },
        deep:true
    }
}
```
### 即时回调的监听器
```
默认 :只有当数据改变的时候才执行

immediate: true 该组件mounted 的时候会立即执行一次
```
### 回调的触发时机
```

flush :"pre" 默认 会在组件更新之前 执行回到
flush:"post" vue 更新之后回调
```
### this.$watch
```js
export default {
  created() {
    this.$watch('question', (newQuestion) => {
      // ...
    })
  }
}
```
### 停止侦听
```js
const unwatch=this.$watch("xxx",callback)
unwatch() 停止监听
```
## 模版引用
```js
<input ref="input">

this.$refs.input.focus();访问dom元素
note:模版引用必须是挂载后才能访问


v-for 的模版引用
  <li v-for="item in list" ref="items">
      {{ item }}
    </li>
获取的数据是 全部itme
```
### 函数模本引用
```js
<input :ref="(el)=>{}" 每次更新都调用
note: 函数在卸载的时候也会被调用 el值为null
```
### 组件上的ref
```js
选项式api 
    引用值 和 组件的this完全一致

如何限制父组件对子组件属性的访问权限
export default {
    // 写入需要暴露给父组件的属性
    expose:['']
}
```
## 组件
### 组建基础
```js
创建组件的两种放肆
1.sfc  xxx.vue
<script>
    export default{

    }
</scriipt>
<template>
</template>


2.不构建的方式
    export default{

        template:`html标签等内容`
    }

组件的使用

export default {
    components:{
        组件; 把组件注册进去
    }
}

传递props

export default{
    //需要接收 xx属性 并且把他放入 this对象里面
    // 属性 注册
    props:['xx']
}

子组件可以向父组件传递事件
注册事件 事件名字为 xxx
<parent @xxx="">
    
</parent>

子组件
export default{
    // 接收父组件 xxx 事件 注册
    emits:['xxx']
}

emit("xxx") 发送事件

动态组件 currentTab 是组件名
<component :is="currentTab"></component>
通过改变组件名吧对应的组件换上去

```
### 深入组件
#### 组件注册
```js
全局组件注册
app.component(key,comp)

局部注册
局部注册 该组件只能在当前的地方使用
export default{
    components:{
        compA,
    }
} 
```
#### props
```js
组件需要显示的告诉vue 我要哪些属性
export default{
    props:['zzA']
}

对属性限定类型
export default{
    props:{
        ppa:String
        zza:Number
    }
}
 当父组件传递了错误的类型会在浏览器控制台发痴警告

传递多个属性
<MyComp v-bind="obj"> </MyComp>
export default{
    data(){
        return {
            obj:{
                id:xx,
                zz:xx
            }
        }
    }
}
传递了 id 和 zz属性

单向数据流
prop 数据是只读的
父组件更新 会将props数据传入给子组件

note:当传入对象 和 数组 属性的时候 最好不要改变里面的值
     这样耦合性大 最好的好处是发送 事件通知父组件


Prop校验
     允许多种类型
     propB: [String, Number],
    String 类型并且必填
    propC: {
      type: String,
      required: true
    }
    
      // Number 类型的默认值
    propD: {
      type: Number,
      default: 100
    }
    自定义验证器
     validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }

    propE: {
      type: Object,
      // 对象或者数组应当用工厂函数返回。
      // 工厂函数会收到组件所接收的原始 props
      // 作为参数
      default(rawProps) {
        return { message: 'hello' }
      }
    },

  note:
    1.默认属性可选 否则 required=true 必须写
    2.除Boolean 默认都是undefined
    3.validator 校验失败会在控制台打印警告信息

运行时类型检查
 他是通过 instanceof 来检查的
 可以自定义类

  props:{
    xxx:Boolean
  }

  <comp xxx> </comp>
    xxx属性是true
  <comp > </comp>
  xxx属性是false

```
#### 组件事件
```js
// 组件的事件只执行一次
<MyComponent @some-event.once="callback" />


$emit() 触发自定义事件

显示的声明我们要触发的事件
export default {
    emits:[]
}

export default{
    emits:{
        返回 true 验证通过 发送事件 返回false 验证不通过
        sumbit:(v){

        }，
        没有事件验证
        cusclick:null
    }
}
```
#### 组件v-model
```js
组件使用v-model 的展开形式
<CustomComp :modelValue="text" @input:modelValue="nv=>text=nv"> </CustomComp>

组件v-model
    1.把modelValue 属性传递给子组件
    2.注册input:modelValue 事件到子组件上面


model value 的参数

v-model :默认
    v-model:modelValue
v-model:title="xx" 通过v-model 的属性
   
   子组件
   export default{
         //接收title 的值
         props: ['title'],
         //发送update:title的时间修改title的属性值
         emits: ['update:title']
   }

多个v-model 的绑定
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>


v-model 的修饰符
自定义修饰符
export default{
    modelVale:String,
    // 用来接收修饰符
    modelModifiers:{
        default:()=>({})
    }
    methods: {
    emitValue(e) {
      let value = e.target.value
      // 判断是否定义修饰符号
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
v-model 对不同属性创建修饰符号
note:
    v-model 可以在组件绑定不同的属性
    如果要对属性 使用不同修饰符
    export default{
        props:['属性名'，'属性名Modifiers']
    }
```
#### 遗传Attributes
```js
单元素作为根
1.class继承

   单元素 继承组件class 
   氮元素 如要也有class 会合并 组件class
   note: 组件上的class在后面 所以class里面的一些属性 会覆盖 单元素的属性

2.v-on继承
    <MyComp v-on:click="">
    click 事件会被添加到 根元素上面
    note:
        根元素本来也绑定了 click 则注册的两个click事件都会触发

3.关闭继承
    inheritAttr:false

4.$attr
props emits class style v-on
props 访问
    $attr['属性名']
v-on 访问
    $attr[`on${事件名字}`]



<input v-bind="$attr">
会将 组件上所有的属性都放入 input 标签上面


解决组件多根节点的属性问题
<header> </header>
<main v-bind="$attr"></main>
<footer></footer>
```
#### 插槽
```js
默认内容
<button>
    <slot>默认类型</slot>
</buttons>

<MyComps><MyComp>
这样会使用默认内容
<button>
    默认类型
</buttons>

<MyComps>覆盖默认内容<MyComp>
<button>
    覆盖默认内容
</buttons>

具名插槽
给每个插槽取名
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

指定插槽使用
<MyComp>
    <template v-solt:插槽名>
            .....
    </template>
</MyComp>
 <template v-solt:插槽名> 可以简写为
 <template #:插槽名>

动态插槽名字
<template #:[dynimicalName]>


作用域插槽
获取子组件域内的值

<MyComp #="xxx"></MyComp>

<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>

获取到子组件<slot>的text和cont  属性值
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>


<slot name="" aaa="ss">
注意name是vue属性的保留字 不会传递出去 只会传递{aaa:'ss'}


```
#### 注入依赖
```js
props 是逐级传递的,可能从根文件传递属性到 很深层级的组件上

provide 和 inject 解决属性 深入传递的属性的问题

export default{
    provide:{
        
    }
}

注意下面这种情况不会让相应的被响应提供
export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    // 使用函数的形式，可以访问到 `this`
    return {
      message: this.message
    }
  }
}


全局提供
app.provide(k,v)



注入
注入的时机 在组件解析之前注入
data(){} 里面可以访问 data() 已经在解析了 所有可以使用 inject的值
export default{
    inject:['k']
    created:{
        // 访问到插入的值
        console.log(this.k)
    }
}


注入别名
export default {
    inject:{
        别名:{
            from :'k'
        }
    }
}


提供注入的默认值(在没有provide 的时候)
export default {
    inject:{
        别名:{
            from :'k'，
            default:"default value"
        },
        
        xxx:{
            default:()=>{默认值}
        }
    }
}


和响应式数据配合


export default{
    data(){
        return {
            message:"ss"
        }
    }
    provide(){
        return {
            xxx:computed(()=>this.message)
        }
    }
}

Symbol 注入名 避免提供冲突
```
#### 异步组件
```js
defineAsyncComponent 定义一个异步组件

const asycmp=definedAsyncComponent(()=>{
    return new Promise((res,rej)=>{
        // 从服务器拉取组件
        resolve(/**获取到的组件 */)
    })
})


es模块 import() 返回的就是一个 promise
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
只有在页面使用到该组件的是够才会加载该组件

全局注册
app.componet(AsyncComp)

局部注册
export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}


加载与错误状态

const asyncComp=definedAsyncCommponent({
    loader:()=>import("xxx.vue"),
    // 加载异步的时候使用的组件
    loadingComponent:LoadingComponent,
    // 在加载组件时的延迟时间
    delay:200,
    //加载错误时的组件
    errorComponent:ErrorComponent,
    // 默认infinity 没有限制
    timeout:3000,
})

delay:200, 设置避免 网络太快 造成闪烁

errorComponent 当promise 出现错误的时候 reject 会显示错误组件

```
## 逻辑复用
### 组合式函数
### 自定义指令
```js
v-xx 指令被注册
app.directive("xx",{
    // 指令钩子
    // 绑定 attribute 和 事件监听器之前 
    created(el,binding,vnode,preVnode){

    }，
    //被插入的dom之前
    beforeMounted(el,binding,vnode,preVnode){

    },
    // 绑定到父组件 和自己所有的子节点挂载完全
    mounted(el,binding,vnode,preVnode){

    },
    // 父组件更新前调用
    beforeUpdate((el,binding,vnode,preVnode){

    }
    // 绑定到父组件 和自己所有的子节点更新后调用
    update(el,binding,vnode,preVnode){

    },
    // 从父元素卸载之前
    beforeUmounted(el,binding,vnode,preVnode){

    },
    //从父组件卸载之后
    unmounted(el,binding,vnode,preVnode){

    }
})

el:元素 可以直接操作dom
bindding:
    value
    oldVaue 
    arg
      v-my-directive:foo 为 foo  
    modifiers
        v-my-directive.foo.bar
        {foo:true,bar:true}
    
vnode
    绑定元素底层 VNode
prevNode
    beforUpdate 和 update 可以
    以前的vNode


<div v-example:foo.bar="baz">
binding
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}

<div v-example:[arg]="value"></div> argv 响应式的更新

note:在不同的数据间共享数据使用 el.dataset 来共享数据

简写形式
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})


组件上使用
1.会始终用到组件的跟节点
2.多根节点使用 指令 会抛出一个警告 
   note:多根节点不能通过 v-bind="$attr" 来继承

```

### 插件
```js
app.use(plugin,{
    // 可选的选项
})

插件
    1.必须要有 install 函数
    const myPlugin = {
    install(app, options) {
        // 配置此应用
    }
    }

插件添加全局属性
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)//向install 传递可选参数
    }
  }
}
<h1>{{ $translate('greetings.hello') }}</h1>

```
## 内置组件
### Transition
[transiton](https://cn.vuejs.org/guide/built-ins/transition.html#javascript-hooks)
```js
Transiton:
    元素进入和离开dom 时应用动画

TransitionGroup:
    v-for 列表中插入和移动的时候应用动画


触发条件
v-if
v-show
<component> 动态组件切换的时候触发


<Transition>
    <p v-if="show"> </p>
</Transition>

.v-enter-active,.v-leave-active{

}

.v-enter-from,
.v-leave-to {
  
}


Transiton 支持单个元素 或组件作为插槽内容(组件必须有根元素)

基于css的过度动画
v-enter-from  --->v-enter-to
    v-enter-active 在进入的时候立即添加属性
v-leave-from  --->v-leave-to 
       v-enter-active 在离开的时候立即添加属性

为过度动画命名
<Transiton name="xx"> </Transiton>
class 选择器变为
.xx-enter-from
.xx-enter-active
.xx-enter-to

.xx-leave-from
.xx-leave-active
.xx-leave-to


在离开 和进入的时候天机 输入曲线等
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

css的animation

<Transition type="animation"></Transiton>
animation 
transiton
告诉Vue应该关注那个执行完的事件
transitionend 或 这 animationend 事件


Transiton 下的 属性精确设置
<Transition name="nested">
  <div v-if="show" class="outer">
    <div class="inner">
      Hello
    </div>
  </div>
</Transition>
....
.nested-enter-active .inner,{

}

子类设置动画 或 过度  在根原始 animationend or transitionend 是监控不到的
通过下面的设置
<Transition durition="毫秒事件"> <Transiton>



对enter 和 leave 设置时间
:duration="{enter:100,leave:2900}"


Js钩子

@before-enter
@enter
@after-enter
@enter-cancelled
@befor-leave
@leave
@after-leave
@leave-cancelled



<Transition :css="false">
告诉vue可以跳过css的自动探测,全全由我们这些钩子函数来负责

可以复用的动态效果组件
slot把元素插入到里面


元素初次渲染执行过度效果
<Transiton appear></Transition>


v-if v-show 
v-if v-else v-else -if 
只要确保Transition 里面有一个元素那么过度效果就会被触发

过度模式
1.position:absolute  避免影响布局
2.先离开在进来
 <Transition mode="out-in">
3.先进来 在离开
 <Transition mode="in-out">


组件间的过度(动态组件切换)
<Transition name="fade" mode="out-in">
  <component :is="activeComponent"></component>
</Transition>


动态过度
<Transition :name="">
```
### TransitionGroup
```js
1.列表中每个元素都是独一无的key
2.css 过度会被用到列表的元素上
3.tag 作为元素的容器

<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>

```
### keepAlive
```js
<componet :is=""/>
每次切换的时候会被销毁

缓存当前的组件
<KeepAlive>
    <component :is="activeComponet">
</KeepAlive>

这设置根据那些组件缓存 和 不缓存的 
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>

设置对打缓存的实例数字(LRU 缓存的方式)
<KeepAlive :max="10">

缓存的生命周期
export default {
  activated() {
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}

activated 组件挂载 时也会调用
deactivated 组件卸载时也会调用
```
### Teleport
```js
作用:将组件一部分模版传输DOM结构外层位置去

传统 position:fixed
   任何祖先元素设置 transform perspective filter 则会以这个祖先元素为定位

Vue解决
<Teleport to="body">
    内容
</Teleport>

to 传送的目标
 to接收值是以css选择器的方式接收值


Teleport的禁用

<Teleport :disabled ="">

多个Teleport共享目标

<Teleport to="#aa">
 <div>A </div>
</Teleport>

<Teleport to="#aa">
 <div>B</div>
</Teleport>


渲染结果为
<div id="aa">
    <div>A </div>
    <div>B </div>
<div>
```
### Suspense
[suspense](https://cn.vuejs.org/guide/built-ins/suspense.html#async-setup)
```js
解决异步等待

1.setup() 异步函数 await 
  export default {
    async setup() {}
  }
    <script setup>
    const res = await fetch(...)
    const posts = await res.json()
    </script>

2.异步组件
  definedAsyncComponent()
  默认就是 susiable:true
  如果使用Suspense 会全部交给  Suspense  接管
   susiable:false
   不会由 Suspense接管


插槽
#default 
  加载异步成功后展示  
#fallback
    异步挂载展示的页面

事件
pending
    挂起时触发
resolve
    default 槽完成之后触发
fallback
    fallback 槽显示的时候触发


错误处理
 Suspense 目前自己没有错误处理
 可以在父组件
 onErrorCaptured()
 和 
 errorCaptured()
 来捕获错误

 
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