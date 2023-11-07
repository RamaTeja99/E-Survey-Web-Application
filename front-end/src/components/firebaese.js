import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAAka89ncbTc2sVC7IjiEMGxsm3cigELs8",
    authDomain: "exam-portal-a0286.firebaseapp.com",
    databaseURL: "https://exam-portal-a0286-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "exam-portal-a0286",
    storageBucket: "exam-portal-a0286.appspot.com",
    messagingSenderId: "1090035225557",
    appId: "1:1090035225557:web:f5a8799c750c7eb901e35c",
    measurementId: "G-E8P48W5NVX"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
