<template>
    <div class="flex">
        <div class="h-[100px] w-[100px] bg-mac-100">
            bg-mac-100
        </div>
        <div class="h-[100px] w-[100px] bg-mac-200">
            bg-mac-200
        </div>
        <div class="h-[100px] w-[100px] bg-mac-300 text-white">
            bg-mac-300
        </div>
        <div class="h-[100px] w-[100px] bg-mac text-white">
            bg-mac
        </div>
        <div class="h-[100px] w-[100px]  bg-[yellow]">
           bg-[yellow]
        </div>
    </div>
    <highlightjs language="js" :code="code"></highlightjs>
</template>
<script lang="ts" setup>
const code = `
    // tailwinds 的默认颜色
    const colors=require('tailwindcss/colors')
    module.export={
        // 主题
        theme:{ 
            // 会造成默认颜色 丢失掉
            colors:{
                ...colors,
                mac:"#74CFFB"
                },
            extends:{
                // 覆盖默认颜色 或添加新颜色
                color:{
                    // mac:"#74CFFB",
                    // 使用方式 bg-mac-300
                    mac:{
                    100:"#74CFFB",
                    200:"#49819D",
                    300:"#0B1419",
                    DEFAULT:"red" ,// 默认的使用方式 xxx-mac
                    }
                }
            }
        }
    }

    // color:transparent 父颜色
    // color:currentColor 当前颜色

/*
 xxx-[] 对他人设置任意颜色
*/

`;
</script>
<style lang="scss" scoped></style>