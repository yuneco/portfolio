import Color from 'color'

const ColorUtil = {
  toColor (source) {
    if (typeof source === 'object' && source.constructor === Color) {
      return source
    }
    return Color(source)
  },
  rndBetween (c1, c2) {
    return ColorUtil.toColor(c1).mix(ColorUtil.toColor(c2), Math.random())
  },
  padColor (c, num = 2, includeOriginal = true, hRange = 5, sRange = 5, lRange = 10) {
    const org = ColorUtil.toColor(c)
    const hsl = org.hsl().object()
    const list = Array(includeOriginal ? num - 1 : num)
      .fill(0)
      .map(() => Color.hsl(
        (hsl.h + (Math.random() - 0.5) * hRange) % 360,
        Math.max(0, Math.min(100, hsl.s + (Math.random() - 0.5) * sRange)),
        Math.max(0, Math.min(100, hsl.l + (Math.random() - 0.5) * lRange))
      ))
      .map(c => new Color(c.rgb().array().map(v => Math.round(v))))
    return (includeOriginal ? [org] : []).concat(list)
  }
}

export default ColorUtil
