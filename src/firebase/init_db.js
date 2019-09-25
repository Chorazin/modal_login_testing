import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBN0pOY-UxRKFe6rTmkTYc0SSfADhpO8TM",
    authDomain: "my-test-project-3d3a2.firebaseapp.com",
    databaseURL: "https://my-test-project-3d3a2.firebaseio.com",
    projectId: "my-test-project-3d3a2",
    storageBucket: "my-test-project-3d3a2.appspot.com",
    messagingSenderId: "446599377207",
    appId: "1:446599377207:web:aa5678a782a99809"
  };
// Initialize Firebase
const firebase_app = firebase.initializeApp(firebaseConfig);


//export firestore database
export default firebase_app.firestore()
