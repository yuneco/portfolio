export default class Colorset {
  constructor (colors = [], percentages = []) {
    const list = []
    let total = 0
    colors.forEach((c, index) => {
      const isLast = index === (colors.length - 1)
      const percentage = isLast ? 100 - total : (percentages[index] || 0)
      total += percentage
      list.push({ c, p: percentage })
    })
    list.sort((a, b) => b.p - a.p)
    this.list = list
  }

  itemAt (index) {
    return this.list[index]
  }

  get array () { return this.list }
  get length () { return this.list.length }
  get colors () { return this.list.map(item => item.c) }
  get percentages () { return this.list.map(item => item.p) }
  toObj () {
    const cplist = this.list.map(item => {
      return { c: [...item.c], p: item.p }
    })
    return { list: cplist }
  }

  fromObj (o) {
    const cplist = o.list.map(item => {
      return { c: [...item.c], p: item.p }
    })
    this.list = cplist
  }

  clone () {
    const c = new Colorset()
    c.fromObj(this.toObj())
    return c
  }
}
