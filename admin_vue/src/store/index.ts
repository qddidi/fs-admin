import { defineStore } from "pinia";
import { getInfo } from '../api/menu/index';
import { AppStoreState, NavTag } from './types';

export default defineStore("appStore", {
    state: (): AppStoreState => {
        return {
            menuList: [],
            isCollapse: false,
            permissions: [],
            breadcrumbs: [],
            navTags: []
        }
    },
    actions: {
        async getInfo() {
            const { data } = await getInfo({})
            this.menuList = data.routers;
            this.permissions = data.permissions;
        },

        addTags(tag: NavTag) {
            const isRepeat = this.navTags.find((item) => item.name === tag.name);
            const isRed = tag.path.includes('redirect');


            isRepeat || isRed ||
                this.navTags.push({ name: tag.name as string, path: tag.path });
        },
    }
})