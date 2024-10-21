import { defineStore } from "pinia";
import { getInfo } from '../api/menu/index';
import { IndexStoreState } from './types';
export default defineStore("home", {
    state: (): IndexStoreState => {
        return {
            menuList: [],
            isCollapse: false
        }
    },
    actions: {
        async getInfo() {
            const { data } = await getInfo({})
            this.menuList = data.routers;


        }
    }
})