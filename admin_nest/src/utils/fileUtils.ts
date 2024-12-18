
import { existsSync, mkdirSync, unlinkSync, readdirSync } from 'fs'
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
//判断文件目录是否存在,不存在则创建
export const checkDirExists = (dir: string) => {
    try {
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    } catch (error) {
        throw new ApiException('创建目录失败', ApiErrorCode.FILE_ERROR)
    }

};

/**
 * 
 * @param dir 文件目录
 * @param newFileName 最新上传文件名
 * @param typePreFix 文件类型前缀  如:fs_avatar表示头像
 */
export const deleteOldFile = (dir: string, newFileName: string, typePreFix?: string) => {
    if (!newFileName) throw new ApiException('文件操作有误,请重新上传', ApiErrorCode.FILE_ERROR);
    try {

        const fileList = readdirSync(dir)
        fileList.forEach((fileName: string) => {
            if (typePreFix) {
                //如果以当前前缀开头,且不是最新上传的文件,则删除
                if (fileName.startsWith(typePreFix) && fileName !== newFileName) {
                    unlinkSync(`${dir}/${fileName}`)
                }
            } else {
                //如果没有传前缀类型,则不是最新上传的文件就删除
                if (fileName !== newFileName) {
                    unlinkSync(`${dir}/${fileName}`)
                }
            }
        })
    } catch (error) {
        throw new ApiException('删除旧文件失败', ApiErrorCode.FILE_ERROR)
    }

};