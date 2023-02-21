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