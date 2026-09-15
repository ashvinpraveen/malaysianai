import { Component, StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, useAuth } from '@clerk/react';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import App, { SetupMissing, Shell } from './App';
import { Notice } from './ui';
import './styles.css';
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Shell><div className="page-hero"><h1>Let’s try that again.</h1><Notice error>We couldn’t load this page. It may be unavailable or your access may have changed. Your saved work is safe.</Notice><a className="button" href="/profile">Back to your profile</a></div></Shell> : this.props.children; }
}
const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const url = import.meta.env.VITE_CONVEX_URL;
createRoot(document.getElementById('root')!).render(<StrictMode><ErrorBoundary>{key && url ? <ClerkProvider publishableKey={key} signInFallbackRedirectUrl="/profile" signUpFallbackRedirectUrl="/profile" appearance={{ variables: { colorPrimary: '#204d47', fontFamily: 'Atkinson, sans-serif', borderRadius: '0.4rem' } }}><ConvexProviderWithClerk client={new ConvexReactClient(url)} useAuth={useAuth}><App /></ConvexProviderWithClerk></ClerkProvider> : <SetupMissing />}</ErrorBoundary></StrictMode>);
