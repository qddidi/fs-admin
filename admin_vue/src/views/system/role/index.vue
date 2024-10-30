<template>
    <div>
        <div>角色管理</div>
        <div>
            <el-button @click="count++">{{ count }}</el-button>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
const count = ref(0)
</script>