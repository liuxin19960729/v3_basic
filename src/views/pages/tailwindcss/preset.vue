<template>
    <div>
        <highlightjs language='js' :code="code"></highlightjs>
    </div>
</template>
<script lang="ts" setup>
const code = `
    module.export ={
        // 允许你指定一个不同的配置作为基础
        presets: [require('@acmecorp/tailwind-base')],
    }

 
    // preset 创建
    // 预设的创建和 tailwind.config.js 一样
    xxx.js
    module.export={

    }

  预设和config 的合并方式

  
  module.export={
    // 空数据 会禁用所有配置 使他们没有默认的配置
    
    presets:[],
  }
    
`;
</script>
<style lang="scss" scoped></style>