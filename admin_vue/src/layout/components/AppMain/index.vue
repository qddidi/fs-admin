<template>
    <div class="app_main">
        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component :is="Component" :key="route.path" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script lang='ts' setup>
import "./index.scss"
</script>
