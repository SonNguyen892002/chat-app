// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCRQ1tOdtFx6QLcch5VOfvXdmeVY6PRq1k',
  authDomain: 'chat-app-8c837.firebaseapp.com',
  projectId: 'chat-app-8c837',
  storageBucket: 'chat-app-8c837.appspot.com',
  messagingSenderId: '187875074888',
  appId: '1:187875074888:web:9b6c16a47a9ecbd6a9097d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'room');
