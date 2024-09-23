export type MenuVo = {
  name: string;
  path: string;
  parentId?: number | null;
  component?: string | null;
  orderNum?: number;
  icon?: string;
  id?: number | null;
};
