import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import "./index.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import directive from "@/directive"
const app = createApp(App)
//将element-plus的图标注册到app
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
const pinia = createPinia();
app.use(ElementPlus, {
    locale: zhCn,

})
app.use(router)
app.use(pinia)
//等待路由初始化完成后再挂载,确保守卫beforeach可以使用pinia
await router.isReady()
directive(app)
app.mount("#app");

