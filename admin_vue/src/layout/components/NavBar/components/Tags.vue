<template>
    <el-scrollbar>
        <div class="flex">
            <el-tag v-for="(item, index) in tagsProps.navTags" @click="handelTo(item)" :key="item.name"
                class="ml-2 cursor-pointer flex-shrink-0" :effect="currentPath === item.path ? 'dark' : undefined"
                type="primary" :closable="item.path != '/'" @close="handleClose(index, item.path)">
                {{ item.name }}

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
    (e: 'close', index: number): void;
}
const tagsEmits = defineEmits<TagsEmits>()
const currentPath = ref()
watch(
    () => route.path,
    (path) => {
        currentPath.value = path;
    },
    { immediate: true }
);
const handelTo = (item: any) => {
    router.push(item.path);
};

const handleClose = (index: number, path: string) => {
    tagsEmits('close', index)


    if (path === currentPath.value) {
        const length = tagsProps.navTags.length;
        length && router.push(tagsProps.navTags.slice(-1)[0].path);
    }
};
</script>
