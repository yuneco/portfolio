
const firebase = require('./src/firebase.js')
const generateThumbnail = require('./src/generateThumbnail')
const deleteRelatedImg = require('./src/deleteRelatedImg')
const sendContactmail = require('./src/sendContactmail')
const galleryPageOgp = require('./src/galleryPageOgp')

// create thumbnail and db record when img uploaded
exports.generateThumbnail = firebase.functions.storage.object()
  .onFinalize(async storageObject => {
    await generateThumbnail(storageObject)
  })

// delete img files when db record deleted
exports.deleteRelatedImg = firebase.functions.firestore
  .document('imgs/{docs}')
  .onDelete(deleteRelatedImg)

// contactmail sending web API
exports.contactmail = firebase.functions
  .runWith({timeoutSeconds: 20, memory: '256MB'})
  .https
  .onRequest(sendContactmail)

// gallery page OGP
exports.galleryPageOgp = firebase.functions
  .runWith({timeoutSeconds: 20, memory: '256MB'})
  .https
  .onRequest((req, res) => {
    galleryPageOgp(req, res)
  })
