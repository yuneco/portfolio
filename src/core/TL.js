import Time from './Time'

const TYPE_TO = 'to'
const TYPE_BY = 'by'
const TYPE_DO = 'do'
const TYPE_WAIT = 'wait'

export default class TL {
  constructor (target, name) {
    this._target = target
    this._name = name || 'TL-' + ~~(Math.random() * 1000000)
    this._kfs = []
    this._breakAtEnd = false
    this._breakAtKf = false
    this._isRunning = false
    this._isLoop = false
    this._onBreakHndlers = []
    this._onEndHndlers = []
    this._canceled = false // DO NOT REST
    this._runCount = 0 // DO NOT REST
  }
  to (to) {
    this._kfs.push({ type: TYPE_TO, to })
    return this
  }
  by (by) {
    this._kfs.push({ type: TYPE_BY, by })
    return this
  }
  do (f) {
    this._kfs.push({ type: TYPE_DO, do: f })
    return this
  }
  wait (ms) {
    this._kfs.push({ type: TYPE_WAIT, ms })
    return this
  }

  reqStop (immd = false) {
    if (!this.isRunning) { return }
    this._breakAtKf = !!immd
    this._breakAtEnd = true
  }

  async stop (immd = false) {
    if (!this.isRunning) {
      // console.log(`[${this.name}] SOLVED: NOT RUNNING`)
      return Promise.resolve()
    }
    this.reqStop()
    return new Promise(resolve => {
      // console.log(`[${this.name}] WAIT STOP RUNNING`)
      this._onEndHndlers.push(
        () => {
          // console.log(`[${this.name}] _onBreakHndlers FIRED`)
          resolve()
        })
    })
  }

  cancel () {
    if (this.isRunning) { throw new Error(`[this.name] TL is running`) }
    this._canceled = true
  }

  async onend (waitIfNotRunning = false) {
    if (this._canceled) { return Promise.resolve() }
    if (!this.isRunning && !waitIfNotRunning) { return Promise.resolve() }
    return new Promise(resolve => {
      this._onEndHndlers.push(resolve)
    })
  }

  async run () {
    if (this._canceled) { throw new Error(`[${this.name}] is canceled and can not run`) }
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
    if (this._canceled) { throw new Error(`[${this.name}] is canceled and can not run`) }
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
    return this.runCount === 0
  }
}
