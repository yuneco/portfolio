const firebase = require('./firebase.js')
const path = require('path')
const os = require('os')
const fs = require('fs')
const Canvas = require('canvas-prebuilt')
const Image = Canvas.Image

const IMG_DIR_FULL = 'public/imgs/default/'
const IMG_DIR_THUMB = 'public/imgs/thumb/'
const THUMB_MAX_SIZE = 400

const loadImg = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img, imgPath)
    }
    img.onerror = (err) => {
      console.warn('failed to load', err)
      reject(err, imgPath)
    }
    img.src = imgPath
  })
}

const createThumbCanvas = (img) => {
  const iw = img.width
  const ih = img.height
  const thumbR = Math.min(1, THUMB_MAX_SIZE / Math.max(iw, ih))
  const thumbW = iw * thumbR
  const thumbH = ih * thumbR

  const canvas = Canvas.createCanvas(thumbW, thumbH)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, iw, ih, 0, 0, thumbW, thumbH)
  return canvas
}

const saveCanvasToFile = (canvas, outPath) => {
  return new Promise((resolve, reject) => {
    const outFs = fs.createWriteStream(outPath)
    outFs.on('finish', () =>  {
      resolve(outPath)
    })
    outFs.on('error', (err) =>  {
      console.warn(`write to ${outPath} was failed`, err)
      reject(err)
    })

    canvas.createJPEGStream({
      quality: 0.75,
      chromaSubsampling: false
    }).pipe(outFs)

  })
}

const saveMetadataToDb = (name, orgWidth, orgHeight, thumbWidth, thumbHeight) => {
  const d = new Date()
  const yyyymmdd = d.getFullYear() * 10000
    + (d.getMonth() + 1) * 100
    + d.getDate()

  return firebase.db.collection('imgs').doc(name).set({
    filename: name,
    title: `Image - ${name}`,
    description: '',
    created: Date.now(),
    order: yyyymmdd,
    colors: {
      main: '',
      colors: []
    },
    org: {
      width: orgWidth,
      height: orgHeight,
      path: `${IMG_DIR_FULL}${name}`,
      url: ''
    },
    thumb: {
      width: thumbWidth,
      height: thumbHeight,
      path: `${IMG_DIR_THUMB}${name}`,
      url: ''
    }
  })
}

const saveMetadataToStorage = async (filePath) => {
  const bucket = firebase.storage.bucket()
  const file =  bucket.file(filePath)
  const metadata = {
    cacheControl: `public,max-age=300, s-maxage=${3600 * 24 * 30}`
  }
  return file.setMetadata(metadata)
}

const generateThumbnail = async (storageObject) => {
  const fileBucket = storageObject.bucket
  const filePath = storageObject.name
  const contentType = storageObject.contentType

  if (!filePath.startsWith(IMG_DIR_FULL)) {
    return
  }
  if (!contentType.startsWith('image/')) {
    return
  }

  console.log(`generateThumbnail v11: Start Storage.onFinalize filePath=${filePath}, contentType=${contentType}`)

  // download org img file to server local
  const fileName = path.basename(filePath)
  const thumbPath = `${IMG_DIR_THUMB}${fileName}`
  const bucket = firebase.storage.bucket(fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  await bucket.file(filePath).download({destination: tempFilePath})

  // open the downloaded img and plot to a thumbnail size canvas
  const imgFull = await loadImg(tempFilePath)
  const canvas = createThumbCanvas(imgFull)

  // save thumb img to the server local tmp file
  const tempThumbPath = path.join(os.tmpdir(), `thumb_${fileName}`)
  await saveCanvasToFile(canvas, tempThumbPath)

  // upload to the thumb directory of the storage
  await bucket.upload(tempThumbPath, {
    destination: thumbPath,
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: `public,max-age=${3600 * 24}, s-maxage=${3600 * 24 * 30}`
    }
  })

  // delete tmp files
  await fs.unlinkSync(tempFilePath)
  await fs.unlinkSync(tempThumbPath)

  // write meta datas to fire store
  await saveMetadataToDb(fileName, imgFull.width, imgFull.height, canvas.width, canvas.height)
  await saveMetadataToStorage(filePath)
  console.log('ThumbCreate Finished')

}

module.exports = generateThumbnail
