<template>
  <div class="flex">
    <div class="h-screen">
      <SideBar />
    </div>
    <div class="flex-1 h-screen overflow-auto relative pt-[100px]">
      <NavBar class="fs_nav absolute width-full height-[100px] left-0 top-0 right-0" />
      <AppMain class="h-calc-100vh-100 overflow-y-scroll" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SideBar, AppMain, NavBar } from "./components/index.ts";
import useSetBarWidth from "@/composables/useSetBarWidth.ts";
useSetBarWidth()
</script>
