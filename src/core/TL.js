import Time from './Time'

// Simple timeline class.
// This timeline is NOT supports interpolation between key frames.

const TYPE_TO = 'to'
const TYPE_BY = 'by'
const TYPE_DO = 'do'
const TYPE_WAIT = 'wait'

export default class TL {
  /**
   * Create nwe timeline.
   * @constructor
   * @param {Object} target Target object to change its props in this timeline.
   * @param {? String} name Any name for debugging.
   */
  constructor (target, name) {
    this._target = target
    this._name = name || 'TL-' + ~~(Math.random() * 1000000)
    this._kfs = []
    this._breakAtEnd = false
    this._breakAtKf = false
    this._isRunning = false
    this._isLoop = false
    this._onEndHndlers = []
    this._onBreakHndlers = []
    this._canceled = false // DO NOT REST
    this._runCount = 0 // DO NOT REST
  }

  // Construct Timeline //

  /**
   * move the cursor forword.
   * @param {number} ms
   */
  wait (ms) {
    this._kfs.push({ type: TYPE_WAIT, ms })
    return this
  }
  /**
   * change props of the target using assigned objct's props.
   * @param {Object} to
   */
  to (to) {
    this._kfs.push({ type: TYPE_TO, to })
    return this
  }
  /**
   * add assigned objct's props value to the target's props.
   * @param {Object} by
   */
  by (by) {
    this._kfs.push({ type: TYPE_BY, by })
    return this
  }
  /**
   * execute any callback function.
   * @param {Function} f
   */
  do (f) {
    this._kfs.push({ type: TYPE_DO, do: f })
    return this
  }

  // Play & Stop Timeline //

  /**
   * request to stop.
   * @param {bool} immd If true, timeline will stop at next key frame. Otherwise run until end of timeline (and stop before next loop).
   * @return {Promise} resolve after timeline is stopped.
   */
  async stop (immd = false) {
    if (!this._isRunning) {
      return Promise.resolve()
    }
    this._breakAtKf = !!immd
    this._breakAtEnd = true
    return new Promise(resolve => {
      this._onEndHndlers.push(resolve)
    });
  }

  async onend (waitIfNotRunning = false) {
    if (this._canceled) { return Promise.resolve() }
    if (!this._isRunning && !waitIfNotRunning) { return Promise.resolve() }
    return new Promise(resolve => {
      this._onEndHndlers.push(resolve)
    })
  }

  async run () {
    if (this._canceled) { throw new Error(`[${this._name}] is canceled and can not run`) }
    if (!this._isLoop) {
      this._isRunning = true
    }
    this._runCount++
    const cpKfs = [...this._kfs]
    await Time.wait(0)
    for (let i = 0; i < cpKfs.length; i++) {
      if (this._breakAtKf) { break }
      const kf = cpKfs[i]
      if (kf.type === TYPE_WAIT) {
        await Time.wait(kf.ms)
      } else if (kf.type === TYPE_TO) {
        this._apply(kf.to, false)
      } else if (kf.type === TYPE_BY) {
        this._apply(kf.by, true)
      } else if (kf.type === TYPE_DO) {
        kf.do()
      }
    }
    const isBreaked = this._breakAtKf
    const ret = isBreaked ? 'breakAtKf' : ''
    this._breakAtKf = false

    if (!this._isLoop) {
      this._fireOnComp(isBreaked)
    }
    return ret
  }

  async runLoop (loopCallback) {
    if (this._canceled) { throw new Error(`[${this._name}] is canceled and can not run`) }
    this._isLoop = true
    this._isRunning = true
    let loopCount = 0
    while (!this._breakAtEnd) {
      await this.run()
      loopCount++
      if (!this._breakAtEn && loopCallback) {
        try {
          loopCallback(loopCount)
        } catch (err) { console.error(err) }
      }
    }
    const isBreaked = this._breakAtEnd
    const ret = isBreaked ? 'breakAtEnd' : ''
    this._breakAtEnd = false
    this._fireOnComp(isBreaked)
    return ret
  }

  _apply (to, asBy = false) {
    Object.keys(to).forEach(k => {
      this._target[k] = asBy ? this._target[k] + to[k] : to[k]
    })
  }

  _fireOnComp (isBreaked = false) {
    // console.log(`[${this.name}] fin, isBreaked=${isBreaked}`, this._onBreakHndlers, this._onEndHndlers)
    if (isBreaked) {
      this._onBreakHndlers.forEach(f => {
        try { f() } catch (err) { console.error(err) }
      })
    }
    this._onEndHndlers.forEach(f => {
      try { f() } catch (err) { console.error(err) }
    })
    this._reset()
  }

  _reset () {
    this._onBreakHndlers = []
    this._onEndHndlers = []
    this._breakAtKf = false
    this._breakAtEnd = false
    this._isRunning = false
    this._isLoop = false
  }

  get isRunning () {
    return this._isRunning
  }

  get name () {
    return this._name
  }

  get isLoop () {
    return this._isLoop
  }

  get runCount () {
    return this._runCount
  }

  get isBeforeRun () {
    return this._runCount === 0
  }
}
