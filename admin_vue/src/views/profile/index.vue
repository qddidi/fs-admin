<template>
  <el-row class="fs_profile" :gutter="20">
    <el-col :span="8">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>我的信息</span>
          </div>
        </template>
        <el-upload class="avatar-uploader" :action="uploadParams.uploadUrl" :headers="uploadParams.headers"
          :on-success="handleAvatarSuccess" :show-file-list="false">
          <img v-if="proFileData.avatar" :src="proFileData.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <ul>
          <li class="profile">
            <div class="profile_label">
              <User class="profile_label_icon" />
              <div class="profile_label_text">用户名</div>
            </div>
            <div>{{ proFileData.username }}</div>
          </li>
          <li class="profile">
            <div class="profile_label">
              <Avatar class="profile_label_icon" />
              <div class="profile_label_text">昵称</div>
            </div>
            <div>{{ proFileData.nickname }}</div>
          </li>
          <li class="profile">
            <div class="profile_label">
              <Iphone class="profile_label_icon" />
              <div class="profile_label_text">手机号</div>
            </div>
            <div>{{ proFileData.telephone }}</div>
          </li>
          <li class="profile">
            <div class="profile_label">
              <Message class="profile_label_icon" />
              <div class="profile_label_text">邮箱</div>
            </div>
            <div>{{ proFileData.email }}</div>
          </li>
          <li class="profile">
            <div class="profile_label">
              <Calendar class="profile_label_icon" />
              <div class="profile_label_text">创建时间</div>
            </div>
            <div>{{ proFileData.create_time }}</div>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <template v-slot:header>
          <div>
            <span>个人资料</span>
          </div>
        </template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本资料" name="userinfo">
            <userInfo :user="proFileData" @submit="updateUser" />
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="resetPwd">
            <resetPassWord @submit="resetPwd" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { getProfile } from "@/api/user/index";
import { ref } from "vue";
import { Storage } from "@/utils/storage";
import { ElMessage } from "element-plus";
import useAppStore from "@/store/index";
import userInfo from "./components/userInfo.vue";
import resetPassWord from "./components/resetPassWord.vue";
import type { ResetForm, UserInfo } from "./types";
import { updateUserInfo, updatePassword } from "@/api/user/index";
const appStore = useAppStore();
const uploadParams = {
  uploadUrl: import.meta.env.VITE_APP_API + "/user/uploadAvatar",
  headers: { authorization: "Bearer " + Storage.get("token") },
};

const proFileData = ref<Partial<UserInfo>>({});
const getProFileData = async () => {
  const { data } = await getProfile();
  proFileData.value = data;
  appStore.$patch({
    userInfo: {
      avatar: data.avatar,
    },
  });
};

const handleAvatarSuccess = (res: any) => {
  if (res.code == 200) {
    ElMessage.success("头像设置成功");
    getProFileData();
  } else {
    ElMessage.error(res.describe);
  }
};
getProFileData();

const activeName = ref("userinfo");
const updateUser = async (data: Partial<UserInfo>) => {
  await updateUserInfo(data);
  ElMessage.success("修改成功");
  getProFileData();
};

const resetPwd = async (data: ResetForm) => {
  await updatePassword(data);
  ElMessage.success("修改成功");
  getProFileData();
};
</script>
<style lang="scss">
.fs_profile {
  min-width: 1000px;

  .avatar-uploader {
    text-align: center;
    margin: 30px 0;

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      margin: 0 auto;
    }

    .avatar {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;

    text-align: center;
  }

  .profile {
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    border-top: 1px solid lightgray;

    .profile_label {
      display: flex;
      color: gray;
      align-items: center;

      .profile_label_icon {
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }

      .profile_label_text {
        flex: none;
      }
    }
  }
}
</style>
