export default class Point {
  constructor (x = 0, y = 0) {
    if (x && x.x !== undefined) {
      this._x = x.x || 0
      this._y = x.y || 0
    } else {
      this._x = x
      this._y = y
    }
  }

  toString () {
    return `{x:${this.x}, y:${this.y}}`
  }

  add (p) {
    return new Point(this.x + p.x, this.y + p.y)
  }

  sub (p) {
    return new Point(this.x - p.x, this.y - p.y)
  }

  times (times) {
    return new Point(this.x * times, this.y * times)
  }

  multiply (p) {
    return new Point(this.x * p.x, this.y * p.y)
  }

  get x () { return this._x }
  get y () { return this._y }
  get rad () { return Math.atan2(this.x, this.y) }
  get len () { return Math.sqrt(this.x ** 2 + this.y ** 2) }
}
