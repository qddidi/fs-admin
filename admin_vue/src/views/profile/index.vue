<template>
  <div class="fs_profile">
    <el-card class="w-[450px]">
      <template #header>
        <div class="card-header">
          <span>我的资料</span>
        </div>
      </template>
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
      >
        <img
          v-if="proFileData.avatar"
          :src="proFileData.avatar"
          class="avatar"
        />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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
          <div>{{ proFileData.nick_name }}</div>
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
  </div>
</template>

<script lang="ts" setup>
import { getProfile } from "@/api/user/index";
import { ref } from "vue";

const proFileData = ref<any>({});
const getProFileData = async () => {
  const { data } = await getProfile();
  proFileData.value = data;
  console.log(proFileData.value);
};
getProFileData();
</script>
<style lang="scss">
.fs_profile {
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
