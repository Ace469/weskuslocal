import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD7acAXO2uGE9zN8GAeZSCcgso1FqjUSTg",
  authDomain: "weskuslocal-76657.firebaseapp.com",
  projectId: "weskuslocal-76657",
  storageBucket: "weskuslocal-76657.firebasestorage.app",
  messagingSenderId: "81761780474",
  appId: "1:81761780474:web:c64b83430326885efbff43"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);