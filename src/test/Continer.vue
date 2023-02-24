<template>
    <div>
        <test-2 :ref="(el:any)=>zz=el"></test-2>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Test2 from './Test2.vue'
     const zz =ref()
    //  onMounted(()=>{
    //     console.log(zz.value.a)
    //  console.log(zz.value.b)
    //  })
</script>
<style lang="scss" scoped>
    
</style>