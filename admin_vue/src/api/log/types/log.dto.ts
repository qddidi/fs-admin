export type QueryParams = {
    username?: string;
    title?: string;
    url?: string;
    end_time?: string;
    begin_time?: string;
    page_num?: number;
    page_size?: number;
}

export type DataItem = {
    id: number;
    username: string;
    method: string;
    title: string;
    create_time: Date;
    params: string;
    ip: string;
    url: string;
    user_agent: string;
}