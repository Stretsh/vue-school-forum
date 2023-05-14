import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCYW-LYdvmAtcLY5R3CQbTJ3_7E2Mxedbo",
  authDomain: "vue-school-forums-f06fe.firebaseapp.com",
  projectId: "vue-school-forums-f06fe",
  storageBucket: "vue-school-forums-f06fe.appspot.com",
  messagingSenderId: "467865626845",
  appId: "1:467865626845:web:47f0f2b0cd95a818821334"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {
  db
}