<template>
  <div class="flex items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-200">
    <div class="flex mx-auto bg-white rounded py-10">
      <div class="w-[330px] box-border text-center pt-10">
        <div class="text-[#444444] font-bold">打开微信App</div>
        <div class="text-sm pt-2 pb-6">右上角扫一扫</div>
        <div class="border border-gray rounded w-[50%] mx-auto overflow-hidden inline-block">
          <img class="w-full" src="../../assets/login/gzh_code.jpg" alt="" />
        </div>
        <div class="pt-4 font-bold text-sm">扫码登录</div>
      </div>
      <div class="w-[400px] pl-10 pr-10 pb-3 border-box border-l border-l-2 border-gray">
        <div class="font-bold mb-3">密码登录</div>
        <el-form :model="formLogin" :rules="loginRules">
          <el-form-item prop="username">
            <el-input size="large" placeholder="请输入用户名" v-model="formLogin.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" v-model="formLogin.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="formLogin.captcha" size="large" auto-complete="off" placeholder="验证码"
              class="w-[60%] mr-4">
            </el-input>
            <div @click="handleGetCaptcha" v-html="codeUrl"></div>
          </el-form-item>
          <el-checkbox v-model="isRemember" label="记住密码" size="large" />
          <el-button type="primary" class="w-full mt-5 !h-[40px]" @click="handleLogin">登录</el-button>
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
import { login, getCaptcha } from "@/api/login";
import { LoginDto } from "@/api/login/types/login.dto";
import { Storage } from "@/utils/storage";
import { useRouter } from "vue-router";
import useHome from "@/store/index"
const homeStore = useHome()
console.log(homeStore);

const router = useRouter();
const formLogin = reactive<LoginDto>({
  username: "",
  password: "",
  id: "",
  captcha: "",
});
const loginRules = reactive({
  username: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
});

//获取验证码

const codeUrl = ref<string>();
const handleGetCaptcha = async () => {
  const { data } = await getCaptcha();
  codeUrl.value = data.img;
  formLogin.id = data.id;
};

//登录
const handleLogin = async () => {
  const { data } = await login(formLogin);
  Storage.set<string>("token", data);

  if (isRemember.value) {
    rememberPassword(formLogin);
  } else {
    Storage.remove("userAccount");
  }
  router.push("/");
};
/**
 * 记住密码
 * @param account 账户密码
 */
const rememberPassword = (account: LoginDto) => {
  Storage.set<LoginDto>("userAccount", account);
};
const isRemember = ref(false);

//获取记住的账户密码
const getRememberAccount = () => {
  const userAccount: LoginDto | null = Storage.get("userAccount");
  if (!userAccount) return;
  formLogin.username = userAccount.username;
  formLogin.password = userAccount.password;
  isRemember.value = true;
};
onMounted(() => {
  getRememberAccount();
  if (Storage.get("token")) return router.push("/");
  handleGetCaptcha();
});
</script>
