/**
 * 
 * @param obj 传入对象
 * @param keys 要过滤的key数组
 * @returns 
 */
export function pick(obj: any, keys: string[]): any {
    if (!obj) return {}
    const filterParams: any = {}
    keys.forEach((key) => {
        if (!obj[key] && obj[key] != 0) return
        filterParams[key] = obj[key]
    })
    return filterParams
}