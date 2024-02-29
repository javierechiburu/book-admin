import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAi5V-QoCOQCKELXuBttL9SBcnT92zrjEE",
    authDomain: "fleterox.firebaseapp.com",
    projectId: "fleterox",
    storageBucket: "fleterox.appspot.com",
    messagingSenderId: "1095767153141",
    appId: "1:1095767153141:web:f7ed4594a6791daf4a28bc",
    measurementId: "G-N8CG7K3ZTM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mapUserFromFirebase = (user) => {
    const { displayName, email } = user;
    return { username : displayName, email }
}

export const onAuthStateChanged = (onChange) => {
    return auth.onAuthStateChanged((user) => {
        const normalizedUser = user ? mapUserFromFirebase(user) : null
        onChange(normalizedUser)
    })
  }

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider);
}