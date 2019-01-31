const deleteRelatedImg = async snap => {
  const data = snap.data()
  const thumbPath = data.thumb.path
  const orgPath = data.org.path

  const bucket = admin.storage().bucket()
  await bucket.file(thumbPath).delete()
  await bucket.file(orgPath).delete()
  console.log(`Deleted record: ${data.filename}`)
}

module.exports = deleteRelatedImg
