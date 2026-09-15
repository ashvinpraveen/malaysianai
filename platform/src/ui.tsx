import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ConvexError } from 'convex/values';
import { CRITERIA, QUESTIONS, ROLES, STATE_LABELS, isFlagged, mean, validateAnswers, validateProfile, validateVote, type Answers, type Profile, type ReviewState, type Scores, type Vote } from './domain';

export function errorMessage(error: unknown) {
  if (error instanceof ConvexError && typeof error.data === 'string') return error.data;
  if (error instanceof Error) {
    const message = error.message.split('Uncaught Error: ')[1]?.split('\n')[0];
    return message || (error.message.includes('[CONVEX') ? 'Something went wrong. Your last saved work is safe. Please try again.' : error.message);
  }
  return 'Something went wrong. Please try again.';
}
export function Notice({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return <p className={`notice ${error ? 'error' : ''}`} role={error ? 'alert' : 'status'}>{children}</p>;
}
export function Status({ state }: { state: ReviewState }) { return <span className={`badge ${state}`}>{STATE_LABELS[state]}</span>; }
export function useReveals() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const elements = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('will-reveal')); };
  }, []);
  return ref;
}
export function Hero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return <div className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p>{children}</div>;
}
export function TextField({ label, value, onChange, type = 'text', required = false, hint, disabled, autoComplete, maxLength = 200 }: { label: string; value: string; onChange?: (value: string) => void; type?: string; required?: boolean; hint?: string; disabled?: boolean; autoComplete?: string; maxLength?: number }) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-');
  return <div className="field"><label htmlFor={id}>{label}{!required && !disabled && <span className="optional">Optional</span>}</label><input id={id} value={value} onChange={event => onChange?.(event.target.value)} type={type} required={required} disabled={disabled} autoComplete={autoComplete} maxLength={maxLength} aria-describedby={hint ? `${id}-hint` : undefined} />{hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}</div>;
}
export function ProfileFields({ profile, setProfile, email, complete = true, socials = false }: { profile: Profile; setProfile: (profile: Profile) => void; email: string; complete?: boolean; socials?: boolean }) {
  const change = (key: keyof Profile) => (value: string) => setProfile({ ...profile, [key]: value });
  if (socials) return <div className="field-grid"><TextField label="LinkedIn URL" type="url" maxLength={1000} value={profile.linkedin} onChange={change('linkedin')} /><TextField label="X URL" type="url" maxLength={1000} value={profile.x} onChange={change('x')} /><TextField label="Threads @" value={profile.threads} onChange={change('threads')} /><TextField label="Instagram @" value={profile.instagram} onChange={change('instagram')} /></div>;
  return <>
    <div className="field-grid"><TextField label="Name" value={profile.name} onChange={change('name')} required={complete} autoComplete="name" /><TextField label="Email" value={email} type="email" disabled hint="Your verified account email. Update it in account settings." /><TextField label="Nationality" value={profile.nationality} onChange={change('nationality')} required={complete} hint="More than one nationality? Include them here." /><TextField label="Phone Number" type="tel" value={profile.phone} onChange={change('phone')} required={complete} autoComplete="tel" hint="Include your country code, for example +60 12 345 6789." /></div>
    <fieldset className="roles"><legend>Which of these best describes you?</legend><p className="hint" id="roles-hint">Select all that apply.{complete ? ' Choose at least one.' : ''}</p><div className="role-options">{ROLES.map(role => <label key={role} className={profile.roles.includes(role) ? 'selected' : ''}><input type="checkbox" checked={profile.roles.includes(role)} aria-describedby="roles-hint" onChange={event => setProfile({ ...profile, roles: event.target.checked ? [...profile.roles, role] : profile.roles.filter(value => value !== role) })} /><span>{role}</span><span className="role-check" aria-hidden="true">{profile.roles.includes(role) ? '✓' : '+'}</span></label>)}</div></fieldset>
  </>;
}
export function AnswerSummary({ profile, answers, email }: { profile: Profile; answers: Answers; email: string }) {
  return <div className="answer-summary"><div className="summary-identity"><h2>{profile.name || 'Your profile'}</h2><p>{profile.roles.join(' · ')}</p><dl><div><dt>Email</dt><dd>{email}</dd></div><div><dt>Nationality</dt><dd>{profile.nationality || '—'}</dd></div><div><dt>Phone</dt><dd>{profile.phone || '—'}</dd></div>{(['linkedin', 'x', 'threads', 'instagram'] as const).filter(key => profile[key]).map(key => <div key={key}><dt>{key === 'x' ? 'X' : key}</dt><dd>{key === 'linkedin' || key === 'x' ? <a href={profile[key]} target="_blank" rel="noopener noreferrer">{profile[key]} ↗</a> : profile[key]}</dd></div>)}</dl></div>{QUESTIONS.map(question => <section className="answer" key={question.key}><h3>{question.title}</h3><LinkedText text={answers[question.key]} /></section>)}</div>;
}
function LinkedText({ text }: { text: string }) {
  return <p className="preserve">{text.split(/(https?:\/\/[^\s<>]+)/g).map((part, index) => /^https?:\/\//.test(part) ? <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part} ↗</a> : part)}</p>;
}
export function ApplicationForm({ initialProfile, initialAnswers, email, onSave, onSubmit }: { initialProfile: Profile; initialAnswers: Answers; email: string; onSave: (profile: Profile, answers: Answers) => Promise<unknown>; onSubmit: (profile: Profile, answers: Answers) => Promise<unknown> }) {
  const [profile, setProfile] = useState(initialProfile);
  const [answers, setAnswers] = useState(initialAnswers);
  const [saved, setSaved] = useState(JSON.stringify([initialProfile, initialAnswers]));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [active, setActive] = useState('you');
  const ref = useReveals();
  const form = useRef<HTMLFormElement>(null);
  const dirty = saved !== JSON.stringify([profile, answers]);
  const sections = [{ id: 'you', label: 'A little about you' }, { id: 'work', label: 'The work' }, { id: 'fit', label: 'The fit' }, { id: 'elsewhere', label: 'Find you elsewhere' }];
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', warn); return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => {
    if (reviewing) return;
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('[data-step]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [reviewing]);
  async function save() {
    setBusy(true); setError('');
    try { validateProfile(profile, false); validateAnswers(answers, false); await onSave(profile, answers); setSaved(JSON.stringify([profile, answers])); setMessage('Draft saved. Come back whenever you’re ready.'); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }
  function reviewAnswers() {
    setError('');
    if (!form.current?.reportValidity()) return;
    try { validateProfile(profile, true); validateAnswers(answers, true); setReviewing(true); window.scrollTo({ top: 0, behavior: 'instant' }); }
    catch (err) { setError(errorMessage(err)); }
  }
  async function submit() {
    setBusy(true); setError('');
    try { await onSubmit(profile, answers); setSaved(JSON.stringify([profile, answers])); }
    catch (err) { setError(errorMessage(err)); setBusy(false); }
  }
  return <div ref={ref}>
    <Hero eyebrow="Malaysian AI / Residency application" title={reviewing ? <>One last <em>look.</em></> : <>Make room for<br /><em>what’s next.</em></>} description={reviewing ? 'This is the application our residents will read. Once submitted, these answers are locked.' : 'A working home for people who can’t leave an idea alone. Tell us a little about yourself, your work, and what brings you here.'}><div className="hero-meta"><span>Four questions. Your own words.</span><span>Private to you and our residents</span></div></Hero>
    {reviewing ? <div className="review-submit"><AnswerSummary profile={profile} answers={answers} email={email} /><div className="submission-note"><span className="section-number">↗</span><div><h3>Ready to share your work?</h3><p>Your answers will be reviewed by the resident community. You’ll receive a receipt by email and can follow the outcome here.</p><p>By submitting, you share these details with our residents for application review. <a href="https://www.malaysian.ai/privacy" target="_blank" rel="noreferrer">Privacy policy ↗</a></p></div></div>{error && <Notice error>{error}</Notice>}<div className="actions"><button type="button" className="button secondary" disabled={busy} onClick={() => setReviewing(false)}>← Back to editing</button><button type="button" className="button" disabled={busy} onClick={submit}>{busy ? 'Submitting…' : 'Submit application'} <span>↗</span></button></div></div> :
    <div className="application-layout"><aside className="application-rail"><p className="eyebrow">Your application</p><nav aria-label="Application sections">{sections.map((section, index) => <a key={section.id} className={active === section.id ? 'active' : ''} href={`#${section.id}`} aria-current={active === section.id ? 'step' : undefined}><span>0{index + 1}</span>{section.label}</a>)}</nav><div className="rail-note"><p>Take your time.</p><p>There’s no perfect answer.<br />We’d rather hear yours.</p></div><a href="https://www.malaysian.ai/residency" target="_blank" rel="noreferrer" className="text-link">About the Residency ↗</a></aside>
    <form ref={form} onSubmit={event => { event.preventDefault(); reviewAnswers(); }} className="application-form">
      <section id="you" data-step data-reveal className="form-section"><div className="section-heading"><span className="section-number">01</span><div><p className="eyebrow">The person behind the work</p><h2>A little about <em>you.</em></h2></div></div><ProfileFields profile={profile} setProfile={setProfile} email={email} /></section>
      <section id="work" data-step className="form-section"><div className="section-heading" data-reveal><span className="section-number">02</span><div><p className="eyebrow">Ideas become real here</p><h2>Show us <em>the work.</em></h2></div></div>{QUESTIONS.slice(0, 2).map(question => <AnswerField key={question.key} question={question} value={answers[question.key]} change={value => setAnswers({ ...answers, [question.key]: value })} />)}</section>
      <div className="interlude" data-reveal><span aria-hidden="true">✳</span><p>Good things happen<br />when people <em>build together.</em></p><small>Kuala Lumpur, Malaysia</small></div>
      <section id="fit" data-step className="form-section"><div className="section-heading" data-reveal><span className="section-number">03</span><div><p className="eyebrow">The right room matters</p><h2>Let’s talk <em>fit.</em></h2></div></div>{QUESTIONS.slice(2).map(question => <AnswerField key={question.key} question={question} value={answers[question.key]} change={value => setAnswers({ ...answers, [question.key]: value })} />)}</section>
      <section id="elsewhere" data-step data-reveal className="form-section"><div className="section-heading"><span className="section-number">04</span><div><p className="eyebrow">A few more windows into your world</p><h2>You, <em>elsewhere.</em></h2></div></div><p className="section-intro">Entirely optional. Share the places where your work and interests live.</p><ProfileFields profile={profile} setProfile={setProfile} email={email} socials /></section>
      {error && <Notice error>{error}</Notice>}{message && <Notice>{dirty ? 'You have unsaved changes.' : message}</Notice>}
      <div className="form-actions"><div><span className={`save-dot ${dirty ? 'unsaved' : ''}`} />{dirty ? 'Unsaved changes' : 'No unsaved changes'}</div><div className="actions"><button className="button secondary" type="button" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save draft'}</button><button className="button" type="submit" disabled={busy}>Review application <span>↗</span></button></div></div>
    </form></div>}
  </div>;
}
function AnswerField({ question, value, change }: { question: typeof QUESTIONS[number]; value: string; change: (value: string) => void }) {
  return <div className="answer-field" data-reveal><label htmlFor={question.key}>{question.title}</label><p className="hint" id={`${question.key}-hint`}>{question.hint}</p><textarea id={question.key} value={value} onChange={event => change(event.target.value)} required maxLength={6000} rows={6} aria-describedby={`${question.key}-hint`} placeholder="In your own words…" /><span className="character-count">{value.length.toLocaleString()} / 6,000</span></div>;
}
export function ReviewPanel({ initial, locked, onSave }: { initial?: Vote; locked: boolean; onSave: (vote: Vote) => Promise<unknown> }) {
  const [values, setValues] = useState<Partial<Scores>>(initial?.scores ?? {});
  const [decision, setDecision] = useState<Vote['decision'] | ''>(initial?.decision ?? '');
  const [reason, setReason] = useState(initial?.reason ?? '');
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const keys = ['obsession', 'vibes', 'executionPace'] as const;
  const complete = keys.every(key => values[key] !== undefined);
  const score = complete ? mean(values as Scores) : null;
  const flagged = decision === 'no' && score !== null && score > 7.5;
  return <form className="review-panel" onSubmit={async event => {
    event.preventDefault(); setError(''); setMessage('');
    if (!decision) { setError('Choose Yes, No or Abstain.'); return; }
    const vote: Vote = { decision, scores: decision === 'abstain' ? null : values as Scores, reason };
    try { validateVote(vote); setBusy(true); await onSave(vote); setMessage('Your review has been saved.'); }
    catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }}><p className="eyebrow">Your perspective</p><h2>Resident review</h2><p className="hint">Three scores. One considered decision.</p><fieldset disabled={locked || busy || decision === 'abstain'} className="score-fields"><legend className="sr-only">Scores out of 10</legend>{keys.map((key, index) => <div className="score-row" key={key}><label htmlFor={`score-${key}`}>{CRITERIA[index]}</label><select id={`score-${key}`} value={values[key] ?? ''} onChange={event => setValues({ ...values, [key]: event.target.value ? Number(event.target.value) : undefined })}><option value="">—</option>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} / 10</option>)}</select></div>)}</fieldset><div className="score-average"><span>Your average</span><strong>{decision === 'abstain' || score === null ? '—' : score.toFixed(2)}<small> / 10</small></strong></div><fieldset className="vote-options" disabled={locked || busy}><legend>Would you welcome them in?</legend>{(['yes', 'no', 'abstain'] as const).map(value => <label key={value} className={decision === value ? 'selected' : ''}><input type="radio" name="decision" value={value} checked={decision === value} onChange={() => setDecision(value)} /><span>{value === 'yes' ? 'Yes' : value === 'no' ? 'No' : 'Abstain'}</span></label>)}</fieldset>{decision === 'abstain' && <p className="hint">No scores are submitted with an abstention. An admin will resolve the application after the panel responds.</p>}{decision === 'no' && <div className="field"><label htmlFor="no-reason">Why are you voting No?</label><textarea id="no-reason" required maxLength={4000} rows={4} value={reason} disabled={locked || busy} onChange={event => setReason(event.target.value)} /><p className="hint">Internal to residents. The applicant will not see this reason.</p></div>}{flagged && <div className="flag" role="status">⚑ High score, No vote<p>Your average is above 7.5. This review will be flagged for discussion.</p></div>}{error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}<button className="button full" disabled={locked || busy}>{locked ? 'Review locked' : busy ? 'Saving…' : initial ? 'Update my review' : 'Save my review'} <span>↗</span></button></form>;
}
