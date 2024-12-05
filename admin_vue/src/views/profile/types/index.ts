export type UserInfo = {
    username: string;
    nickname: string;
    telephone: string;
    email: string;
    avatar: string;
    create_time: string;
};

export type ResetForm = {
    oldPassword: string;
    newPassword: string;
    confirmPassword?: string;
}