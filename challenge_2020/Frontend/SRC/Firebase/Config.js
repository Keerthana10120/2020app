import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcmjRrmfwxVNTXyP_jQNvQ8VtXTrdhlsk",
  authDomain: "challenge2020-a15f6.firebaseapp.com",
  projectId: "challenge2020-a15f6",
  storageBucket: "challenge2020-a15f6.appspot.com",
  messagingSenderId: "705709747783",
  appId: "1:705709747783:web:6e1844d95f7c0abf788b62"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };