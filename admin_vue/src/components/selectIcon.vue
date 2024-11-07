<template>
    <div class="flex flex-wrap">
        <div v-for="item in ElementPlusIconsVue" @click="emits('change', item.name)"
            class="p-3 border border-solid cursor-pointer" :key="item.name">
            <component class="w-5" :is="item.name" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
type Emits = {
    (e: "change", val: string): void,

}
const emits = defineEmits<Emits>()
</script>
