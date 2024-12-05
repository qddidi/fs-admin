<template>
  <el-form ref="userRef" :model="user" label-width="80px">
    <el-form-item label="用户昵称" prop="nickName">
      <el-input v-model="user.nickname" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号码" prop="telephone">
      <el-input v-model="user.telephone" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="user.email" maxlength="50" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import type { UserInfo } from "../types";

const userProps = defineProps<{ user: Partial<UserInfo> }>();

const { user } = toRefs(userProps);
type Emits = {
  (e: "submit", user: Partial<UserInfo>): void;
};
const emits = defineEmits<Emits>();
const submit = () => {
  emits("submit", userProps.user);
};
</script>
