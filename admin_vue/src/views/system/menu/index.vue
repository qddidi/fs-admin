<template>
  <div>
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入菜单名称"
          clearable
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" class="w-[150px]">
        <el-select
          v-model="queryParams.status"
          placeholder="菜单状态"
          clearable
        >
          <el-option
            v-for="dict in dickStatus"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button
          type="primary"
          v-hasPerm="['system:menu:add']"
          plain
          icon="Plus"
          @click="handleAdd()"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="title" label="菜单名" />
      <el-table-column prop="order_num" label="排序" />
      <el-table-column prop="path" label="路由" />
      <el-table-column prop="permission" label="权限字段" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column label="图标">
        <template #default="scope">
          <component
            v-if="scope.row.icon"
            class="w-[20px] mr-2 ml-1"
            :is="scope.row.icon"
          />
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="scope">
          <el-switch :model-value="!!scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-link
            type="primary"
            icon="Edit"
            class="mr-1"
            @click="handleAdd(scope.row)"
            v-hasPerm="['system:menu:add']"
            >新增</el-link
          >
          <el-link
            type="primary"
            icon="Edit"
            class="mr-1"
            @click="handleUpdate(scope.row)"
            v-hasPerm="['system:menu:edit']"
            >修改</el-link
          >
          <el-link
            type="danger"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPerm="['system:menu:delete']"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增修改对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isUpdate ? '修改菜单' : '新增菜单'"
      width="670px"
    >
      <el-form
        :model="form"
        ref="ruleFormRef"
        label-width="120px"
        :rules="rules"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <el-cascader
                v-model="form.parent_id"
                :show-all-levels="false"
                @change="handleMenuChange"
                :options="tableData"
                placeholder="请选择菜单"
                checkStrictly
                :props="defaultProps"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menu_type">
              <el-radio-group v-model="form.menu_type">
                <el-radio :value="1">目录</el-radio>
                <el-radio :value="2">菜单</el-radio>
                <el-radio :value="3">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="form.title" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="form.menu_type === 2">
            <el-form-item label="组件路径">
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="form.menu_type !== 3">
            <el-form-item class="relative" label="图标">
              <el-input
                :prefix-icon="form.icon"
                @click="showIconView = true"
                v-model="form.icon"
                readonly
                placeholder="请选择图标"
              />
              <div
                v-if="showIconView"
                class="border absolute top-10 bg-[#fff] z-10 border-solid p-4 h-[200px] overflow-y-scroll"
              >
                <selectIcon @change="getMenuName" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="form.menu_type !== 1">
            <el-form-item>
              <el-input
                v-model="form.permission"
                placeholder="请输入权限标识"
                maxlength="100"
              />
              <template #label>
                <span>
                  <el-tooltip
                    content="控制器中定义的权限字符，如： @Permissions('system:menu:list')"
                  >
                    <component class="w-[18px] inline" is="Warning" />
                  </el-tooltip>
                  权限字符
                </span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menu_type !== 3">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序">
              <el-input v-model="form.order_num" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示状态">
              <el-radio-group v-model="form.status">
                <el-radio :value="1">启用</el-radio>
                <el-radio :value="0">不启用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="form.menu_type === 2">
            <el-form-item label="是否缓存">
              <el-radio-group v-model="form.catch">
                <el-radio :value="1">缓存</el-radio>
                <el-radio :value="0">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addMenuList(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getMenuList, addMenu, deleteMenu, updateMenu } from "@/api/menu";
import { reactive, ref } from "vue";
import selectIcon from "@/components/selectIcon.vue";
import { ElMessage, FormInstance, ElMessageBox } from "element-plus";
import { MenuList } from "@/store/types/index";
import { deepClone } from "@/utils/common";

defineOptions({
  name: "FS_Menu",
});
const ruleFormRef = ref<FormInstance>();
const queryParams = reactive({
  title: "",
  status: 1,
});
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
const tableData = ref<MenuList[]>([]);
const getList = async () => {
  const { data } = await getMenuList(queryParams);
  tableData.value = data;
};

const handleQuery = () => {
  getList();
};
getList();

//获取自身及子菜单id
const getTreesId = (row: MenuList): number[] => {
  const ids: number[] = [];
  ids.push(row.id);
  if (row.children) {
    row.children.forEach((item: any) => {
      if (item.children) {
        const childIds = getTreesId(item);
        ids.push(...childIds);
      } else {
        ids.push(item.id);
      }
    });
  }
  return ids;
};
const handleDelete = async (row: MenuList) => {
  //updateMenu({ id: row.id, status: 0 })
  await ElMessageBox.confirm("确认删除此条菜单及子菜单吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  });
  const ids = getTreesId(row);
  deleteMenu(ids).then(() => {
    ElMessage({
      type: "success",
      message: "删除成功",
    });

    handleQuery();
  });
};

const defaultProps = {
  children: "children",
  label: "title",
  value: "id",
  checkStrictly: true,
};
const showIconView = ref(false);

const isUpdate = ref(false);
interface MenuForm {
  title: string;
  path: string;
  parent_id: any;
  component: string;
  order_num: number;
  icon: string;
  id: number | null;
  menu_type: number;
  permission: string;
  status: number;
  catch: number;
}
const form = ref<MenuForm>({} as MenuForm);
//编辑
const handleUpdate = (row: MenuForm) => {
  resetForm();
  isUpdate.value = true;
  form.value = deepClone(row);
  dialogVisible.value = true;
};
//新增
const handleAdd = (row?: MenuForm) => {
  resetForm();
  if (row?.id) {
    form.value.parent_id = row.id;
  }

  dialogVisible.value = true;
  isUpdate.value = false;
};

const rules = ref({
  title: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }],
});

const resetForm = () => {
  form.value = {
    title: "",
    path: "",
    parent_id: null,
    component: "",
    order_num: 0,
    icon: "",
    id: null,
    menu_type: 2,
    permission: "",
    status: 1,
    catch: 0,
  };
};
resetForm();
const dialogVisible = ref(false);

const addMenuList = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      dialogVisible.value = false;
      if (isUpdate.value) {
        await updateMenu(form.value);
        ElMessage({
          type: "success",
          message: "修改成功",
        });
        handleQuery();
        return;
      }

      await addMenu(form.value);
      ElMessage({
        type: "success",
        message: "新增成功",
      });
      handleQuery();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const handleMenuChange = (val: any) => {
  form.value.parent_id = val[val.length - 1];
};

const getMenuName = (menuName: string) => {
  form.value.icon = menuName;
  showIconView.value = false;
};
</script>
<style lang="scss"></style>
