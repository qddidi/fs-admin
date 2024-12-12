<template>
    <div>
        <el-form :model="queryParams" ref="queryRef" :inline="true">
            <el-form-item label="操作人">
                <el-input v-model="queryParams.username" placeholder="操作人" class="w-[150px]" clearable />
            </el-form-item>
            <el-form-item label="操作模块" prop="status">
                <el-input v-model="queryParams.title" placeholder="操作模块" class="w-[150px]" clearable />
            </el-form-item>
            <el-form-item label="请求地址" prop="status">
                <el-input v-model="queryParams.url" placeholder="请求地址" class="w-[150px]" clearable />
            </el-form-item>
            <el-form-item label="创建时间" style="width: 308px">
                <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
                    start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-hasPerm="['system:log:list']" icon="Search"
                    @click="handleQuery">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb-4">

            <el-col :span="1.5">
                <el-button type="warning" v-hasPerm="['system:log:export']" plain icon="Download"
                    @click="exportDataList()">导出</el-button>
            </el-col>

        </el-row>
        <el-table :data="tableData" v-loading="isLoading" class="w-full mt-2" row-key="id" border>
            <el-table-column prop="id" label="日志编号" width="100" />
            <el-table-column prop="title" label="操作模块" />
            <el-table-column prop="username" label="操作人" />
            <el-table-column prop="method" label="请求方式" />
            <el-table-column prop="params" label="请求参数" :show-overflow-tooltip="true" />
            <el-table-column prop="ip" label="主机地址" />
            <el-table-column prop="url" label="请求地址" :show-overflow-tooltip="true" />
            <el-table-column prop="user_agent" label="浏览器信息" :show-overflow-tooltip="true" />
            <el-table-column prop="create_time" label="创建时间" />

        </el-table>
        <el-pagination v-show="total > 0" background class="p-5" layout="total,sizes, prev, pager, next" :total="total"
            v-model:current-page="queryParams.page_num" v-model:page-size="queryParams.page_size" @change="getList" />


    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { QueryParams, DataItem } from "@/api/log/types/log.dto";

import { getDataList } from "@/api/log/index";
import { handleDateRangeChange } from "@/utils/common";


import { downLoad } from "@/utils/http";

const queryParams = reactive<QueryParams>({
    username: "",
    title: "",
    begin_time: "",
    end_time: "",
    page_num: 1,
    page_size: 10,
});

const dateRange = ref<any>([]);


const total = ref(0);
const tableData = ref<DataItem[]>([]);


const handleQuery = async () => {
    queryParams.page_num = 1;
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









//导出
const exportDataList = async () => {
    downLoad("/log/export", queryParams, `日志列表_${new Date().getTime()}`);
};





</script>