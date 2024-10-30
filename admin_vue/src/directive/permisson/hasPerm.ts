import { DirectiveBinding } from "vue";
import useAppStore from "@/store/index";
export function hasPerm(el: Element, binding: DirectiveBinding) {
    const appStore = useAppStore()
    const { value } = binding

    if (!value) throw new Error('请传入权限标识');
    if (typeof value == 'string') {
        if (!appStore.permissions.includes(value)) {
            el.parentNode?.removeChild(el)
        }
        return;
    }
    if (Array.isArray(value)) {
        const hasPerm = value.some(item => appStore.permissions.includes(item))
        if (!hasPerm) {
            el.parentNode?.removeChild(el)
        }
        return
    }

    throw new Error('权限标识格式不正确');

}