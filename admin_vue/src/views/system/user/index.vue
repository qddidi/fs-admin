<template>
  <div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item label="用户名称">
        <el-input v-model="queryParams.username" placeholder="用户名称" class="w-[150px]" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status" class="w-[150px]">
        <el-select v-model="queryParams.status" placeholder="用户状态" clearable>
          <el-option v-for="dict in dickStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-hasPerm="['system:user:list']" icon="Search" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button type="primary" v-hasPerm="['system:user:add']" plain icon="Plus" @click="handleAdd()">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" v-hasPerm="['system:user:export']" plain icon="Download"
          @click="exportDataList()">导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" v-hasPerm="['system:user:import']" plain icon="Upload"
          @click="importDataList()">导入</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="isLoading" class="w-full mt-2" row-key="id" border>
      <el-table-column prop="username" label="用户名" />

      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="telephone" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-switch @change="changeStatus(scope.row)" :model-value="!!scope.row.status"></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="update_time" label="更新时间" />

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-link type="primary" icon="Edit" class="mr-1" v-hasPerm="['system:user:edit']"
            @click="handleUpdate(scope.row)">修改</el-link>
          <el-link type="danger" icon="Delete" v-hasPerm="['system:user:delete']"
            @click="handleDelete(scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" background class="p-5" layout="total,sizes, prev, pager, next" :total="total"
      v-model:current-page="queryParams.page_num" v-model:page-size="queryParams.page_size" @change="getList" />
    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="isUpdate ? '修改' : '新增'" width="500px" v-model="dialogVisible" append-to-body>
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isUpdate">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="form.telephone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="显示状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dickStatus" :key="dict.value" :label="dict.label" :value="dict.value"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role_ids" multiple placeholder="选择角色" style="width: 240px">
            <el-option v-for="item in roleOptions" :key="item.id" :label="item.role_name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 导入 -->
    <el-dialog width="400px" :title="uploadParams.title" v-model="uploadParams.open" append-to-body>
      <el-upload class="upload-demo" drag accept=".xlsx, .xls" :limit="1" ref="upload" :auto-upload="false"
        :action="uploadParams.url" :headers="uploadParams.headers" :on-exceed="handleExceed"
        :disabled="uploadParams.isUploading" :on-progress="handleProgress" :on-success="handleFileSuccess">
        <el-icon class="el-icon--upload">
          <component is="UploadFilled" />
        </el-icon>
        <div class="el-upload__text">拖拽文件到这或 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">仅允许导入xls、xlsx格式文件。</div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="uploadSubmit">确 定</el-button>
          <el-button @click="uploadParams.open = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { DataItem, Form, QueryParams } from "@/api/user/types/user.dto";
import {
  ElMessage,
  ElMessageBox,
  FormInstance,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  genFileId,
} from "element-plus";
import { getDataList, updateData, addData, deleteData } from "@/api/user/index";
import { getRoleList } from "@/api/role/index";
import { deepClone, handleDateRangeChange } from "@/utils/common";
import { RoleList } from "@/api/role/types/role.dto";
import { validate_phoneNumber, validate_email } from "@/utils/validateForm";
import { downLoad } from "@/utils/http";
import { Storage } from "@/utils/storage";
const queryParams = reactive<QueryParams>({
  username: "",
  status: "",
  telephone: "",
  begin_time: "",
  end_time: "",
  page_num: 1,
  page_size: 10,
});

const dateRange = ref<any>([]);
const dickStatus = [
  {
    label: "启用",
    value: 1,
  },
  {
    label: "禁用",
    value: 0,
  },
];

const total = ref(0);
const tableData = ref<DataItem[]>([]);

const rules = ref({
  username: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "密码必须是6~16位",
      trigger: "blur",
      min: 6,
      max: 16,
    },
  ],
  email: [
    {
      validator: validate_email,
      message: "邮箱格式不正确",
      trigger: "blur",
      required: true,
    },
  ],
  telephone: [
    {
      validator: validate_phoneNumber,
      message: "手机号格式不正确",
      trigger: "blur",
      required: true,
    },
  ],
});
const handleQuery = async () => {
  getList();
};

const isLoading = ref(false);
const getList = async () => {
  handleDateRangeChange(dateRange.value, queryParams);
  try {
    isLoading.value = true;
    const { data } = await getDataList(queryParams);
    tableData.value = data.list;
    total.value = data.total;
  } finally {
    isLoading.value = false;
  }
};

getList();

const roleOptions = ref<RoleList[]>([]);
const getRoleListData = async () => {
  const { data } = await getRoleList({});
  roleOptions.value = data.list;
};
getRoleListData();
const ruleFormRef = ref<FormInstance>();

const dialogVisible = ref(false);

const isUpdate = ref(false);
const form = ref<Form>({} as Form);

const resetForm = () => {
  form.value = {
    username: "",
    email: "",
    status: 1,
    nickname: "",
    telephone: "",
  };
};

//更新状态
const changeStatus = async (row: DataItem) => {
  const uptateRow: Form = {} as Form;
  uptateRow.status = row.status === 1 ? 0 : 1;
  uptateRow.id = row.id;

  await updateData(uptateRow);
  ElMessage({
    type: "success",
    message: "状态更新成功",
  });
  getList();
};
//新增
const handleAdd = () => {
  resetForm();
  dialogVisible.value = true;
  isUpdate.value = false;
};

//编辑
const handleUpdate = (row: Form & { roles?: RoleList[] }) => {
  resetForm();

  isUpdate.value = true;
  form.value = deepClone(row);
  form.value.role_ids = row.roles?.map((item) => item.id);

  dialogVisible.value = true;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const action = isUpdate.value ? updateData : addData;
      const successMessage = isUpdate.value ? "修改成功" : "添加成功";
      await action(form.value);
      dialogVisible.value = false;
      ElMessage.success(successMessage);
      getList();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const cancel = () => {
  dialogVisible.value = false;
};

//删除
const handleDelete = async (row: DataItem) => {
  await ElMessageBox.confirm("确认删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });

  await deleteData(row.id);
  ElMessage({
    type: "success",
    message: "删除成功",
  });
  getList();
};

//导出
const exportDataList = async () => {
  downLoad("/user/export", queryParams, `用户列表_${new Date().getTime()}`);
};

//导入

/*** 用户导入参数 */
const uploadParams = reactive({
  // 是否显示弹出层（用户导入）
  open: false,
  // 弹出层标题（用户导入）
  title: "",
  // 上传中
  isUploading: false,
  // 设置上传的请求头部
  headers: { authorization: "Bearer " + Storage.get("token") },
  // 上传的地址
  url: import.meta.env.VITE_APP_API + "/user/upload",
});
const importDataList = async () => {
  uploadParams.open = true;
  uploadParams.title = "用户导入";
};
const upload = ref<UploadInstance>();

// 文件选择覆盖前一个文件
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

//上传中
const handleProgress: UploadProps["onProgress"] = () => {
  uploadParams.isUploading = true;
};

// 上传提交
const uploadSubmit = () => {
  upload.value!.submit();
};
// 上传成功处理
const handleFileSuccess: UploadProps["onSuccess"] = (response) => {
  upload.value!.clearFiles();
  uploadParams.isUploading = false;
  const { code, describe } = response;
  if (code !== 200) {
    ElMessage.error(describe);
    return;
  }
  ElMessage.success("导入成功");
  uploadParams.open = false;
  getList();
};
</script>
