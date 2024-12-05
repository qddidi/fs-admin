<template>
  <div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item label="角色名称">
        <el-input v-model="queryParams.role_name" placeholder="角色名称" class="w-[150px]" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status" class="w-[150px]">
        <el-select v-model="queryParams.status" placeholder="角色状态" clearable>
          <el-option v-for="dict in dickStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-hasPerm="['system:role:list']" icon="Search" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button type="primary" v-hasPerm="['system:role:add']" plain icon="Plus" @click="handleAdd()">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" class="w-full mt-2" row-key="id" v-loading="isLoading" border>
      <el-table-column prop="role_name" label="角色名" />
      <el-table-column prop="role_sort" label="显示顺序" width="100" />

      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-switch @change="changeStatus(scope.row)" :model-value="!!scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="描述" />
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="update_time" label="更新时间" />

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-link type="primary" icon="Edit" class="mr-1" @click="handleUpdate(scope.row)"
            v-hasPerm="['system:role:edit']">修改</el-link>
          <el-link type="danger" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPerm="['system:role:delete']">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" background class="p-5" layout="total,sizes, prev, pager, next" :total="total"
      v-model:current-page="queryParams.page_num" v-model:page-size="queryParams.page_size" @change="getList" />
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="isUpdate ? '修改' : '新增'" width="500px" v-model="dialogVisible" append-to-body>
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="form.role_name" placeholder="请输入角色名称" />
        </el-form-item>

        <el-form-item label="角色顺序" prop="role_sort">
          <el-input-number v-model="form.role_sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dickStatus" :key="dict.value" :label="dict.label" :value="dict.value"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree class="tree-border" ref="menuRef" :data="menuOptions" check-strictly show-checkbox node-key="id"
            @check="handleCheck" empty-text="加载中，请稍候" :props="{ label: 'title', children: 'children' }"></el-tree>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getRoleList, addRole, updateRole } from "@/api/role";
import { QueryRoleParams, RoleForm, RoleList } from "@/api/role/types/role.dto";
import { reactive, ref, useTemplateRef } from "vue";
import { getMenuList } from "@/api/menu";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { deepClone } from "@/utils/common";
import { deleteRole } from "../../../api/role/index";
import { handleDateRangeChange } from "../../../utils/common";
import { MenuList } from "../../../store/types/index";
import { nextTick } from "vue";
const queryParams = reactive<QueryRoleParams>({
  role_name: "",
  status: "",
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
const ruleFormRef = ref<FormInstance>();
const total = ref(0);
const tableData = ref<RoleList[]>([]);

const menuOptions = ref([]);
const getMenu = async () => {
  const { data } = await getMenuList({});
  menuOptions.value = data;
};
getMenu();

const rules = ref({
  role_name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
});
const handleQuery = async () => {
  getList();
};

const isLoading = ref(false);
const getList = async () => {
  isLoading.value = true;
  handleDateRangeChange(dateRange.value, queryParams);
  try {
    const { data } = await getRoleList(queryParams);
    tableData.value = data.list;
    total.value = data.total;
  } finally {
    isLoading.value = false;
  }
};

getList();

const form = ref<RoleForm>({} as RoleForm);
const menuRef = useTemplateRef<any>("menuRef");
const resetForm = () => {
  form.value = {
    role_name: "",
    role_sort: 0,
    status: 1,
    remark: "",
  };
};

// 树形控件菜单id集合
const handleCheck = (_: any, data: any) => {
  form.value.menu_ids = data.checkedKeys;
};
//更新状态
const changeStatus = async (row: RoleList) => {
  const uptateRow: RoleForm = {} as RoleForm;
  uptateRow.status = row.status === 1 ? 0 : 1;
  uptateRow.id = row.id;

  await updateRole(uptateRow);
  ElMessage({
    type: "success",
    message: "状态更新成功",
  });
  getList();
};

const dialogVisible = ref(false);

const isUpdate = ref(false);

//新增
const handleAdd = () => {
  resetForm();
  dialogVisible.value = true;
  isUpdate.value = false;
};
//编辑
const handleUpdate = (row: RoleForm & { menus?: MenuList[] }) => {
  resetForm();

  isUpdate.value = true;
  form.value = deepClone(row);
  form.value.menu_ids = row.menus?.map((item) => item.id);

  dialogVisible.value = true;
  nextTick(() => {
    if (menuRef.value) {
      menuRef.value.setCheckedKeys(form.value.menu_ids);
    }
  });
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      dialogVisible.value = false;
      const action = isUpdate.value ? updateRole : addRole;
      const successMessage = isUpdate.value ? "修改成功" : "添加成功";
      await action(form.value);
      ElMessage.success(successMessage);
      getList();
    } else {
      console.log("错误的提交!", fields);
    }
  });
};
const cancel = () => {
  dialogVisible.value = false;
};

//删除
const handleDelete = async (row: RoleList) => {
  await ElMessageBox.confirm("确认删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });

  await deleteRole(row.id);
  ElMessage({
    type: "success",
    message: "删除成功",
  });
  getList();
};
</script>
