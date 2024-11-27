//用户表
export const mapUserZh = {
    id: 'id',
    username: '用户名',
    nickname: '昵称',
    telephone: '手机号',
    email: '邮箱',
    status: '状态',
    create_time: '创建时间',
    update_time: '更新时间',
}

export const transformZnToEn = (data, mapZn) => {
    const mapEn = {}
    try {
        Object.keys(mapZn).forEach((key) => {
            mapEn[mapZn[key]] = key;
        });
        const result = data.map((item) => {
            const newItem = {};
            for (const key in item) {
                if (mapEn.hasOwnProperty(key)) {
                    newItem[mapEn[key]] = item[key];
                }
            }
            return newItem;
        });

        return result;
    } catch (error) {
        return []
    }



};