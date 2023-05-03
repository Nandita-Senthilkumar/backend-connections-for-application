import {getApp, getApps, initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'


 
// const firebaseConfig = {
//     apiKey: "AIzaSyCf-OiFptFKLtYMfhCHi8nQdqNzDTGmWxg",
//     authDomain: "music-app-a4dc6.firebaseapp.com",
//     projectId: "music-app-a4dc6",
//     storageBucket: "music-app-a4dc6.appspot.com",
//     messagingSenderId: "201160253163",
//     appId: "1:201160253163:web:5fa7d31ed061d948d128ae"
//   };

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
    appId: process.env.REACT_APP_FIREBASE_APPI_ID
  };

  const app=getApps.length>0?getApp():initializeApp(firebaseConfig);
  const storage =getStorage(app);

  export {app,storage}; 