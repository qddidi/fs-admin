<template>
    <div>
        <div v-hasPerm="['sys:role:list']">菜单管理</div>
        <div>
            <el-button @click="count++">{{ count }}</el-button>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
defineOptions({
    name: 'Menu'
})
const count = ref(0)
</script>
<style lang='scss'></style>