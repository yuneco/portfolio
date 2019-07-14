const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

exports.functions = functions
exports.admin = admin
exports.db = db
exports.storage = admin.storage()
