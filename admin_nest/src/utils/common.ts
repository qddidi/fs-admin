import { File } from 'buffer';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { read, utils, write } from 'xlsx';

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
    mapZh: any = {},
    sheetName: string = 'sheet1',

) {

    const worksheet = utils.json_to_sheet([mapZh, ...data], { header: Object.keys(mapZh), skipHeader: true });
    // 创建一个新的工作簿
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, sheetName);
    const excelBuffer: any = write(workbook, {
        bookType: 'xlsx',
        type: 'buffer',
    });
    return excelBuffer;
}


/**
 * 导入Excel文件并将其转换为JSON格式
 * @param file - 要导入的Excel文件
 * @returns 包含所有工作表名称和数据的对象
 */
export const importExcel = (file: File & { buffer: Buffer }) => {

    try {
        const workbook = read(file.buffer, { type: 'buffer' });
        const sheetNames = workbook.SheetNames;
        const sheetData = [];

        sheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const sheetJson = utils.sheet_to_json(worksheet);
            sheetData.push(...sheetJson)
        });


        return sheetData;
    } catch (error) {
        throw new ApiException('文件解析失败,请检查格式是否正确', 20000);
    }
};
