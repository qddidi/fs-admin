
export type MenuList = {
    id: number
    parent_id: number
    title: string
    path: string
    component: string
    icon: string
    order_num: number
    status: boolean
    menu_type: 1 | 2 | 3
    children: MenuList[]
    meta: {
        title?: string
        catch?: number
        hidden?: boolean
    }
}

export type AppStoreState = {
    menuList: MenuList[]
    isCollapse: boolean
    permissions: string[]
}