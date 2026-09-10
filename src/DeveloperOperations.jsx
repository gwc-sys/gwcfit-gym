import React, { useEffect, useState } from 'react';
import { Building2, Check, Clipboard, Clock3, LogIn, Mail, RefreshCw, Send, Users } from 'lucide-react';
import { ownerApi } from './api';

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value)) : '—';

function GymCard({ gym, plans, token, onSaved }) {
  const [planId, setPlanId] = useState(gym.subscription?.platform_plan_id || plans[0]?.id || '');
  const [status, setStatus] = useState(gym.subscription?.status || 'trialing');
  const [message, setMessage] = useState('');
  const save = async () => {
    setMessage('Saving…');
    try {
      await ownerApi.setGymSubscription(gym.id, { platform_plan_id: planId, status }, token);
      setMessage('Saved');
      onSaved();
    } catch (error) { setMessage(error.message); }
  };
  return <article className="gym-record">
    <div className="record-head"><div><small>{gym.code}</small><h3>{gym.name}</h3></div><span className={`record-status ${gym.status}`}>{gym.status}</span></div>
    <div className="gym-details"><span><b>Owner</b>{gym.owner_name || 'Not assigned'}</span><span><b>Email</b>{gym.owner_email || gym.email || '—'}</span><span><b>Phone</b>{gym.phone || '—'}</span><span><b>Address</b>{gym.address || '—'}</span><span><b>Timezone</b>{gym.timezone}</span><span><b>Created</b>{formatDate(gym.created_at)}</span><span><b>Users</b>{gym.user_count}</span><span><b>Members / Trainers</b>{gym.member_count} / {gym.trainer_count}</span></div>
    <details className="gym-settings"><summary>Stored gym settings</summary><pre>{JSON.stringify(gym.settings, null, 2)}</pre></details>
    <div className="gym-subscription"><b>Subscription</b><div><select value={planId} onChange={(e) => setPlanId(e.target.value)}>{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select><select value={status} onChange={(e) => setStatus(e.target.value)}>{['trialing','active','past_due','cancelled','expired'].map((item) => <option key={item}>{item}</option>)}</select><button className="btn btn-lime" disabled={!planId} onClick={save}>Save</button></div><small>{gym.subscription?.status === 'trialing' ? `Free trial ends ${formatDate(gym.subscription.current_period_ends_at)}` : `Current plan: ${gym.subscription?.plan_name || 'Not assigned'}`} {message ? `· ${message}` : ''}</small></div>
  </article>;
}

function InquiryCard({ inquiry, token, onChanged }) {
  const [invite, setInvite] = useState(null);
  const [notes, setNotes] = useState(inquiry.notes || '');
  const [busy, setBusy] = useState(false);
  const changeStatus = async (status) => { await ownerApi.updateInquiry(inquiry.id, { status }, token); onChanged(); };
  const issueInvite = async () => {
    setBusy(true);
    try { setInvite(await ownerApi.inviteInquiry(inquiry.id, token)); onChanged(); }
    finally { setBusy(false); }
  };
  const inviteText = invite ? `PulseFit gym-owner invitation token: ${invite.token}` : '';
  return <article className="inquiry-record">
    <div className="record-head"><div><small>{formatDate(inquiry.created_at)} · {inquiry.source}</small><h3>{inquiry.gym_name}</h3></div><select value={inquiry.status} onChange={(e) => changeStatus(e.target.value)}>{['new','contacted','invited','converted','closed'].map((item) => <option key={item}>{item}</option>)}</select></div>
    <p><b>{inquiry.full_name}</b><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a></p>
    <div className="inquiry-meta"><span><Users size={15}/>{inquiry.active_members_range}</span><span>Interested in {inquiry.interested_plan_name || 'Launch'}</span></div>
    <label className="inquiry-notes">Developer notes<textarea rows="2" maxLength="2000" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Follow-up notes…"/><button type="button" onClick={async () => { await ownerApi.updateInquiry(inquiry.id, { notes: notes || null }, token); onChanged(); }}>Save notes</button></label>
    {invite ? <div className="issued-invite"><b>Invitation created</b><code>{invite.token}</code><div><button onClick={() => navigator.clipboard?.writeText(invite.token)}><Clipboard size={15}/> Copy token</button><a href={`mailto:${inquiry.email}?subject=Your PulseFit gym owner invitation&body=${encodeURIComponent(inviteText)}`}><Mail size={15}/> Email invitation</a></div></div> : null}
    {inquiry.status !== 'converted' ? <button className="btn btn-dark" onClick={issueInvite} disabled={busy}><Send size={16}/>{busy ? 'Creating…' : inquiry.invitation_id ? 'Create replacement invitation' : 'Invite gym owner'}</button> : <span className="converted-label"><Check size={16}/> Converted to gym</span>}
  </article>;
}

export default function DeveloperOperations({ session }) {
  const token = session.tokens.access_token;
  const [data, setData] = useState({ inquiries: [], gyms: [], trials: [], plans: [], loginEvents: [] });
  const [state, setState] = useState({ loading: true, error: '' });
  const load = () => {
    setState({ loading: true, error: '' });
    Promise.all([ownerApi.inquiries(token), ownerApi.gyms(token), ownerApi.freeTrials(token), ownerApi.plans(token), ownerApi.loginEvents(token)])
      .then(([inquiries, gyms, trials, plans, loginEvents]) => setData({ inquiries, gyms, trials, plans, loginEvents }))
      .catch((error) => setState({ loading: false, error: error.message }))
      .finally(() => setState((current) => ({ ...current, loading: false })));
  };
  useEffect(load, [token]);
  return <section className="developer-operations shell">
    <div className="operations-title"><div><small>BUSINESS OPERATIONS</small><h2>Gyms, trials and inquiries</h2><p>Every owner-site lead and every registered gym in one database-backed view.</p></div><button className="btn btn-outline" onClick={load}><RefreshCw size={16}/> Refresh</button></div>
    <div className="operations-metrics"><span><Mail/><b>{data.inquiries.length}</b><small>Owner inquiries</small></span><span><Building2/><b>{data.gyms.length}</b><small>All gyms</small></span><span><Clock3/><b>{data.trials.length}</b><small>Free trials</small></span><span><LogIn/><b>{data.loginEvents.length}</b><small>Recent logins</small></span></div>
    {state.error ? <div className="login-error">{state.error}</div> : null}
    {state.loading ? <div className="subscription-state">Loading developer data…</div> : <>
      <div className="operations-section"><h3>Gym owner inquiries</h3>{data.inquiries.length ? <div className="inquiry-grid">{data.inquiries.map((item) => <InquiryCard key={item.id} inquiry={item} token={token} onChanged={load}/>)}</div> : <p className="operations-empty">No inquiries yet. New “Start free” submissions will appear here.</p>}</div>
      <div className="operations-section"><h3>Free gym trials</h3>{data.trials.length ? <div className="trial-list">{data.trials.map((gym) => <span key={gym.id}><b>{gym.name}</b>{gym.subscription?.plan_name} · ends {formatDate(gym.subscription?.current_period_ends_at)}</span>)}</div> : <p className="operations-empty">No gyms are currently on a free trial.</p>}</div>
      <div className="operations-section"><h3>All gyms and subscriptions</h3>{data.gyms.length ? <div className="gym-record-grid">{data.gyms.map((gym) => <GymCard key={gym.id} gym={gym} plans={data.plans} token={token} onSaved={load}/>)}</div> : <p className="operations-empty">No registered gyms yet.</p>}</div>
      <div className="operations-section"><h3>Secure login history</h3>{data.loginEvents.length ? <div className="login-history"><table><thead><tr><th>Time</th><th>Account</th><th>Role</th><th>Result</th><th>IP address</th></tr></thead><tbody>{data.loginEvents.map((event) => <tr key={event.id}><td>{formatDate(event.created_at)}</td><td>{event.email}</td><td>{event.role || 'Unknown'}</td><td><span className={event.success ? 'login-success' : 'login-failed'}>{event.success ? 'Successful' : event.failure_reason}</span></td><td>{event.ip_address || '—'}</td></tr>)}</tbody></table></div> : <p className="operations-empty">No login events recorded yet.</p>}</div>
    </>}
  </section>;
}
