## FS-ADMIN 简介

**FS-ADMIN**是一个以前端全栈技术开发的后台权限管理系统,前后端统一使用**TypeScript**语言开发,只需掌握一门语言就可以完成前后端的开发,大大降低了开发难度,提高了开发效率。坚持以前端开发者为中心,旨在打造一个基于前端全栈技术的企业级后台权限管理系统。

- 最新技术栈：使用 Vue3、Vite5 等前端前沿技术开发
- 采用 Element Plus 实现
- TypeScript: 应用程序级 JavaScript 的语言
- 主题: 可配置的主题 (开发中)
- 国际化：内置完善的国际化方案(开发中)
- 动态路由：内置完善的动态路生成方案
- 权限管理：精确到按钮级别的权限控制
- 自定义指令
- 组件：二次封装了多个常用的组件
- 示例：内置丰富的示例
- 菜单管理：内置完善的菜单管理方案
- 角色管理：内置完善的角色管理方案
- 用户管理：内置完善的用户管理方案
- 个人中心：内置完善的个人中心方案
- 日志管理：内置完善的日志管理方案
- 导入导出：支持数据的 Excel 导入导出功能
- 文件上传：支持文件上传功能
- 自动化部署：内置自动化部署方案
- AOP 切面编程：内置 AOP 切面编程方案
- 在线 Swagger 文档：内置在线 Swagger 文档
- 完善的教程：详细的实现细节都在教程之中[完整教程](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI2NzY3NDQzMg==&action=getalbum&album_id=3421173325324713991#wechat_redirect)

## 演示地址

[项目演示地址](http://fsadmin.xyz/#/)

## 技术栈

- 前端

| 框架                                               | 说明                  | 版本   |
| -------------------------------------------------- | --------------------- | ------ |
| [Vue](https://staging-cn.vuejs.org/)               | Vue 框架              | 3.5.8  |
| [Vite](https://cn.vitejs.dev//)                    | 开发与构建工具        | 5.4.1  |
| [Element Plus](https://element-plus.org/zh-CN/)    | Element Plus          | 2.8.3  |
| [TypeScript](https://www.typescriptlang.org/docs/) | JavaScript 的超集     | 5.5.3  |
| [pinia](https://pinia.vuejs.org/)                  | Vue 存储库 替代 vuex5 | 2.2.4  |
| [vue-router](https://router.vuejs.org/)            | Vue 路由              | 4.4.5  |
| [tailwindcss](https://tailwind.nodejs.cn/)         | 原子 css              | 3.4.12 |

- 后端

| 框架及服务                                                        | 说明                 | 版本   |
| ----------------------------------------------------------------- | -------------------- | ------ |
| [Nestjs/cli](https://nestjs.com/)                                 | Node 框架            | 10.0.0 |
| [‌MySQL](https://www.mysql.com/)                                  | 数据库               | 8.4.0  |
| [Redis](https://redis.io/)                                        | 缓存数据库           | 7.0    |
| [TypeScript](https://www.typescriptlang.org/docs/)                | JavaScript 的超集    | 5.5.3  |
| [typeorm](https://typeorm.io/)                                    | 数据库对象关系映射库 | 0.3.20 |
| [@nestjs/swagger](https://github.com/nestjs/swagger#readme)       | 接口文档生成         | 7.3.0  |
| [class-validator](https://www.npmjs.com/package/class-validator/) | 接口校验             | 0.14.1 |

- 部署

| 框架及服务                                            | 说明                         | 版本   |
| ----------------------------------------------------- | ---------------------------- | ------ |
| [Docker](https://nestjs.com/)                         | 容器                         | 25.0.3 |
| [nginx](https://nginx.org/)                           | web 服务器/反向代理/负载均衡 | stable |
| [pm2](https://pm2.keymetrics.io/)                     | 进程管理                     | 5.3.2  |
| [Github Actions](https://github.com/features/actions) | 自动部署                     | ---    |

## 启动

### 前端

```
cd admin_vue
npm install
npm run dev
```

### 后端

- 无 docker

1. 安装 mysql(略)
2. 安装 redis(略)
3. mysql 导入`fs_admin.sql`文件
4. 修改`admin_nest/.env`文件中的`mysql`及`redis`配置

```
cd admin_nest
npm install
npm run start:dev
```

- 有 docker

1. 启动

```
docker compose --env-file .env up
```

2. 导入`fs_admin.sql`文件

根据设置的用户名及密码登录 mysql,导入`fs_admin.sql`文件

```
地址:localhost:3306
用户名:root
密码:123456
```
