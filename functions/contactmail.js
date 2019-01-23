const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

const config = functions.config()
const account = {
  user: config.admin.contact.mail,
  pass: config.admin.contact.pass,
  addrTo: config.admin.contact.mail
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true, // true for 465, false for other ports
  auth: {
    user: account.user, // generated ethereal user
    pass: account.pass // generated ethereal password
  }
})

const sendMail = async (subject, body, from = null) => {
  if (!body) {
    return Promise.reject(new Error('No mail body specified.'))
  }

  const mailOptions = {
    from: from || config.admin.contact.mail,
    to: account.addrTo,
    subject: subject,
    text: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) { reject(error) }
      resolve(info)
    })
  })

}

module.exports = sendMail
