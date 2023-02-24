<template>
    <div class="">
        <div class=" bg-green-500 md:bg-pink-500 lg:bg-gray-500">
            <div class="md:hidden">
                手机
            </div>
            <div class="hidden pad:block lg:hidden">
                平板
            </div>
            <div class="hidden lg:block">
                电脑
            </div>
            <div class="cus:bg-yellow-700">
                sss
            </div>
            <div>
                <highlightjs language="js" :code="rawcode"></highlightjs>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const rawcode = `
    // 获取默认主题
    const defaultTheme=require("tailwindcss/defaultTheme")
    module.export={
        //主题
        theme:{
            // 覆盖默认断点 md lg xl 2xl 都会被覆盖 没有设置就会删除默认
            screens:{
                防止覆盖先放入默认主题数据
                ...defaultTheme,
                // 在覆盖原数据
                'sm':'576px' // 相当于 @media(min-width:576px) {} 大于576px启用该断点,
                // 可以自定义屏幕断点名字
                'cus_name':'3000px',
                // 固定范围 
                'lg': {'min': '1024px', 'max': '1279px'},
                'xx':{min:'200px'}, // 相当于 @media(min-width="200px"){}
                'xx2':{max:'200px'}, // 相当于 @media(max-width="200px"){}
                // 给窗口断点设置多个范围
                cus:[{
                        min:'375px',
                        max:'400px'
                    },{
                        min:"1024px"
                    }]
                ,
                // 下面是原生的定义方式
                "cus_name2":{'raw','(min-width="")''},
                "cus_name3":{'raw','(max-width="")''}
                "cus_name4":{'raw','(max-width="" and min-width="")''}
            }
            extends:{
                
                // 替换相同的名字 不会删除
                screens:{
                    'md':'600px'
                }
             }
        },
      
    }`
</script>
<style lang="scss" scoped></style>