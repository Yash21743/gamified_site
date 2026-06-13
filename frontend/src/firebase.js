import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGofBYWIuXZmrKD92TQdvJCIn4qLdaZ1M",
  authDomain: "vidyakhel-3761a.firebaseapp.com",
  projectId: "vidyakhel-3761a",
  storageBucket: "vidyakhel-3761a.firebasestorage.app",
  messagingSenderId: "762456775448",
  appId: "1:762456775448:web:4b79d3d7d7fe726e7fdc6d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export default app;
