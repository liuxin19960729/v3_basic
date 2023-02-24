<template>
    <div class="w-screen h-screen bg-green-500 md:bg-pink-500 lg:bg-gray-500">
        <div class="md:hidden">
            手机
        </div>
        <div class="hidden pad:block lg:hidden">
            平板
        </div>
        <div class="hidden lg:block">
            电脑
        </div>
        <div>
           <highlightjs language="js" :code="rawcode"></highlightjs>
        </div>
    </div>
</template>
<script lang="ts" setup>
    const rawcode=`
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
                'cus_name':'3000px'
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