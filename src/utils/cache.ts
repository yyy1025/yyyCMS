enum CacheType {
  local,
  session
}
class Cache {
  storage: Storage
  constructor(cacheType: CacheType) {
    this.storage = cacheType == CacheType.local ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    // 不能把null传给JSON.parse，所以需要判空
    if (value) return JSON.parse(value)
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}
export const localCache = new Cache(CacheType.local)
export const sessionCache = new Cache(CacheType.session)
