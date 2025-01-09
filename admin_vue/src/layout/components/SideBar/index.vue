<template>
  <div class="h-[100%] bg-[#545c64]">
    <div class="h-[50px] text-white flex items-center justify-center">
      <img class="w-5 mr-2" src="@/assets/logo.png" alt="" />
      <span v-if="!homeStore.isCollapse">FS管理系统 </span>
    </div>
    <el-scrollbar class="wrap-scroll">
      <el-menu @select="getPath" class="el-menu-vertical-custom" :collapse="homeStore.isCollapse" :unique-opened="true"
        active-text-color="#ffd04b" background-color="#545c64" :class="`el-menu-vertical-demo !border-r-0`"
        text-color="#fff" :default-active="dealRoutePath($route.path)">
        <el-menu-item v-if="!homeStore.isCollapse" index="index">
          <component class="w-[20px] mr-2 ml-1" is="Odometer" />
          <span>首页</span>
        </el-menu-item>
        <SideBarItem v-for="item in homeStore.menuList" :key="item.id!" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import useHome from "@/store";
import SideBarItem from "./components/SideBarItem.vue";
import { dealRoutePath } from "../../../utils/routeUtils";
import { useRouter } from "vue-router";
const router = useRouter();
const homeStore = useHome();

const getPath = (_v: any, d: string[]) => {
  router.push(`/${d.join("/")}`);
};
</script>
<style lang="scss">
.wrap-scroll {
  height: calc(100% - 50px);

  .el-menu-vertical-custom:not(.el-menu--collapse) {
    width: 220px;
  }
}
</style>
