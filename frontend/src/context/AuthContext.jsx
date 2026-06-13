import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

// ── Demo user (for "Try Demo" button) ──────────────────────
const DEFAULT_DEMO_USER = {
  id: 'demo-001',
  name: 'Rahul Kumar',
  email: 'demo@vidyakhel.in',
  role: 'student',
  grade: 8,
  xp: 250,
  level: 2,
  streak: 5,
  badges: ['First Quiz', 'Week Warrior', 'Bronze Milestone Badge'],
  village: 'Rampur',
  district: 'Lucknow',
  avatar: 'avatar1',
  language: 'english',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Listen to Firebase Auth state ──────────────────────────
  useEffect(() => {
    // Check demo mode first
    const demoUser = localStorage.getItem('glp_demo_user');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = { id: firebaseUser.uid, ...userDoc.data() };
            setUser(userData);
            localStorage.setItem('glp_user', JSON.stringify(userData));
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setUser(null);
        localStorage.removeItem('glp_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ── Register ────────────────────────────────────────────────
  const register = async (data) => {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const uid  = cred.user.uid;

    const userData = {
      name:      data.name,
      email:     data.email,
      role:      'student',
      grade:     Number(data.grade) || 1,
      language:  data.language  || 'english',
      village:   data.village   || '',
      district:  data.district  || '',
      xp:        0,
      level:     1,
      streak:    0,
      badges:    [],
      avatar:    'avatar1',
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', uid), userData);

    const fullUser = { id: uid, ...userData };
    setUser(fullUser);
    localStorage.setItem('glp_user', JSON.stringify(fullUser));
    return { user: fullUser };
  };

  // ── Login ───────────────────────────────────────────────────
  const login = async (email, password) => {
    const cred     = await signInWithEmailAndPassword(auth, email, password);
    const uid      = cred.user.uid;
    const userDoc  = await getDoc(doc(db, 'users', uid));

    let userData;
    if (userDoc.exists()) {
      userData = { id: uid, ...userDoc.data() };
    } else {
      // Fallback if Firestore doc missing
      userData = { id: uid, email, name: email.split('@')[0], role: 'student', xp: 0, level: 1, streak: 0, badges: [] };
    }

    setUser(userData);
    localStorage.setItem('glp_user', JSON.stringify(userData));
    return { user: userData };
  };

  // ── Logout ──────────────────────────────────────────────────
  const logout = async () => {
    const isDemo = localStorage.getItem('glp_demo_user');
    if (isDemo) {
      localStorage.removeItem('glp_demo_user');
      localStorage.removeItem('glp_user');
      setUser(null);
      return;
    }
    await signOut(auth);
    localStorage.removeItem('glp_user');
    setUser(null);
  };

  // ── Demo Login (no signup needed) ───────────────────────────
  const demoLogin = () => {
    localStorage.setItem('glp_demo_user', JSON.stringify(DEFAULT_DEMO_USER));
    localStorage.setItem('glp_user', JSON.stringify(DEFAULT_DEMO_USER));
    setUser(DEFAULT_DEMO_USER);
    return { user: DEFAULT_DEMO_USER };
  };

  // ── Update user (XP, badges, etc.) ──────────────────────────
  const updateUser = async (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('glp_user', JSON.stringify(updated));
      return updated;
    });

    // If real Firebase user, also update Firestore
    const isDemo = localStorage.getItem('glp_demo_user');
    if (!isDemo && auth.currentUser) {
      try {
        const { id, email: _e, createdAt: _c, ...firestoreData } = { ...data };
        await updateDoc(doc(db, 'users', auth.currentUser.uid), firestoreData);
      } catch (err) {
        console.error('Firestore update error:', err);
      }
    }
  };

  // ── Forgot Password ─────────────────────────────────────────
  const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, demoLogin, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
