<template>
  <div>
    <div class="p-2 shadow-sm flex items-center h-[50px] box-border">
      <div @click="appStore.isCollapse = !appStore.isCollapse" class="mr-4">
        <Fold v-if="!appStore.isCollapse" class="w-6 cursor-pointer" />
        <Expand v-else class="w-6 cursor-pointer" />
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in appStore.breadcrumbs">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ml-auto mr-5 cursor-pointer">
        <el-dropdown trigger="click">
          <div class="flex">
            <img :src="appStore.userInfo.avatar" class="w-9 h-9 object-cover rounded-full cursor-pointer" />
            <CaretBottom class="w-5" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/profile"> 个人中心 </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click="handelLogOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="shadow-sm py-1">
      <Tags @open-menu="openMenu" :nav-tags="appStore.navTags" @close="closeTag"
        #default="{ item, currentPath, index }">
        <teleport to="body">
          <TagView v-if="isTagView && nowClickIndex == index" :style="tagViewStyle"
            @close-cur="closeCur(index, item.path, currentPath)" @close-all-tags="closeAllTags"
            @close-other-tags="closeOtherTags(item)" @refreshTag="refreshTag(item)" />
        </teleport>
      </Tags>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from "@/store/index";
import Tags from "./components/Tags.vue";
import TagView from "./components/TagView.vue";
import { useRouter, useRoute } from "vue-router";
import { NavTag } from "../../../store/types/index";
import { Storage } from "@/utils/storage";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { logout } from "@/api/login";
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

//关闭tag
const closeTag = (index: number, path: string, currentPath: string) => {
  appStore.navTags.splice(index, 1);
  const length = appStore.navTags.length;
  //没用tag标签跳转首页
  if (!length) {
    router.replace("/index");
    return;
  }
  //如果关闭的是当前页,跳转上一个tag页面
  if (path === currentPath) {
    length && router.replace(appStore.navTags.slice(-1)[0].path);
  }
};
//关闭当前
const closeCur = (index: number, path: string, currentPath: string) => {
  appStore.navTags.splice(index, 1);

  if (path === currentPath) {
    const length = appStore.navTags.length;
    length && router.push(appStore.navTags[length - 1].path);
    !length && router.push("/");
  }
};
//关闭其它
const closeOtherTags = (item: NavTag) => {
  appStore.$patch({
    navTags: [{ name: "首页", path: "/" }, item],
  });
  router.push(item.path);
  isTagView.value = false;
};
//关闭所有
const closeAllTags = () => {
  appStore.$patch({
    navTags: [{ name: "首页", path: "/" }],
  });
  router.push("/");
  isTagView.value = false;
};

//刷新
const refreshTag = (item: NavTag) => {
  router.push({
    path: "/redirect" + item.fullpath,
    query: route.query,
  });
};

const isTagView = ref(false);

//点击其他地方关闭tagView

const listener = () => {
  isTagView.value = false;
  document.removeEventListener("click", listener);
};
const tagViewStyle = ref({});
const nowClickIndex = ref();
const openMenu = (e: any, index: number) => {
  isTagView.value = true;
  document.addEventListener("click", listener);
  //根据当前点击位置定位tagView的位置
  tagViewStyle.value = {
    left: e.clientX + "px",
    top: e.clientY + "px",
  };
  //记录当前点击的tag的索引,用于判断显示哪个tagView
  nowClickIndex.value = index;
};

//退出登录

const handelLogOut = async () => {
  await ElMessageBox.confirm("确认退出吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });
  await logout();
  Storage.remove("token");
  router.push("/login");
};
</script>
