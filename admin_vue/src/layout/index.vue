<template>
  <div class="flex">
    <div class="h-screen">
      <SideBar />
    </div>
    <div class="flex-1 h-screen overflow-auto relative pt-[100px]">
      <NavBar
        class="fs_nav absolute width-full height-[100px] left-0 top-0 right-0"
      />
      <AppMain class="appmain" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SideBar, AppMain, NavBar } from "./components/index.ts";
</script>
<style lang="scss">
.appmain {
  height: calc(100vh - 100px);
  overflow-y: scroll;
}
</style>
