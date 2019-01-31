const contactmail = require('./contactmail')
const cors = require('cors')({origin: true})

const sendContactmail = async (req, res) => {
  cors(req, res, async () => {
    const params = {
      subject: req.body['subject'],
      name: req.body['name'],
      company: req.body['company'],
      message: req.body['message'],
      mail: req.body['mail']
    }
    if (!params.message) {
      console.warn(params, req)
      res.status(404).end('404 Not Found')
      return
    }

    const mailSubject = `[nekobooksweb]お問い合わせ：${params.subject || 'N/A'}`
    const mailBody = `Title: ${params.subject || 'N/A'}
  Name: ${params.name || 'N/A'}
  Company: ${params.company || 'N/A'}
  Mail: ${params.mail || 'N/A'}
  Message: ${params.message}
  `

    try {
      await contactmail(mailSubject, mailBody, params.mail)
    } catch (err) {
      console.error(err)
      res.status(404).end('404 Not Found')
    }
    console.log('mail sent')
    res.status(200).end('ok')
  })
}

module.exports = sendContactmail
