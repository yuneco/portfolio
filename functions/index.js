const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const generateThumbnail = require('./src/generateThumbnail')
const deleteRelatedImg = require('./src/deleteRelatedImg')
const sendContactmail = require('./src/sendContactmail')
const galleryPageOgp = require('./src/galleryPageOgp')

// create thumbnail and db record when img uploaded
exports.generateThumbnail = functions.storage.object()
  .onFinalize(async storageObject => {
    await generateThumbnail(db, storageObject)
  })

// delete img files when db record deleted
exports.deleteRelatedImg = functions.firestore
  .document('imgs/{docs}')
  .onDelete(deleteRelatedImg)

// contactmail sending web API
exports.contactmail = functions
  .runWith({timeoutSeconds: 20, memory: '256MB'})
  .https
  .onRequest(sendContactmail)

// gallery page OGP
exports.galleryPageOgp = functions
  .runWith({timeoutSeconds: 20, memory: '256MB'})
  .https
  .onRequest((req, res) => {
    galleryPageOgp(db, req, res)
  })
