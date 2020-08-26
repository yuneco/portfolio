// see: https://crocro.com/write/js_sample/?act=vw_itm&itm=xorshift

export default class Rnd {
  constructor (initialSeed) {
    this._s = {
      x: 123456789,
      y: 362436069,
      z: 521288629,
      w: (initialSeed || 0) * 1 || 88675123
    }
  }

  next (mod = 0) {
    const s = this._s
    const t = s.x ^ (s.x << 11)
    s.x = s.y; s.y = s.z; s.z = s.w
    s.w = (s.w ^ (s.w >> 19)) ^ (t ^ (t >> 8))
    return mod ? s.w % mod : s.w
  }
}
