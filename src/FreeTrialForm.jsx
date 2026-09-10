import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { ownerApi } from './api';

export default function FreeTrialForm({ plans }) {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [state, setState] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    if (!selectedPlan && plans[0]?.id?.includes('-')) setSelectedPlan(plans[0].id);
  }, [plans, selectedPlan]);

  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setState({ loading: true, error: '', success: '' });
    try {
      await ownerApi.submitInquiry({
        full_name: form.get('full_name'), email: form.get('email'), phone: form.get('phone'),
        gym_name: form.get('gym_name'),
        active_members_range: form.get('active_members_range'),
        interested_plan_id: form.get('interested_plan_id') || null, source: 'owner_site',
      });
      formElement.reset();
      setSelectedPlan(plans[0]?.id?.includes('-') ? plans[0].id : '');
      setState({ loading: false, error: '', success: 'Thanks — your gym inquiry is saved. Our team will send your secure owner invitation.' });
    } catch (error) {
      setState({ loading: false, error: error.message || 'Could not submit your inquiry.', success: '' });
    }
  };

  return <form onSubmit={submit}>
    <div className="form-title"><b>Start your free month</b><small>Tell us about your gym. We’ll help with the rest.</small></div>
    <label>Your name<input name="full_name" required minLength="2" placeholder="e.g. Arjun Kumar"/></label>
    <label>Work email<input name="email" required type="email" placeholder="you@yourgym.com"/></label>
    <label>Mobile number<input name="phone" required type="tel" minLength="8" maxLength="40" autoComplete="tel" placeholder="e.g. +91 98765 43210"/></label>
    <label>Gym name<input name="gym_name" required minLength="2" placeholder="Your gym"/></label>
    <label>Active members<select name="active_members_range" defaultValue="" required><option value="" disabled>Select range</option><option>Under 100</option><option>100–300</option><option>300–1,000</option><option>1,000+</option></select></label>
    <label>Interested plan<select name="interested_plan_id" value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)}><option value="">Launch (default)</option>{plans.filter((plan) => plan.id?.includes('-')).map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
    {state.error ? <div className="login-error" role="alert">{state.error}</div> : null}
    {state.success ? <div className="trial-success" role="status"><Check size={18}/>{state.success}</div> : null}
    <button className="btn btn-dark" type="submit" disabled={state.loading}>{state.loading ? <LoaderCircle className="spin" size={18}/> : null}{state.loading ? 'Saving inquiry…' : 'Start 1 month free'} <ArrowRight size={18}/></button>
    <small>No card required. By submitting, you agree to our privacy policy.</small>
  </form>;
}
