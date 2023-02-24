<template>
    <div>

    </div>
</template>
<script lang="ts">
import { defineComponent, isRef, reactive, ref, unref } from "vue";

export default defineComponent({
   setup(props,{expose}){
      const a=100;
      const b=300;
      expose({a});
      const c=ref(700);
    //   console.log(isRef(c))
      console.log(unref(c))
      const rd=reactive({a:200})
      console.log(rd.a==c.value)
      return {a,b}
   }
})
</script>
<style lang="scss" scoped></style>