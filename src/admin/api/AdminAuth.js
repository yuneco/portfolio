import ApiBase from '../../api/ApiBase'
import firebase from './firebase'

class AdminAuth extends ApiBase {
  constructor () {
    super()
    this._uid = null
    this._name = null
  }

  async loginWithGoogle () {
    if (this.user) {
      return this.user
    }
    const result = await firebase.auth().getRedirectResult()
    if (result.credential) {
      this.user = result.user
      return this.user
    } else {
      return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }
  }

  async logout () {
    await firebase.auth().signOut()
    this.user = null
    return null
  }
}

export default AdminAuth
