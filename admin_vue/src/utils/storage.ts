interface StorageItem<T> {
  value: T;
  expiry?: number; // 可选的过期时间戳
}

export const Storage = {
  // 获取值
  get<T>(
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): T | null {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    const item = storage.getItem(key);
    if (item) {
      const { value, expiry } = JSON.parse(item) as StorageItem<T>;
      if (expiry && Date.now() > expiry) {
        storage.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  },

  // 设置值
  set<T>(
    key: string,
    value: T,
    expiry?: number,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    const item: StorageItem<T> = { value };
    if (expiry) {
      item.expiry = Date.now() + expiry;
    }
    storage.setItem(key, JSON.stringify(item));
  },

  // 删除值
  remove(
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    storage.removeItem(key);
  },

  // 清空所有值
  clear(storageType: "localStorage" | "sessionStorage" = "localStorage"): void {
    const storage =
      storageType === "sessionStorage" ? sessionStorage : localStorage;
    storage.clear();
  },
};
