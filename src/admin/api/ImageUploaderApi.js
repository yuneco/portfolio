import firebase from '../../api/firebase'
import ApiBase from '../../api/ApiBase'

const PUBLIC_IMG_DIR = '/public/imgs'
const DEFAULT_SUBDIR = 'default'

class ImageUploaderApi extends ApiBase {
  constructor () {
    super()
    this.storage = firebase.storage()
  }

  /**
   * 指定したパスのストレージ領域への参照を返します
   * @param {String} dir 任意のディレクトリ
   * @param {String} name ファイル名
   * @return {StorageRef}
   */
  _createStorageRef (path, name) {
    if (!path) {
      throw new Error('param path is required')
    }
    if (!name || name.includes('/')) {
      throw new Error(`invalid param name: #${name}`)
    }
    return this.storage.ref().child(`${PUBLIC_IMG_DIR}/${path}/${name}`)
  }

  /**
   * 指定したImgデータをユーザのディレクトリ内にアップロードします。
   * @param {File} imgFile
   * @param {String} dir optional アップ先ディレクトリ
   * @param {String} name optional ファイル名。省略するとランダムに設定されます
   * @param {function} onStatusChanged optional 進捗更新時に呼ばれます
   * @return {Promise} 成功時はthen(url=>{})でダウンロードURLが取得できます
   */
  async uploadImageFile (imgFile, dir = DEFAULT_SUBDIR, name = null, onStatusChanged = null) {
    const rndName = `${Date.now()}_${Math.floor(Math.random() * 1000)}`
    const actualName = name || rndName
    const ref = this._createStorageRef(dir, actualName)
    const task = ref.put(imgFile)
    if (onStatusChanged) {
      task.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        const status = snapshot.state
        onStatusChanged(progress, status)
      })
    }
    const res = await task
    const url = await ref.getDownloadURL()
    return {
      url,
      dir,
      name: actualName,
      res
    }
  }

  async getUrlFromPath (path) {
    const ref = this.storage.ref().child(path)
    const url = await ref.getDownloadURL()
    return url
  }

  /**
   * 画像を削除します
   * @param {string} path
   */
  async deleteImage (dir = DEFAULT_SUBDIR, name) {
    const ref = this._createPhotoRef(dir, name)
    return ref.delete()
  }

  async setCacheMeta (path) {
    const ref = this.storage.ref().child(path)
    const metaBefore = await ref.getMetadata()
    ref.updateMetadata({
      cacheControl: `public,max-age=${3600 * 24},s-maxage=${3600 * 24 * 30}`
    })
    const metaAfter = await ref.getMetadata()
    console.log(path, metaBefore, metaAfter)
  }
}

export default ImageUploaderApi
