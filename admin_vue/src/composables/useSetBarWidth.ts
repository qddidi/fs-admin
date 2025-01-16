import useAppStore from "@/store/index";
import { onMounted, onUnmounted } from "vue";
const appStore = useAppStore();
// 根据屏幕宽度设置侧边栏宽度
export default function useSetBarWidth() {
    const fn = () => {
        const clientWidth = document.body.clientWidth;
        if (clientWidth <= 768) {
            appStore.$patch({
                isCollapse: true
            })
            return
        }
        appStore.$patch({
            isCollapse: false
        })
    }
    fn()
    onMounted(() => {
        window.addEventListener('resize', fn)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', fn)
    })
}