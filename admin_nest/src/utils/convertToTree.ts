import { Menu } from "src/menu/entities/menu.entity";

export interface TreeNode extends Menu {
  name?: string;
  meta?: {
    title: string;
    catch: number;
    hidden: boolean;
    name: string;
  };
  children?: TreeNode[];
}
const toUpperCaseStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const convertToTree = (menuList: TreeNode[], parentId: number | null = null): TreeNode[] => {
  const tree = [];

  for (let i = 0; i < menuList.length; i++) {
    menuList[i].meta = {
      title: menuList[i].title,
      catch: menuList[i].catch,
      hidden: !menuList[i].status,
      name: menuList[i].name,
    }
    //返回前端组件名称首字母大写
    menuList[i].name = toUpperCaseStart(menuList[i].path.replace(/\//g, ''))

    if (menuList[i].parent_id === parentId) {
      const children = convertToTree(menuList, menuList[i].id);
      if (children.length) {
        menuList[i].children = children;
      }
      tree.push(menuList[i]);
    }
  }

  return tree;
};
