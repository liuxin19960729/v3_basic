<template>
    <div>
        <div>
            <h1 class="font-bold">焦点伪元素</h1>
            <!-- 悬浮伪元素 -->
            <button class="px-[20px] py-[10px] hover:bg-red-400 bg-yellow-50">点击</button>
            <!-- 只要焦点获取都触发 -->
            <button class="px-[20px] py-[10px] focus:bg-gray-500">点击二</button>
            <!-- 点击不触发 focus-visable
            只有键盘获取按钮才触发
        -->
            <button class="px-[20px] py-[10px] focus-visible:bg-yellow-500">点击三</button>

            <!-- 点击子元素(focus 必须是input button textarea) 触发 父 focus -->
            <div class="px-[20px] py-[10px] bg-gray-400 focus-within:bg-yellow-200">
                我是div
                <button class="inline-block bg-red-300 focus:bg-red-500">
                    foucs-within
                </button>
            </div>
        </div>
        <div>
            <!-- first last -->
            <h1>伪类选择器 last first</h1>
            <ul>
                <li class="last:bg-green-500 first:bg-red-100">1</li>
                <li class="bg-green-500">2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
                <li>10</li>
            </ul>

            <h1>odd event 奇偶选择器</h1>

            <div>
                <div v-for="n of 10" :key="n" class="bg-red-200 even:bg-blue-500 odd:bg-yellow-200">
                    index:{{ n }}
                </div>
            </div>

            <div>
                <h1>表单状态</h1>
                <input type="text" required class="ring-4 focus:ring-yellow-300  outline-0 rounded-sm invalid:ring-red-600 border-0 required:ring-gray-700">
                
                <input type="text" value="readonly" readonly class="read-only:bg-gray-300 outline-0">
            </div>
        </div>



        <highlightjs language="js" :code="code"></highlightjs>

    </div>
</template>
<script lang="ts" setup>
const code = `
            //伪类
            //:required  input select textarea 这些表单元素必须填写
            // foucus 获取焦点的元素  hover 悬浮

            last first 
            同一父元素下面的根元素第一个


        `
</script>
<style lang="scss" scoped></style>