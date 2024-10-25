<template>
    <div class="p-2 shadow-sm flex items-center">
        <div @click="appStore.isCollapse = !appStore.isCollapse" class="mr-4">
            <Fold v-if="!appStore.isCollapse" class="w-6 cursor-pointer" />
            <Expand v-else class="w-6 cursor-pointer" />
        </div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in appStore.breadcrumbs">
                {{ item.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="shadow-sm py-1">
        <Tags :nav-tags="appStore.navTags" @close="closeTag" />
    </div>
</template>

<script lang='ts' setup>
import useAppStore from '@/store/index';
import Tags from "./components/Tags.vue"
const appStore = useAppStore()
const closeTag = (index: number) => {
    appStore.navTags.splice(index, 1);
}

</script>
