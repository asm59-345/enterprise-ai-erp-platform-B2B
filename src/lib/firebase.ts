/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Lazy loading configuration helper
const getFirebaseConfig = () => {
  const env = (import.meta as any).env || {};
  return {
    apiKey: env.VITE_FIREBASE_API_KEY || "",
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: env.VITE_FIREBASE_APP_ID || ""
  };
};

// Check if Firebase has a valid config loaded
export const isFirebaseConfigured = () => {
  const config = getFirebaseConfig();
  return !!(config.apiKey && config.projectId);
};

// Graceful Client Initializer
let firebaseApp: any = null;
let firestoreDb: any = null;
let firebaseAuth: any = null;

export const getFirebaseInstance = () => {
  if (!isFirebaseConfigured()) {
    return { app: null, db: null, auth: null };
  }

  if (!firebaseApp) {
    const config = getFirebaseConfig();
    firebaseApp = getApps().length === 0 ? initializeApp(config) : getApp();
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
  }

  return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth };
};

/**
 * PRODUCTION COMPLIANCE SYNC LAYER
 * Sync local ERP operations to Google Firebase when configured, 
 * otherwise sync to standard persistent client storage seamlessly.
 */
export async function syncAuditLogToCloud(log: any) {
  if (isFirebaseConfigured()) {
    try {
      const { db } = getFirebaseInstance();
      if (db) {
        const auditRef = collection(db, 'audit_logs');
        await addDoc(auditRef, {
          ...log,
          syncedAt: new Date().toISOString()
        });
        console.log("🟢 [Firebase] Log persisted successfully");
        return true;
      }
    } catch (e) {
      console.error("⚠️ [Firebase] Log synchronization failed:", e);
    }
  }
  
  // Fallback storage sync
  try {
    const existing = localStorage.getItem('erp-fallback-logs');
    const logs = existing ? JSON.parse(existing) : [];
    logs.unshift(log);
    localStorage.setItem('erp-fallback-logs', JSON.stringify(logs.slice(0, 200)));
  } catch (e) {
    console.error("Fallback sync failed:", e);
  }
  return false;
}
