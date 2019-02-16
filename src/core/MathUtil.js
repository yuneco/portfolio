const CLOCK_OFFSET_ANGLE = 90 // set 90 if you want to use 12 oclock-base angle

const util = {
  isNumber (n) {
    return n === n * 1
  },
  assertNumber (n) {
    if (!util.isNumber(n)) { throw new Error(`value ${n} is not Number`) }
  },
  a2r (a) { return a / 180 * Math.PI },
  r2a (r) { return r / Math.PI * 180 },

  /**
   * Normalize angle
   * @param {Number} a angle
   * @return {Number} return from 0 <= ret < 360
   */
  normalizeAngle (a) {
    return (a >= 0)
      ? a % 360
      : ((Math.floor(-a / 360) + 1) * 360 + a) % 360
  },

  /**
   * exchange angle value on math coord to clock-wize angle (12 oclock = 0, 3 oclock = 90)
   * @param {Number} ma angle value on math coord.
   * @return {Number} clock-wize angle. this value will normalized.
   */
  mathAngle2ClockAngle (ma) {
    return util.normalizeAngle(360 - (ma - CLOCK_OFFSET_ANGLE))
  },

  /**
   * exchange angle value on clock to math coord.
   * @param {Number} ca
   * @return {Number} return 0 to 360. 3 oclock = 0, 12 oclock = 90
   */
  clockAngle2MathAngle (ca) {
    return util.normalizeAngle((360 - ca) + CLOCK_OFFSET_ANGLE)
  },

  inverseAngle (ca) {
    return util.normalizeAngle(-ca)
  },

  intBetween (min, max) {
    const minInt = Math.floor(min)
    const maxInt = Math.floor(max)
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt)
  }

}

export default util
