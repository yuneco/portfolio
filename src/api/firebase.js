import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyB_sNOEFciub8HZ7kZ1e_VAN6hMmZmCB18',
  authDomain: 'nekobooksweb.firebaseapp.com',
  databaseURL: 'https://nekobooksweb.firebaseio.com',
  projectId: 'nekobooksweb',
  storageBucket: 'nekobooksweb.appspot.com',
  messagingSenderId: '680926590407'
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase
