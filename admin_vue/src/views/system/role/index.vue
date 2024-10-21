<template>
    <div @click="a++">角色管理{{ a }}</div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const a = ref(1)
</script>
<style lang='scss'></style>