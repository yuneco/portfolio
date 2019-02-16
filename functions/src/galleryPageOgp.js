const firebase = require('./firebase.js')

const galleryPageOgp = async (req, res) => {
  try {
    await createPage(req, res)
  } catch (err) {
    console.warn(err)
    res.status(200).end(createDefaultHtml())
  }
}

const createPage = async (req, res) => {
  const [, , imgname] = req.path.split('/')
  if (!imgname) {
    res.status(200).end(createDefaultHtml())
    return
  }
  const snap = await firebase.db.collection('imgs').doc(imgname).get()
  if (!snap) {
    res.status(200).end(createDefaultHtml())
    return
  }
  const data = snap.data() || {}
  const title = data.title
  const imgUrl = data.org.url
  const imgWidth = data.org.width
  const imgHeight = data.org.height
  const html = createHtml(title, imgname, imgUrl, imgWidth, imgHeight)
  res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
  res.status(200).end(html)
}

const createDefaultHtml = () => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>nekobooks</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1,maximum-scale=1">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <meta property="og:title" content="nekobooks - Illustrator Yuki">
    <meta property="og:image" content="https://pf.nekobooks.com/img/ogp-default.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:description" content="Hi, 🐱nekobooks⭐️ is an Illustrator and Corel Painter Master Yuki Matsumoto's portfolio site.">
    <meta property="og:url" content="https://pf.nekobooks.com">
    <meta property="og:site_name" content="nekobooks - Illustrator Yuki's Portfolio">
    <meta property="og:type" content="website">
    <meta name="twitter:site" content="https://pf.nekobooks.com">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="nekobooks - Illustrator Yuki's Portfolio">
    <meta name="twitter:image" content="https://pf.nekobooks.com/img/ogp-default.png">
    <meta name="twitter:description" content="Hi, 🐱nekobooks⭐️ is an Illustrator and Corel Painter Master Yuki Matsumoto's portfolio site.">
    <style>html,body{margin:0;padding:0;}</style>
  </head>
  <body>
    <script>window.location.href='/gallery/'</script>
  </body>
</html>
`
}

const createHtml = (title, imgname, imgUrl, imgWidth, imgHeight) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>nekobooks</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1,maximum-scale=1">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <meta property="og:title" content="${out(title)}">
    <meta property="og:image" content="${imgUrl}">
    <meta property="og:image:width" content="${imgWidth}">
    <meta property="og:image:height" content="${imgHeight}">
    <meta property="og:description" content="Hi, 🐱nekobooks⭐️ is an Illustrator and Corel Painter Master Yuki Matsumoto's portfolio site.">
    <meta property="og:url" content="https://pf.nekobooks.com">
    <meta property="og:site_name" content="nekobooks - Illustrator Yuki's Portfolio">
    <meta property="og:type" content="website">
    <meta name="twitter:site" content="https://pf.nekobooks.com">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${out(title)}">
    <meta name="twitter:image" content="${imgUrl}">
    <meta name="twitter:description" content="Hi, 🐱nekobooks⭐️ is an Illustrator and Corel Painter Master Yuki Matsumoto's portfolio site.">
    <style>html,body{margin:0;padding:0;}</style>
  </head>
  <body>
    <script>window.location.href='/_gallery/${imgname}'</script>
  </body>
</html>
`
}

const out = (text) => {
  return String(text).replace(/[<>"&]/g,' ');
}

module.exports = galleryPageOgp;
