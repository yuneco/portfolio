const firebase = require('./firebase.js')
const sharp = require('sharp')
const path = require('path')
const os = require('os')
const fs = require('fs')

const IMG_DIR_FULL = 'public/imgs/default/'
const IMG_DIR_THUMB = 'public/imgs/thumb/'

const TYPE_FULL = 'full'
const TYPE_THUMB = 'thumb'

const IMGDIR = {
  [TYPE_FULL]: IMG_DIR_FULL,
  [TYPE_THUMB]: IMG_DIR_THUMB
}

const galleryImageWebp = async (req, res) => {
  try {
    const params = req.path.match(/([a-zA-Z0-9]+)\/([-_a-zA-Z0-9]+)\.([a-zA-Z0-9]+)\??.*$/)
    const [, type, imgname, format] = params
    if (type !== TYPE_FULL && type !== TYPE_THUMB) {
      console.warn(`invalid type name: ${type}`)
      res.status(404).end()
      return
    }
    if (!imgname) {
      console.warn(`invalid img name: ${imgname}`)
      res.status(404).end()
      return
    }
    if (!format) {
      console.warn(`invalid img name: ${imgname}`)
      res.status(404).end()
      return
    }

    const tmpImg = await loadImageFile(imgname, type)
    console.log(`img loaded: ${tmpImg}`)
    if (!tmpImg) {
      console.warn(`can not open img: ${imgname}`)
      res.status(404).end()
    }
    const buffer = await loadImageBuffer(tmpImg, format)
    await fs.unlinkSync(tmpImg)

    const contentType = `image/${format}`;
    const age = 86400 * 30;

    res.set('Content-Type', contentType);
    res.set('Cache-Control', `public, max-age=${age}, s-maxage=${age}`);
    res.status(200).send(buffer);
  } catch (err) {
    console.warn(err)
    res.status(404).end()
  }
}

/**
 * load file fron storage
 * @param {string} imageName
 * @return {string} temp file path of loaded img file. undefined if failed. You must delete it after used.
 */
const loadImageFile = async (imageName, type) => {
  const bucket = firebase.storage.bucket()
  const tempPath = path.join(os.tmpdir(), `dl_${imageName}_${type}_${Math.random()}`)
  const sourcePath = `${IMGDIR[type]}${imageName}`
  await bucket.file(sourcePath).download({
    destination: tempPath,
  }).catch((err) => {
    console.warn(err)
    return
  })
  return tempPath
}

/**
 * Open image file and convert to webp
 * @param {string} imagePath 
 * @return {Buffer} webp img buffer
 */
const loadImageBuffer = async (imagePath, format) => {
  const buffer = sharp(imagePath);
  if (format === 'jpeg' || format === 'jpg') {
    buffer.jpeg({
      quality: 80
    })    
  }
  if (format === 'webp') {
    buffer.webp({
      quality: 80
    });
  }
  return await buffer.toBuffer();
}

module.exports = galleryImageWebp
