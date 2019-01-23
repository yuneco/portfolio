import Easing from 'easing-functions'

export default class Scroller {
  constructor (elem) {
    this._elem = elem
    this._isRunning = false
    this._toVal = 0
  }

  to (toVal, dur = 1000) {
    this._toVal = toVal
    if (this._isRunning || !this._elem) { return }
    this._isRunning = true
    const startTime = Date.now()
    const fromVal = this._elem.scrollTop
    const getPos = (step) => {
      const stepEased = Easing.Cubic.Out(step)
      return fromVal + stepEased * (this._toVal - fromVal)
    }
    const update = () => {
      if (!this._elem) {
        return
      }
      const step = Math.min(1, (Date.now() - startTime) / dur)
      this._elem.scrollTop = getPos(step)
      if (step < 1) {
        window.requestAnimationFrame(update)
      } else {
        this._isRunning = false
        // console.log('STOPPED')
      }
    }
    window.requestAnimationFrame(update)
  }
}
