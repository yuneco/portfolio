const LINEAR = 'linear-gradient'
const RADIAL = 'radial-gradient'
const REP_LINEAR = 'repeating-linear-gradient'
const REP_RADIAL = 'repeating-radial-gradient'

const Grad = class Gradient {
  constructor (colors, angle = 0, type = LINEAR) {
    this._colors = colors
    this._angle = angle
    this._type = type
  }

  toString () {
    return `${this.type}(${this.angle}deg, ${this.colors.join(', ')})`
  }

  get colors () { return this._colors }
  get angle () { return this._angle }
  get type () { return this._type }
}

Grad.TYPES = {
  LINEAR, RADIAL, REP_LINEAR, REP_RADIAL
}

export default Grad
