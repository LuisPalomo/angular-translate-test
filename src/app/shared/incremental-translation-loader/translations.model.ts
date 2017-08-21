export class Translations {

  constructor(private _cache: { [key: string]: any }) { }

  get cache() {
    return this._cache;
  }

  set cache(cache: { [key: string]: any }) {
    this._cache = cache;
  }
}
