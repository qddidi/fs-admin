export type QueryParams = {
    username?: string;
    status?: number | '';
    telephone?: string;
    end_time?: string;
    begin_time?: string;
    page_num?: number;
    page_size?: number;
}

export type DataItem = {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    telephone: string;
    email: string;
    status: number;
    is_admin: number;
    create_time: Date;
    update_time: Date;
}

export type Form = {
    id?: number;
    username?: string;
    nickname?: string;
    avatar?: string;
    telephone?: string;
    email?: string;
    status?: number;
    role_ids?: number[];
    password?: string;
}