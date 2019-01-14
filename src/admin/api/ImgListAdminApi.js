import ImgListApi from '../../api/ImgListApi'
// import ImgMeta from '../../model/ImgMeta'

export default class ImgListAdminApi extends ImgListApi {
  /**
   * @param {ImgMeta} meta
   */
  async updateImageMetaData (meta) {
    const data = meta.toObj()
    const fileName = data.filename
    if (!fileName) { return }
    const ref = this.db.collection('imgs').doc(fileName)
    return ref.set(data)
  }
}
