<template>
    <h1></h1>
    <div>
        <div class="bg-red-500">
            <ul>
                <li><a href="./xiangyinshi">响应式</a></li>
            </ul>
        </div>
        <button class="bg-gray-400 rounded-sm px-[20px] py-[10px]" @click="back">回退</button>
        <div>

            <router-view>

            </router-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {useRouter } from "vue-router";

const route=useRouter()
function back() {
    route.go(-1)
}
</script>
<style lang="scss" scoped></style>