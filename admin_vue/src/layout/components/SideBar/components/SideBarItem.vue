<template>
  <el-sub-menu
    class="grid"
    v-if="controlSubView(props.item)"
    :index="props.item.path"
  >
    <template #title>
      <component class="w-[20px] mr-2 ml-1" :is="props.item.icon" />
      <span>{{ props.item.meta.title }}</span>
    </template>
    <SideBarItem v-for="i in props.item.children" :key="i.id" :item="i" />
  </el-sub-menu>
  <el-menu-item
    v-else
    v-if="controlMenuView(props.item)"
    :index="dealRoutePath(props.item.path)"
  >
    <component class="w-[20px] mr-2 ml-1" :is="props.item.icon" />
    <span>{{ props.item?.meta?.title }}</span>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { MenuList } from "@/store/types/index";
import { dealRoutePath } from "@/utils/routeUtils";
type Props = {
  item: MenuList;
};
const props = defineProps<Props>();

const controlSubView = (item: MenuList) => {
  return !item?.meta?.hidden && item.menu_type === 1;
};
const controlMenuView = (item: MenuList) => {
  return !item?.meta?.hidden && item.menu_type === 2;
};
</script>
