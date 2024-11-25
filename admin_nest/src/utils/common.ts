import { utils, write } from 'xlsx';

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


//数据转excel
export function exportExcel(
    data: any[],
    sheetName: string = 'sheet1',

) {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer: any = write(workbook, {
        bookType: 'xlsx',
        type: 'buffer',
    });
    return excelBuffer;
}

