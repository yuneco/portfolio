import skmeans from 'skmeans'
import * as chromatism from 'chromatism'
import Colorset from '@/model/Colorset'

const COLOR_MODEL = 'hsv'
const HUE_SCALE = 1.0 // Magic Number :(

export default class ImageAnalyzer {
  constructor (imgData) {
    this.imgData = imgData
    this.cache = {} // colorCount -> colorset
  }
  /**
   * execute clustering
   * @param {Number} count cluster count = max color count you will get
   * @return {Colorset} colorset obj
   */
  clustering (count = 5, useCache = true) {
    if (useCache && this.cache[count]) { return this.cache[count] }
    const BLOCK_SIZE = 10
    const BLOCK_COUNT_W = Math.floor(this.imgData.width / BLOCK_SIZE)
    const BLOCK_COUNT_H = Math.floor(this.imgData.height / BLOCK_SIZE)
    const points = []
    for (let y = 0; y < BLOCK_COUNT_H; y++) {
      for (let x = 0; x < BLOCK_COUNT_W; x++) {
        const pixels = this._pickPixelsInBlock(BLOCK_SIZE, x, y)
        const labs = pixels.map(p => {
          return this.col2modelArr(p)
        })
        points.push(...labs)
      }
    }
    // clustering with k-means++
    const clustered = skmeans(points, count, 'kmpp', 10000 * 10)
    const centroidsRgb = clustered.centroids.map(lab => {
      const { r, g, b } = this.modelArr2col(lab).rgb
      return [r, g, b]
    })
    // count item in each cluster
    const clusterCounts = new Array(clustered.k).fill(0)
    clustered.idxs.forEach(v => clusterCounts[v]++)
    const clusterPercentages = clusterCounts.map(counts => counts / clustered.idxs.length * 100)
    const colset = new Colorset(centroidsRgb, clusterPercentages)
    if (useCache) {
      this.cache[count] = colset
    }
    return colset
  }
  /**
   * @param {Color} col
   * @return {Number} 0 - 1
   */
  vividlity (col) {
    const MIN = 0.1
    const MAX = 1.0
    const hsv = col.hsv
    const v = (hsv.s / 100) * (hsv.v / 100)
    return v * MAX + (1 - v) * MIN
  }
  col2modelArr (col) {
    const o = col[COLOR_MODEL]
    return [o[COLOR_MODEL.charAt(0)] / ((COLOR_MODEL === 'hsl' || COLOR_MODEL === 'hsv') ? 3.6 / HUE_SCALE : 1), o[COLOR_MODEL.charAt(1)], o[COLOR_MODEL.charAt(2)]]
  }
  modelArr2col (arr) {
    return chromatism.convert({
      [COLOR_MODEL.charAt(0)]: arr[0] * ((COLOR_MODEL === 'hsl' || COLOR_MODEL === 'hsv') ? 3.6 / HUE_SCALE : 1),
      [COLOR_MODEL.charAt(1)]: arr[1],
      [COLOR_MODEL.charAt(2)]: arr[2] }
    )
  }
  pixel (x, y) {
    const offset = (y * this.imgData.width + x) * 4
    const [r, g, b] = [...this.imgData.data.slice(offset, offset + 3)]
    return chromatism.convert({ r, g, b })
  }
  _pickPixelsInBlock (blockSize, bx, by, expectedCount) {
    if (!expectedCount) {
      expectedCount = this._expectedCountAtBlock(blockSize, bx, by)
    }
    expectedCount *= 2
    const border = expectedCount / (blockSize * blockSize)
    const pixels = []
    const [offsetX, offsetY] = [bx * blockSize, by * blockSize]
    for (let y = offsetY; y < offsetY + blockSize; y++) {
      for (let x = offsetX; x < offsetX + blockSize; x++) {
        if (Math.random() < border) {
          const col = this.pixel(x, y)
          if (this.vividlity(col) > Math.random()) {
            pixels.push(col)
          }
        }
      }
    }
    return pixels
  }
  _expectedCountAtBlock (blockSize, bx, by) {
    const MINCOUNT = 0.5
    const MAXCOUNT = 4
    const [w, h] = [this.imgData.width, this.imgData.height]
    const [x, y] = [blockSize * (bx + 0.5), blockSize * (by + 0.5)]
    const distSq = Math.pow((Math.abs(w / 2 - x) / (w / 2)), 2) + Math.pow((Math.abs(h / 2 - y) / (h / 2)), 2)
    // const centerScore = 1 - Math.pow(distSq / 2, 2) // center=1 ... corner=0
    const centerScore = 1 - distSq / 2 // center=1 ... corner=0
    return MINCOUNT * (1 - centerScore) + MAXCOUNT * centerScore
  }

  get imgWidth () { return this.imgData.width }
  get imgHeight () { return this.imgData.height }
}
