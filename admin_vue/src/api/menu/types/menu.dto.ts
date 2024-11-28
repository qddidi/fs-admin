export type MenuDto = {

};

export type QueryMenuParams = {
    title?: string;
    status?: string
}

export type MenuForm = {
    title: string;
    path: string;
    parent_id: any;
    component: string;
    order_num: number;
    icon: string;
    id: number | null;
    menu_type: number;
    permission: string;
    status: number;
    catch: number;
    hidden?: number;
}