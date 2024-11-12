export function pick(obj: any, keys: string[]): any {
    const filterParams: any = {}
    keys.forEach((key) => {
        if (!obj[key]) return
        filterParams[key] = obj[key]
    })
    return filterParams
}