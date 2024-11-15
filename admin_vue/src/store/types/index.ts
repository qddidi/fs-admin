
export type MenuList = {
    id: number
    name: string
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
export type Breadcrumb = {
    name: string
    path?: string
}
export type NavTag = {
    name: string
    path: string
    fullpath?: string
}
export type AppStoreState = {
    isLoadRoute: boolean
    menuList: MenuList[]
    isCollapse: boolean
    permissions: string[]
    breadcrumbs: Breadcrumb[]
    navTags: NavTag[]
    catchList: string[]
}