import AdminAuth from './AdminAuth'
import ImageUploaderApi from './ImageUploaderApi'
import ImgListAdminApi from './ImgListAdminApi'
import ImgAnalizerApi from './ImgAnalizerApi'

export default {
  Auth: new AdminAuth(),
  Uploader: new ImageUploaderApi(),
  ImgList: new ImgListAdminApi(),
  Analizer: new ImgAnalizerApi()
}
