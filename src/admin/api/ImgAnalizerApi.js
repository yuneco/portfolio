import ApiBase from '../../api/ApiBase'
import ImageAnalyzer from '../lib/ImageAnalyzer'
import getImageDataFromUrl from '../lib/getImageDataFromUrl'

class ImgAnalizerApi extends ApiBase {
  async getColorsetFromUrl (url) {
    const data = await getImageDataFromUrl(url)
    const ana = new ImageAnalyzer(data)
    return ana.clustering()
  }
}

export default ImgAnalizerApi
