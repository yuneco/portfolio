import Colorset from './Colorset'

/*
  ImgMeta class:
  Contain image information for gallery
*/

export default class ImgMeta {
  constructor (dataObj) {
    this._data = {
      title: null,
      description: null,
      filename: null,
      org: {
        width: 0,
        height: 0,
        url: null,
        path: null
      },
      thumb: {
        width: 0,
        height: 0,
        url: null,
        path: null
      },
      colors: {
        /** {Colorset} colorset */
        colorset: null,
        /** {String} main main color CSS string */
        main: null
      }
    }

    if (dataObj) {
      this.fromObj(dataObj.constructor === ImgMeta ? dataObj.toObj() : dataObj)
    }
  }

  get title () { return this._data.title }
  get description () { return this._data.description }
  get filename () { return this._data.filename }
  get org () { return this._data.org }
  get thumb () { return this._data.thumb }
  get colors () { return this._data.colors }

  set title (v) { this._data.title = v }
  set description (v) { this._data.description = v }
  set filename (v) { this._data.filename = v }
  set org (v) {
    v = v || {}
    this._data.org.width = v.width || 0
    this._data.org.height = v.height || 0
    this._data.org.url = v.url || null
    this._data.org.path = v.path || null
  }
  set thumb (v) {
    v = v || {}
    this._data.thumb.width = v.width || 0
    this._data.thumb.height = v.height || 0
    this._data.thumb.url = v.url || null
    this._data.thumb.path = v.path || null
  }
  set colors (v) {
    v = v || {}
    this._data.colors.main = v.main || null
    this._data.colors.colorset = null
    if (v.colorset) {
      if (v.colorset.constructor === Colorset) {
        this._data.colors.colorset = v.colorset.clone()
      } else {
        const cset = new Colorset()
        cset.fromObj(v.colorset)
        this._data.colors.colorset = cset
      }
    }
  }

  toObj () {
    const d = this._data
    return {
      title: d.title,
      description: d.description,
      filename: d.filename,
      org: { ...d.org },
      thumb: { ...d.thumb },
      colors: {
        main: d.colors.main,
        colorset: d.colors.colorset ? d.colors.colorset.toObj() : null
      }
    }
  }

  fromObj (o) {
    this.title = o.title || null
    this.description = o.description || null
    this.filename = o.filename || null
    this.org = o.org || null
    this.thumb = o.thumb || null
    this.colors = o.colors || null
  }

  clone () {
    const cp = new ImgMeta()
    return cp.fromObj(this.toObj())
  }
}
