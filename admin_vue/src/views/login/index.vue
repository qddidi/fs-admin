<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="flex mx-auto bg-white rounded py-10">
      <div class="w-[330px] box-border text-center pt-10">
        <div class="text-[#444444] font-bold">获取教程</div>
        <div class="text-sm pt-2 pb-6">微信扫码关注公众号</div>
        <div
          class="border border-gray rounded w-[50%] mx-auto overflow-hidden inline-block"
        >
          <img class="w-full" src="../../assets/login/gzh_code.jpg" alt="" />
        </div>
        <div class="pt-4 font-bold text-sm">
          点击菜单[实战项目]获取本系列教程
        </div>
      </div>
      <div
        class="w-[400px] pl-10 pr-10 pb-3 border-box border-l border-l-2 border-gray"
      >
        <div class="font-bold mb-3">密码登录</div>
        <el-form :model="formLogin" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              class="h-[40px]"
              placeholder="请输入用户名"
              v-model="formLogin.username"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="h-[40px]"
              v-model="formLogin.password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-checkbox v-model="isRemember" label="记住密码" size="large" />
          <el-button
            type="primary"
            class="w-full mt-5 !h-[40px]"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form>
        <div class="flex items-center justify-between mt-4">
          <div class="w-[100px] border-t-2 border-gray"></div>
          <div class="text-[#999] text-[14px]">其它方式登录</div>
          <div class="w-[100px] border-t-2 border-gray"></div>
        </div>
        <div class="flex justify-around mt-4">
          <div class="bg-[#f5f5f5] rounded-full p-2">
            <wxIcon />
          </div>
          <div class="bg-[#f5f5f5] rounded-full p-2">
            <qqIcon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import wxIcon from "@/assets/svg/wx_icon.vue";
import qqIcon from "@/assets/svg/qq_icon.vue";
import { reactive, ref, onMounted } from "vue";
import { login } from "@/api/login";
import { LoginVo } from "@/api/login/types/login.vo";
import { Storage } from "@/utils/storage";
import { useRouter } from "vue-router";
const router = useRouter();
const formLogin = reactive<LoginVo>({ username: "", password: "" });
const loginRules = reactive({
  username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
});
//登录
const handleLogin = async () => {
  const { data } = await login(formLogin);
  Storage.set<string>("token", data);
  router.push("/");
  if (isRemember.value) {
    rememberPassword(formLogin);
    return;
  }
  Storage.remove("userAccount");
};
/**
 * 记住密码
 * @param account 账户密码
 */
const rememberPassword = (account: LoginVo) => {
  Storage.set<LoginVo>("userAccount", account);
};
const isRemember = ref(false);

//获取记住的账户密码
const getRememberAccount = () => {
  const userAccount: LoginVo | null = Storage.get("userAccount");
  if (!userAccount) return;
  formLogin.username = userAccount.username;
  formLogin.password = userAccount.password;
  isRemember.value = true;
};
onMounted(() => {
  getRememberAccount();
  if (Storage.get("token")) router.push("/");
});
</script>
x
