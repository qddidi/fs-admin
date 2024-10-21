<template>
    <div class="flex">
        <div class="h-screen">
            <SideBar />
        </div>
        <div class="flex-1 overflow-auto">
            <NavBar />
            <AppMain />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SideBar, AppMain, NavBar } from "./components/index.ts"
</script>