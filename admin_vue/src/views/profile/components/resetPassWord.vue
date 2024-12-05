<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input
        v-model="user.oldPassword"
        placeholder="请输入旧密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="user.newPassword"
        placeholder="请输入新密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="user.confirmPassword"
        placeholder="请确认密码"
        type="password"
        show-password
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit(pwdRef)">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { ref } from "vue";
import { ResetForm } from "../types";
const pwdRef = ref<FormInstance>();
const user = ref<ResetForm>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

type Emits = {
  (e: "submit", user: ResetForm): void;
};
const emits = defineEmits<Emits>();
const equalToPassword = (
  rule: any,
  value: string,
  callback: (arg0?: Error) => void
) => {
  console.log(rule);

  if (user.value.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  newPassword: [
    { required: true, message: "新密码不能为空", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
});

function submit(pwdRef: FormInstance | undefined) {
  if (!pwdRef) return;
  pwdRef.validate((valid) => {
    if (valid) {
      emits("submit", user.value);
    }
  });
}
</script>
