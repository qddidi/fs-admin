<template>
    <div class="w-full h-full">
        <iframe class="w-full h-full" :src="linkUrl" frameborder="0"></iframe>
    </div>
</template>

<script lang='ts' setup>
import { useRoute } from "vue-router";
const route = useRoute();
const linkUrl = route.meta?.externalLink as string;
</script>
