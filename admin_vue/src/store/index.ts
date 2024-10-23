import { defineStore } from "pinia";
import { getInfo } from '../api/menu/index';
import { AppStoreState } from './types';

export default defineStore("appStore", {
    state: (): AppStoreState => {
        return {
            menuList: [],
            isCollapse: false,
            permissions: []
        }
    },
    actions: {
        async getInfo() {
            const { data } = await getInfo({})
            this.menuList = data.routers;
            this.permissions = data.permissions;
        }
    }
})