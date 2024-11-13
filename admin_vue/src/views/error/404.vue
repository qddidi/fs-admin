<template>
  <div class="flex items-center justify-center h-screen p-[100px]">
    <div>
      <img src="@/assets/error/404.png" alt="404" />
    </div>
    <div>
      <div class="text-3xl font-bold mb-2 text-[#1482f0]">404错误!</div>
      <div class="text-lg text-gray-600 mb-4">找不到网页！</div>
      <div class="mb-[20px] text-sm text-gray-700 mb-4">
        对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
      </div>
      <router-link
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-7 rounded"
        to="/index"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>
