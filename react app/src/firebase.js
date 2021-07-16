import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDSRRHKxEO85sfIH5aPyy1gL51eKQW2tRE",
  authDomain: "googol-pois-l.firebaseapp.com",
  databaseURL: "https://googol-pois-l.firebaseio.com",
  projectId: "googol-pois-l",
  storageBucket: "googol-pois-l.appspot.com",
  messagingSenderId: "804747624898",
  appId: "1:804747624898:web:a5eec62b6e95906a8dd65b"
})

export const auth = app.auth()
export default app