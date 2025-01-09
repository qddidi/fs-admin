import { Menu } from "src/menu/entities/menu.entity";
import { generateRandomString } from "src/utils/common";
export interface TreeNode extends Menu {
  name?: string;
  meta?: {
    title: string;
    catch: number;
    status: boolean;
    name: string;
    hidden?: boolean;
    // 外链
    externalLink?: string;
  };
  children?: TreeNode[];

}
const toUpperCaseStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 
 * @param menuList 菜单列表
 * @param parentId 菜单父级id
 * @param filterBut 是否有查询条件
 * @param isMenuSelect 是否是菜单管理查询
 * @returns 
 */
export const convertToTree = (menuList: TreeNode[], parentId: number | null = null, filterBut?, isMenuSelect = false): TreeNode[] => {
  const tree = [];

  for (let i = 0; i < menuList.length; i++) {

    if (!menuList[i].meta) {
      menuList[i].meta = {
        title: menuList[i].title,
        catch: menuList[i].catch,
        status: !menuList[i].status,
        name: menuList[i].name,
      }
    }

    if (menuList[i].path.startsWith('http') && !isMenuSelect) {
      //如果是外链,随机生成路由,并设置component及外链字段externalLink
      menuList[i].meta.externalLink = menuList[i].path
      menuList[i].path = menuList[i].component.replace(/\//g, '')
      menuList[i].component = 'externalLink/index'
    }
    if (menuList[i].menu_type === 3 && filterBut) continue
    //返回前端组件名称首字母大写
    menuList[i].name = `FS_${toUpperCaseStart(menuList[i].path.replace(/\//g, ''))}`
    if (menuList[i].parent_id === parentId) {
      const children = convertToTree(menuList, menuList[i].id, filterBut, isMenuSelect);
      if (children.length) {
        menuList[i].children = children;
      }
      tree.push(menuList[i]);
    }
  }

  return tree;
};
