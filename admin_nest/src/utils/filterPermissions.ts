import { Menu } from 'src/menu/entities/menu.entity';

export const filterPermissions = (routers: Menu[]): string[] => {
  return [
    ...new Set(
      routers
        .map((router) => router.permission)
        .filter((permission) => permission != null),
    ),
  ];
};
