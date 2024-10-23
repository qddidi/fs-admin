const toUpperCaseStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const convertToTree = (menuList, parentId: number | null = null) => {
  const tree = [];

  for (let i = 0; i < menuList.length; i++) {
    menuList[i].meta = {
      title: menuList[i].title,
      catch: menuList[i].catch,
      hidden: !menuList[i].status,
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
