const API_SENDMSG = 'https://us-central1-nekobooksweb.cloudfunctions.net/contactmail'

export default class ContqactApi {
  async sendMessage (subject, name, company, mail, message) {
    const params = { subject, name, company, mail, message }
    const queryStr = Object.keys(params)
      .map((key) => key + '=' + encodeURIComponent(params[key]))
      .join('&')

    try {
      const res = await window.fetch(API_SENDMSG, {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        cache: 'no-cache',
        body: queryStr
      })
      if (res.status === 200) {
        return true
      } else {
        console.warn(res)
        throw new Error(`failed to send mail: status=${res.status}`)
      }
    } catch (err) {
      console.warn(err)
      throw new Error(`failed to send mail`, err)
    }
  }
}
