<template>
    <div class="bg-white shadow-lg rounded-md text-[14px] overflow-hidden cursor-pointer w-[100px] fixed">
        <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="emits('refreshTag')">
            <el-icon>
                <Refresh />
            </el-icon><span>刷新页面</span>
        </div>
        <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="emits('closeCur')">
            <el-icon>
                <CloseBold />
            </el-icon><span>关闭当前</span>
        </div>
        <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="emits('closeOtherTags')">
            <el-icon>
                <Close />
            </el-icon><span>关闭其它</span>
        </div>
        <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="emits('closeAllTags')">
            <el-icon>
                <Close />
            </el-icon><span>全部关闭</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
type Emits = {
    (e: "closeCur"): void;
    (e: "closeOtherTags"): void;
    (e: "closeAllTags"): void;
    (e: "refreshTag"): void;

};
const emits = defineEmits<Emits>();

</script>