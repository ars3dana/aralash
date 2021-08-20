import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyABPBIF_kDaGbb5Cmu9X9JcT0Qpb7iRZcU",
    authDomain: "users-data-b7f78.firebaseapp.com",
    projectId: "users-data-b7f78",
    storageBucket: "users-data-b7f78.appspot.com",
    messagingSenderId: "755931172035",
    appId: "1:755931172035:web:f5af3ac8ac35ad3908a676"  
})

export const auth = app.auth()
export default app
