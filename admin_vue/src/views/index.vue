<template>
  <div class="p-[20px]">
    <h1 class="text-3xl font-bold mb-4">FS-ADMIN 简介</h1>
    <p class="mb-4">
      FS-ADMIN是一个以前端全栈技术开发的后台权限管理系统,前后端统一使用TypeScript语言开发,只需掌握一门语言就可以完成前后端的开发,大大降低了开发难度,提高了开发效率。坚持以前端开发者为中心,旨在打造一个基于前端全栈技术的企业级后台权限管理系统。
    </p>
    <ul class="list-disc pl-6 mb-4">
      <li>最新技术栈：使用 Vue3、Vite5 等前端前沿技术开发</li>
      <li>采用 Element Plus 实现</li>
      <li>TypeScript: 应用程序级 JavaScript 的语言</li>
      <li>主题: 可配置的主题 (开发中)</li>
      <li>国际化：内置完善的国际化方案(开发中)</li>
      <li>权限：内置完善的动态路由权限生成方案</li>
      <li>组件：二次封装了多个常用的组件</li>
      <li>示例：内置丰富的示例(开发中)</li>
    </ul>
    <h2 class="text-2xl font-bold mb-10 mt-10">页面预览</h2>
    <div>
      <h4 class="text-xl font-bold mb-10 mt-10">登录</h4>
      <img
        src="https://github.com/qddidi/fs-admin/blob/develop/assets/01.jpg?raw=true"
        alt="登录页面"
        class="w-2/3"
      />
      <h4 class="text-xl font-bold mb-10 mt-10">角色管理</h4>
      <img
        src="https://github.com/qddidi/fs-admin/blob/develop/assets/02.jpg?raw=true"
        alt="角色管理页面"
        class="w-2/3"
      />
      <h4 class="text-xl font-bold mb-10 mt-10">菜单管理</h4>
      <img
        src="https://github.com/qddidi/fs-admin/blob/develop/assets/03.png?raw=true"
        alt="菜单管理页面"
        class="w-2/3"
      />
      <h4 class="text-xl font-bold mb-10 mt-10">用户管理页面</h4>
      <img
        src="https://github.com/qddidi/fs-admin/blob/develop/assets/04.png?raw=true"
        alt="用户管理页面"
        class="w-2/3"
      />
    </div>
    <h2 class="text-2xl font-bold mb-10 mt-10">技术栈</h2>
    <h3 class="text-xl font-bold mb-10">前端</h3>
    <table class="table-auto w-full">
      <thead>
        <tr class="border px-4 py-2">
          <th class="px-4 py-2">框架</th>
          <th class="px-4 py-2">说明</th>
          <th class="px-4 py-2">版本</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://staging-cn.vuejs.org/"
              class="text-blue-500 hover:text-blue-700"
              >Vue</a
            >
          </td>
          <td class="border px-4 py-2">Vue 框架</td>
          <td class="border px-4 py-2">3.5.8</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://cn.vitejs.dev//"
              class="text-blue-500 hover:text-blue-700"
              >Vite</a
            >
          </td>
          <td class="border px-4 py-2">开发与构建工具</td>
          <td class="border px-4 py-2">5.4.1</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://element-plus.org/zh-CN/"
              class="text-blue-500 hover:text-blue-700"
              >Element Plus</a
            >
          </td>
          <td class="border px-4 py-2">Element Plus</td>
          <td class="border px-4 py-2">2.8.3</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://www.typescriptlang.org/docs/"
              class="text-blue-500 hover:text-blue-700"
              >TypeScript</a
            >
          </td>
          <td class="border px-4 py-2">JavaScript 的超集</td>
          <td class="border px-4 py-2">5.5.3</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://pinia.vuejs.org/"
              class="text-blue-500 hover:text-blue-700"
              >pinia</a
            >
          </td>
          <td class="border px-4 py-2">Vue 存储库 替代 vuex5</td>
          <td class="border px-4 py-2">2.2.4</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://router.vuejs.org/"
              class="text-blue-500 hover:text-blue-700"
              >vue-router</a
            >
          </td>
          <td class="border px-4 py-2">Vue 路由</td>
          <td class="border px-4 py-2">4.4.5</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://tailwind.nodejs.cn/"
              class="text-blue-500 hover:text-blue-700"
              >tailwindcss</a
            >
          </td>
          <td class="border px-4 py-2">原子 css</td>
          <td class="border px-4 py-2">3.4.12</td>
        </tr>
      </tbody>
    </table>
    <h3 class="text-xl font-bold mb-10 mt-10">后端</h3>
    <table class="table-auto w-full">
      <thead>
        <tr class="border px-4 py-2">
          <th class="px-4 py-2">框架及服务</th>
          <th class="px-4 py-2">说明</th>
          <th class="px-4 py-2">版本</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://nestjs.com/"
              class="text-blue-500 hover:text-blue-700"
              >Nestjs/cli</a
            >
          </td>
          <td class="border px-4 py-2">Node 框架</td>
          <td class="border px-4 py-2">10.0.0</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://nestjs.com/"
              class="text-blue-500 hover:text-blue-700"
              >Docker</a
            >
          </td>
          <td class="border px-4 py-2">容器</td>
          <td class="border px-4 py-2">25.0.3</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://www.mysql.com/"
              class="text-blue-500 hover:text-blue-700"
              >‌MySQL</a
            >
          </td>
          <td class="border px-4 py-2">数据库</td>
          <td class="border px-4 py-2">8.4.0</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://redis.io/"
              class="text-blue-500 hover:text-blue-700"
              >Redis</a
            >
          </td>
          <td class="border px-4 py-2">缓存数据库</td>
          <td class="border px-4 py-2">7.0</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://www.typescriptlang.org/docs/"
              class="text-blue-500 hover:text-blue-700"
              >TypeScript</a
            >
          </td>
          <td class="border px-4 py-2">JavaScript 的超集</td>
          <td class="border px-4 py-2">5.5.3</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://typeorm.io/"
              class="text-blue-500 hover:text-blue-700"
              >typeorm</a
            >
          </td>
          <td class="border px-4 py-2">数据库对象关系映射库</td>
          <td class="border px-4 py-2">0.3.20</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://github.com/nestjs/swagger#readme"
              class="text-blue-500 hover:text-blue-700"
              >@nestjs/swagger</a
            >
          </td>
          <td class="border px-4 py-2">接口文档生成</td>
          <td class="border px-4 py-2">7.3.0</td>
        </tr>
        <tr>
          <td class="border px-4 py-2">
            <a
              href="https://www.npmjs.com/package/class-validator/"
              class="text-blue-500 hover:text-blue-700"
              >class-validator</a
            >
          </td>
          <td class="border px-4 py-2">接口校验</td>
          <td class="border px-4 py-2">0.14.1</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
