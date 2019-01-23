const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const contactmail = require('./contactmail')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cors = require('cors')({origin: true});
const path = require('path')
const os = require('os')
const fs = require('fs')
const Canvas = require('canvas-prebuilt')
const Image = Canvas.Image;

const IMG_DIR_FULL = 'public/imgs/default/'
const IMG_DIR_THUMB = 'public/imgs/thumb/'
const THUMB_MAX_SIZE = 400

const loadImg = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      console.log('img loaded', img)
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
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, iw, ih, 0, 0, thumbW, thumbH)
  return canvas
}

const saveCanvasToFile = (canvas, outPath) => {
  return new Promise((resolve, reject) => {
    const outFs = fs.createWriteStream(outPath)
    outFs.on('finish', () =>  {
      console.log('The JPEG file was created.')
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

  return db.collection('imgs').doc(name).set({
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
  const bucket = admin.storage().bucket()
  const file =  bucket.file(filePath)
  const metadata = {
    cacheControl: `public,max-age=300, s-maxage=${3600 * 24 * 30}`
  }
  return file.setMetadata(metadata)
}

// Download file from bucket.
const generateThumbnail = async (object) => {
  const fileBucket = object.bucket
  const filePath = object.name
  const contentType = object.contentType

  if (!filePath.startsWith(IMG_DIR_FULL)) {
    // console.log(`not target for thumb: ${filePath}`)
    return
  }
  if (!contentType.startsWith('image/')) {
    // console.log(`not target for thumb: ${contentType}`)
    return
  }

  console.log(`generateThumbnail v11: Start Storage.onFinalize filePath=${filePath}, contentType=${contentType}`)

  const fileName = path.basename(filePath)
  const thumbPath = `${IMG_DIR_THUMB}${fileName}`
  const bucket = admin.storage().bucket(fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({destination: tempFilePath});
  console.log(tempFilePath)
  const imgFull = await loadImg(tempFilePath)
  console.log('load successed')
  const canvas = createThumbCanvas(imgFull)
  const tempThumbPath = path.join(os.tmpdir(), `thumb_${fileName}`)
  await saveCanvasToFile(canvas, tempThumbPath)
  const res = await bucket.upload(tempThumbPath, {
    destination: thumbPath,
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: `public,max-age=${3600 * 24}, s-maxage=${3600 * 24 * 30}`
    }
  })
  await fs.unlinkSync(tempFilePath)
  await fs.unlinkSync(tempThumbPath)
  await saveMetadataToDb(fileName, imgFull.width, imgFull.height, canvas.width, canvas.height)
  await saveMetadataToStorage(filePath)
  console.log('ThumbCreate Finished')

  return
}

const deleteRelatedImg = async (snap, context) => {
  const data = snap.data()
  const thumbPath = data.thumb.path
  const orgPath = data.org.path

  const bucket = admin.storage().bucket()
  await bucket.file(thumbPath).delete()
  await bucket.file(orgPath).delete()
  console.log(`Deleted record: ${data.filename}`)
}

const sendContactmail = async (req, res) => {
  cors(req, res, async () => {
    const params = {
      subject: req.body['subject'],
      name: req.body['name'],
      company: req.body['company'],
      message: req.body['message'],
      mail: req.body['mail']
    }
    if (!params.message) {
      console.warn(params, req)
      res.status(404).end('404 Not Found')
      return
    }

    const mailSubject = `[nekobooksweb]お問い合わせ：${params.subject || 'N/A'}`
    const mailBody = `Title: ${params.subject || 'N/A'}
  Name: ${params.name || 'N/A'}
  Company: ${params.company || 'N/A'}
  Mail: ${params.mail || 'N/A'}
  Message: ${params.message}
  `

    try {
      await contactmail(mailSubject, mailBody, params.mail)
    } catch (err) {
      console.error(err)
      res.status(404).end('404 Not Found')
    }
    console.log('mail sent')
    res.status(200).end('ok')
  })
}

exports.generateThumbnail = functions.storage.object().onFinalize(generateThumbnail)
exports.deleteRelatedImg = functions.firestore.document('imgs/{docs}').onDelete(deleteRelatedImg)
exports.contactmail = functions.runWith({timeoutSeconds: 20, memory: '256MB'}).https.onRequest(sendContactmail)
