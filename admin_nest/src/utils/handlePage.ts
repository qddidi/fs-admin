import { SelectQueryBuilder } from "typeorm";
/**
 * 
 * @param queryBuilder 查询器
 * @param pageNum 页数
 * @param pageSize 每页条数
 * @returns queryBuilder
 */
export const handlePage = (queryBuilder: SelectQueryBuilder<any>, pageNum = 1, pageSize = 10) => {
    return queryBuilder.skip((pageNum - 1) * pageSize).take(pageSize);
}