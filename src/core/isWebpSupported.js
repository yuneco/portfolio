// https://medium.com/@JackPu/how-to-detect-browser-support-webp-446b8f91504
const canUseWebP = () => {
  const elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  // very old browser like IE 8, canvas not supported
  return false
}

export default canUseWebP()
