import firebase from './firebase'
import ApiBase from './ApiBase'
import ImgMeta from '@/model/ImgMeta'

class ImgListApi extends ApiBase {
  constructor () {
    super()
    this.db = firebase.firestore()
  }

  /**
   * @return {Array<ImgMeta>} ImgMetadata array
   */
  async loadImgMetaDataList () {
    const snap = await this.db.collection('imgs').get()
    const docs = []
    snap.forEach(doc => {
      docs.push(new ImgMeta(doc.data()))
    })
    return docs
  }

  /**
   * @return {ImgMeta} ImgMetadata array
   */
  async loadImgMetaDataByName (fileName, shouldWait = false) {
    const ref = this.db.collection('imgs').doc(fileName)
    const snap = await ref.get()
    if (snap && snap.exists) {
      return new ImgMeta(snap.data())
    } else if (!shouldWait) {
      return null
    } else {
      return new Promise((resolve, reject) => {
        const unsubscribe = ref.onSnapshot(addedSnap => {
          if (!addedSnap || !addedSnap.exists) { return }
          unsubscribe()
          resolve(new ImgMeta(addedSnap.data()))
        })
      })
    }
  }
}

export default ImgListApi
