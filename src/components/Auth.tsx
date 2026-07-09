/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, ArrowRight, Check, AlertCircle, Sun, Moon, Laptop } from 'lucide-react';
import { getFirebaseInstance, isFirebaseConfigured } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthProps {
  onAuthSuccess: (userEmail: string) => void;
  themeMode: 'light' | 'dark' | 'system';
  onThemeModeChange: (mode: 'light' | 'dark' | 'system') => void;
}

export default function Auth({ onAuthSuccess, themeMode, onThemeModeChange }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password || (isSignUp && !fullName)) {
      setError('Please complete all required fields.');
      setLoading(false);
      return;
    }

    const firebaseConfigured = isFirebaseConfigured();

    if (firebaseConfigured) {
      // 🚀 Real Firebase Auth execution flow
      try {
        const { auth } = getFirebaseInstance();
        if (isSignUp) {
          await createUserWithEmailAndPassword(auth, email, password);
          setSuccess('Account provisioned successfully via Firebase. Logging in...');
          setTimeout(() => {
            onAuthSuccess(email);
          }, 1500);
        } else {
          await signInWithEmailAndPassword(auth, email, password);
          onAuthSuccess(email);
        }
      } catch (err: any) {
        console.error("Firebase auth error:", err);
        setError(err.message || 'Authentication transaction failed.');
      } finally {
        setLoading(false);
      }
    } else {
      // 🟢 High-fidelity fallback simulated credentials
      setTimeout(() => {
        try {
          if (isSignUp) {
            // Save mock user in local storage
            const users = JSON.parse(localStorage.getItem('erp-mock-users') || '[]');
            if (users.find((u: any) => u.email === email)) {
              setError('Account with this email already exists.');
              setLoading(false);
              return;
            }
            users.push({ email, password, name: fullName });
            localStorage.setItem('erp-mock-users', JSON.stringify(users));
            setSuccess('Account registered successfully (Local Secure Sandboxed Database). Logging in...');
            setTimeout(() => {
              onAuthSuccess(email);
            }, 1200);
          } else {
            // Check mock users
            const users = JSON.parse(localStorage.getItem('erp-mock-users') || '[]');
            const user = users.find((u: any) => u.email === email && u.password === password);
            
            // Allow a fallback default password/email if it's the first time
            if (user || (email === 'admin@stratos.com' && password === 'admin123')) {
              onAuthSuccess(email);
            } else {
              setError('Invalid credentials. (Hint: Register a new account, or use admin@stratos.com / admin123)');
            }
          }
        } catch (e) {
          setError('An unexpected error occurred during client-side authentication.');
        } finally {
          setLoading(false);
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-12 transition-colors duration-300" style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}>
      {/* Top action: Theme Selector Toggle in page margin (Clean minimalist style) */}
      <div className="flex justify-between items-center max-w-lg w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
            S
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">STRATOS ERP</span>
        </div>

        {/* Triple Theme Selector Options */}
        <div className="flex bg-zinc-200/60 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-300/40 dark:border-zinc-800">
          <button
            onClick={() => onThemeModeChange('light')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'light' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-600'}`}
            title="Force Light Mode"
            id="btn-theme-light"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeModeChange('dark')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'dark' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}`}
            title="Force Dark Mode"
            id="btn-theme-dark"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeModeChange('system')}
            className={`p-1.5 rounded-md transition cursor-pointer ${themeMode === 'system' ? 'bg-white dark:bg-zinc-800 text-indigo-600 shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}`}
            title="System Preference"
            id="btn-theme-system"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Authentication Card */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {isSignUp ? 'Create Enterprise Account' : 'Welcome to Stratos ERP'}
            </h1>
            <p className="text-xs text-zinc-500 font-serif">
              {isSignUp 
                ? 'Register credentials below to configure dynamic simulation environments.' 
                : 'Access the unified enterprise control interface & RAG pipeline.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex gap-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 p-3.5 rounded-xl border border-red-200/40 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex gap-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl border border-emerald-200/40 text-xs">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@stratos.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">Security Password</label>
                {!isSignUp && (
                  <span className="text-[10px] text-indigo-600 hover:underline cursor-pointer">Forgot password?</span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white shadow-md cursor-pointer transition flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'Authenticating secure session...' : isSignUp ? 'Sign Up' : 'Authenticate Session'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccess('');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            >
              {isSignUp ? 'Already have an enterprise account? Log In' : "Don't have an account? Sign Up now"}
            </button>
          </div>
        </div>
      </div>

      {/* Simple Clean footer credentials */}
      <div className="text-center max-w-lg w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-900 pt-6">
        <p>© 2026 Stratos Monolith Inc. Clean Minimalist Suite.</p>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">SLA Agreement</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Security Audits</span>
        </div>
      </div>
    </div>
  );
}
