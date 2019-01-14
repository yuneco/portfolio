const drawImg = (src, maxSize) => {
  const image = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  image.crossOrigin = 'Anonymous'
  image.src = src
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvasWidth = Math.min(maxSize, image.width)
      const canvasHeight = Math.min(maxSize, image.height)
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height)
      const [dx, dy, dw, dh] = [
        (canvas.width - image.width * scale) / 2,
        (canvas.height - image.height * scale) / 2,
        image.width * scale,
        image.height * scale
      ]
      ctx.drawImage(image, dx, dy, dw, dh)
      const data = ctx.getImageData(dx, dy, dw, dh)
      resolve(data)
    }
    image.onerror = image.onabort = reject
  })
}

const getImageDataFromUrl = (src, maxSize = 512) => {
  return drawImg(src, maxSize)
}

export default getImageDataFromUrl
