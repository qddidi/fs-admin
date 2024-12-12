/**
 * 
 * @param obj 需要深拷贝对象
 * @param exclues 需要排除的字段
 * @returns 
 */
export function deepClone(obj: any, exclues?: string[]): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const clone: any = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (exclues?.includes(key)) continue
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}

/**
 * 处理时间范围查询
 * @param dateRange 选择的时间范围 
 * @param params 查询参数 
 * @returns 
 */

export function handleDateRangeChange(dateRange: any, params: any) {
    if (typeof params !== 'object' || params === null || Array.isArray(params)) {
        params = {};
    }
    if (Array.isArray(dateRange) && dateRange.length === 2) {
        params.begin_time = dateRange[0];
        params.end_time = dateRange[1];
        return
    }

    params.begin_time = '';
    params.end_time = '';
}

