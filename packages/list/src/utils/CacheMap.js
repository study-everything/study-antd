class CacheMap {
  constructor() {
    this.maps = Object.create(null);
  }

  set(key, value) {
    this.maps[key] = value;
  }

  get(key) {
    return this.maps[key];
  }

}

export default CacheMap;