import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import { ownerApi } from './api';

const SESSION_KEY = 'pulsefit.owner.session.v1';
const PULSEFIT_APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:8081';

export function useDeveloperSession() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      setChecking(false);
      return;
    }
    try {
      const stored = JSON.parse(raw);
      ownerApi.me(stored.tokens.access_token).then((user) => {
        if (user.role !== 'super_admin') throw new Error('Platform-owner access is required.');
        const verified = { ...stored, user };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(verified));
        setSession(verified);
      }).catch(() => sessionStorage.removeItem(SESSION_KEY)).finally(() => setChecking(false));
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
      setChecking(false);
    }
  }, []);

  const save = (nextSession) => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  };
  const clear = async () => {
    const token = session?.tokens?.access_token;
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
    if (token) await ownerApi.logout(token).catch(() => undefined);
  };
  return { session, checking, save, clear };
}

export function DeveloperLogin({ open, onClose, onAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const session = await ownerApi.login(email.trim().toLowerCase(), password);
      if (session.user.role !== 'super_admin') {
        await ownerApi.logout(session.tokens.access_token).catch(() => undefined);
        throw new Error('This login is restricted to the PulseFit application owner.');
      }
      onAuthenticated(session);
      setPassword('');
      onClose();
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return <div className="login-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="login-dialog" role="dialog" aria-modal="true" aria-labelledby="developer-login-title">
      <button className="login-close" type="button" onClick={onClose} aria-label="Close login"><X size={20}/></button>
      <span className="login-icon"><ShieldCheck size={27}/></span>
      <small className="login-kicker">SECURE PLATFORM ACCESS</small>
      <h2 id="developer-login-title">Developer login</h2>
      <p>Sign in with the application-owner account configured in the PulseFit backend.</p>
      <form onSubmit={submit}>
        <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="username" required placeholder="owner@company.com"/></label>
        <label>Password<span className="password-input"><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="current-password" required/><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label>
        {error ? <div className="login-error" role="alert">{error}</div> : null}
        <button className="btn btn-dark login-submit" disabled={loading} type="submit">{loading ? <LoaderCircle className="spin" size={18}/> : <LockKeyhole size={18}/>} {loading ? 'Signing in…' : 'Sign in securely'}</button>
      </form>
    </section>
  </div>;
}

export function DeveloperWelcome({ session, onLogout }) {
  return <section className="developer-welcome shell" id="developer-console">
    <div><small>APPLICATION OWNER CONNECTED</small><h2>Welcome, {session.user.full_name}</h2><p>The owner site is authenticated against the live PulseFit backend. Manage inquiries, gym-owner invitations, free trials, gyms, and subscriptions in the controls below.</p></div>
    <div className="developer-actions"><span><ShieldCheck size={18}/> {session.user.email}</span><a className="btn btn-lime" href={PULSEFIT_APP_URL}>Open PulseFit app</a><button className="btn btn-outline" type="button" onClick={onLogout}>Log out</button></div>
  </section>;
}
