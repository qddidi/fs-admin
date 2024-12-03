import { defineStore } from "pinia";
import { getInfo } from '../api/menu/index';
import { AppStoreState, NavTag } from './types';

export default defineStore("appStore", {
    state: (): AppStoreState => {
        return {
            isLoadRoute: false,
            menuList: [],
            isCollapse: false,
            permissions: [],
            breadcrumbs: [],
            navTags: [],
            catchList: [],
            userInfo: {
                username: '',
                avatar: '',
                telephone: ''
            }
        }
    },
    actions: {
        async getInfo() {
            const { data } = await getInfo({})
            this.menuList = data.routers;
            this.permissions = data.permissions;
            this.isLoadRoute = true;
            this.userInfo = data.user || {};
        },

        addTags(tag: NavTag) {
            const isRepeat = this.navTags.find((item) => item.name === tag.name);
            const isRed = tag.path.includes('redirect');

            isRepeat || isRed || !tag.name ||
                this.navTags.push({ name: tag.name as string, path: tag.path, fullpath: tag.fullpath });
        },

        //添加缓存路由
        addCatchList(name: string) {
            if (!this.catchList.includes(name)) {
                this.catchList.push(name);
            }
        },
    }
})