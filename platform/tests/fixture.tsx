// Browser-only test harness: never an entry point in the production build.
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { Shell } from '../src/App';
import { ApplicationForm, Notice, ReviewPanel } from '../src/ui';
import { EMPTY_ANSWERS, EMPTY_PROFILE } from '../src/domain';
import '../src/styles.css';
function Fixture() {
  const [done, setDone] = useState(false);
  if (!import.meta.env.DEV) return null;
  return <Shell><div className="notice">UI test fixture · synthetic data only</div>{location.search.includes('review') ? <div style={{ maxWidth: 420, margin: '50px auto' }}><ReviewPanel locked={false} onSave={async vote => { sessionStorage.setItem('test-vote', JSON.stringify(vote)); }} /></div> : done ? <Notice>Test submission recorded.</Notice> : <ApplicationForm initialProfile={EMPTY_PROFILE} initialAnswers={EMPTY_ANSWERS} email="applicant@example.com" onSave={async (profile, answers) => { sessionStorage.setItem('test-draft', JSON.stringify({ profile, answers })); }} onSubmit={async (profile, answers) => { sessionStorage.setItem('test-submission', JSON.stringify({ profile, answers })); setDone(true); }} />}</Shell>;
}
createRoot(document.getElementById('root')!).render(<Fixture />);
