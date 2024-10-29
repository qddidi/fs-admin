<template>
    <el-scrollbar>
        <div class="flex">
            <el-tag @contextmenu.prevent="tagsEmits('openMenu', $event, index)"
                v-for="(item, index) in tagsProps.navTags" @click="handelTo(item)" :key="item.name"
                class="ml-2 cursor-pointer flex-shrink-0" :effect="currentPath === item.path ? 'dark' : undefined"
                type="primary" :closable="item.path != '/'" @close="handleClose(index, item.path, currentPath)">
                {{ item.name }}
                <slot :item="item" :currentPath="currentPath" :index="index" />
            </el-tag>
        </div>
    </el-scrollbar>
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { NavTag } from '@/store/types';
const route = useRoute();
const router = useRouter();

type TagsProps = {
    navTags: NavTag[];
};
const tagsProps = defineProps<TagsProps>()

type TagsEmits = {
    (e: 'close', index: number, path: string, currentPath: string): void;
    (e: 'openMenu', event: Event, index: number): void;

}
const tagsEmits = defineEmits<TagsEmits>()
//当前路由路径
const currentPath = ref()
watch(
    () => route.path,
    (path) => {
        currentPath.value = path;
    },
    { immediate: true }
);
//路由跳转
const handelTo = (item: any) => {
    router.push(item.path);
};

/**
 * 
 * @param index 标签索引
 * @param path 标签路径
 * @param currentPath 当前路由路径
 */
const handleClose = (index: number, path: string, currentPath: string) => {
    tagsEmits('close', index, path, currentPath)
};
</script>
