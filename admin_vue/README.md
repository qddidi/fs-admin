## 项目结构

1.页面文件统一放在 views 文件下,且命名方式为`文件夹/index.vue`

2.组件命名采用大驼峰

3.不含有响应式 api 的工具函数写在`utils`文件下,命名方式为小驼峰。含有响应式 api 的工具则称之为`hook`函数,写在`hooks`文件夹下,命名方式为`use-xxx/index.ts`,导出函数名为`useXxx`
