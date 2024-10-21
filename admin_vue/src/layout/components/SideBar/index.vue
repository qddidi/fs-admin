<template>
    <div class="h-[100%] bg-[#545c64]">
        <div class="h-[50px] text-white flex items-center justify-center">
            <span>FS权限管理系统</span>
        </div>
        <el-scrollbar class="wrap-scroll">
            <el-menu :collapse="homeStore.isCollapse" :unique-opened="true" active-text-color="#ffd04b"
                background-color="#545c64" class="el-menu-vertical-demo w-[223px] !border-r-0" text-color="#fff"
                @select="getPath">
                <SideBarItem v-for="item in homeStore.menuList" :key="item.id!" :item="item" />

            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang='ts' setup>
import useHome from "@/store"
import SideBarItem from "@/components/SideBarItem/index.vue"
import { useRouter } from "vue-router";
const router = useRouter()

const homeStore = useHome()
const getPath = (_v: any, d: string[]) => {
    router.push(`/${d.join("/")}`);
};
</script>
<style>
.wrap-scroll {
    height: calc(100% - 50px);
}
</style>
