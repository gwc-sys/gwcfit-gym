import React, { useEffect, useState } from 'react';
import {
  ArrowRight, BarChart3, BrainCircuit, CalendarCheck, Check, ChevronRight,
  Bell, CircleDollarSign, Dumbbell, Menu, MessageSquare, QrCode, ShieldCheck,
  Sparkles, Target, Users, X, Zap
} from 'lucide-react';
import GymBackground from './GymBackground';

const features = [
  { id: 'members', num: '01', name: 'Members', title: 'Know every member. Before they drift away.', text: 'See profiles, goals, memberships, attendance and progress in one timeline. PulseFit flags the people who need a timely check-in.', icon: Users, metric: '184', metricLabel: 'active members', note: '12 members need attention', color: '#dfff45' },
  { id: 'attendance', num: '02', name: 'Attendance', title: 'Turn every check-in into useful insight.', text: 'Track daily visits, spot quiet periods, and identify attendance drops early—without spreadsheets or manual registers.', icon: CalendarCheck, metric: '82%', metricLabel: 'weekly attendance', note: '+8% from last month', color: '#ff8c69' },
  { id: 'coaching', num: '03', name: 'Coaching', title: 'Give trainers a workflow they will actually use.', text: 'Assign members, schedule sessions, build plans, message clients and track completion from a focused trainer workspace.', icon: Dumbbell, metric: '46', metricLabel: 'sessions this week', note: '91% plan completion', color: '#a6b7ff' },
  { id: 'revenue', num: '04', name: 'Revenue', title: 'See what is paid, due and at risk.', text: 'Manage plans, payments and renewals with a clean revenue view. Follow up before an expired plan becomes a lost member.', icon: CircleDollarSign, metric: '₹4.8L', metricLabel: 'monthly revenue', note: '18 renewals due soon', color: '#ffd561' },
  { id: 'ai', num: '05', name: 'AI plans', title: 'Personalization without the paperwork.', text: 'Create tailored workout and diet plans faster, while trainers keep full control of every recommendation.', icon: BrainCircuit, metric: '6 min', metricLabel: 'average plan setup', note: '24 plans created this week', color: '#dfff45' },
  { id: 'reports', num: '06', name: 'Reports', title: 'Make decisions from signals, not guesses.', text: 'Understand growth, retention, trainer activity and gym performance through simple reports built for action.', icon: BarChart3, metric: '+14%', metricLabel: 'member retention', note: 'Strongest quarter yet', color: '#ff8c69' },
];

const scrollToDemo = () => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });

function Logo() {
  return <a href="#top" className="logo" aria-label="PulseFit home"><span className="logo-mark"><Zap size={17} fill="currentColor" /></span><span>pulsefit</span></a>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap"><nav className="nav shell" aria-label="Main navigation">
    <Logo />
    <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    <div className={`nav-links ${open ? 'open' : ''}`}>
      <a href="#product" onClick={() => setOpen(false)}>Product</a><a href="#how" onClick={() => setOpen(false)}>How it works</a><a href="#results" onClick={() => setOpen(false)}>Results</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
      <span className="nav-divider" /><a href="#login">Log in</a><button className="btn btn-dark nav-cta" onClick={() => { setOpen(false); scrollToDemo(); }}>Start free <ArrowRight size={16}/></button>
    </div>
  </nav></header>;
}

function DashboardMock() {
  return <div className="dash" aria-label="PulseFit owner dashboard preview">
    <aside className="dash-side"><Logo /><div className="side-items"><b>Overview</b><span>Members</span><span>Attendance</span><span>Trainers</span><span>Payments</span><span>Reports</span></div><div className="owner"><span>AK</span><small>Arjun Kumar<br/><i>Gym owner</i></small></div></aside>
    <div className="dash-main">
      <div className="dash-head"><div><small>MONDAY, 07 AUG</small><h3>Good morning, Arjun.</h3></div><div className="dash-head-actions"><div className="live-workout"><div className="lifter"><i className="head"/><i className="body"/><i className="arm left"/><i className="arm right"/><i className="bar"/><i className="weight weight-left"/><i className="weight weight-right"/></div><span><b>LIVE FLOOR</b><small>18 training now</small></span></div><button><MessageSquare size={15}/> 3</button></div></div>
      <div className="stat-row"><div><small>ACTIVE MEMBERS</small><strong>184</strong><em>+12 this month</em></div><div><small>MONTHLY REVENUE</small><strong>₹4.8L</strong><em>+8.4% vs last month</em></div><div><small>CHECKED IN TODAY</small><strong>67</strong><em>Peak at 7:00 PM</em></div></div>
      <div className="dash-grid"><div className="chart-card"><div className="card-title"><b>Member activity</b><span>Last 7 days</span></div><div className="bars">{[52,72,61,88,69,95,78].map((h,i)=><div key={i} className={i===5?'hot':''} style={{height:`${h}%`}}><span>{['M','T','W','T','F','S','S'][i]}</span></div>)}</div></div><div className="attention"><div className="card-title"><b>Needs attention</b><span>View all</span></div>{[['RM','Riya M.','7 days absent'],['AS','Aman S.','Plan expires today'],['NK','Nisha K.','Renewal in 3 days']].map(x=><div className="person" key={x[1]}><i>{x[0]}</i><span><b>{x[1]}</b><small>{x[2]}</small></span><ChevronRight size={15}/></div>)}</div></div>
    </div>
  </div>;
}

function FeatureExplorer() {
  const [active, setActive] = useState(features[0]);
  const Icon = active.icon;
  return <section id="product" className="feature-section shell section-pad">
    <div className="section-intro"><span className="eyebrow">One connected system</span><h2>Everything your gym needs.<br/><em>Nothing it doesn’t.</em></h2><p>Replace scattered tools and daily guesswork with one clear view of your business.</p></div>
    <div className="feature-explorer">
      <div className="feature-tabs" role="tablist" aria-label="Product features">{features.map(f=><button key={f.id} className={active.id===f.id?'active':''} onClick={()=>setActive(f)} role="tab" aria-selected={active.id===f.id}><span>{f.num}</span>{f.name}<ChevronRight size={18}/></button>)}</div>
      <div className="feature-detail" role="tabpanel"><div className="feature-copy"><span className="feature-icon" style={{background:active.color}}><Icon size={25}/></span><h3>{active.title}</h3><p>{active.text}</p><a href="#demo">Explore {active.name.toLowerCase()} <ArrowRight size={17}/></a></div><div className="metric-card" style={{'--accent':active.color}}><Sparkles size={21}/><strong>{active.metric}</strong><span>{active.metricLabel}</span><div><i/><small>{active.note}</small></div></div></div>
    </div>
  </section>;
}

const lifecycle = [
  { icon: Users, label: 'Join', title: 'Member onboarding', text: 'Profiles, health details, goals, membership plans and trainer assignment start in one clean record.' },
  { icon: QrCode, label: 'Visit', title: 'Attendance & access', text: 'QR-ready check-in and check-out, visit history, daily limits and live attendance keep your front desk moving.' },
  { icon: Dumbbell, label: 'Train', title: 'Workout coaching', text: 'Trainers assign structured workouts with exercises, sets, reps, notes, schedules and completion history.' },
  { icon: Target, label: 'Progress', title: 'Goals & nutrition', text: 'Members follow meal plans, hydration, body goals and progress while trainers see what is actually completed.' },
  { icon: CircleDollarSign, label: 'Renew', title: 'Payments & retention', text: 'Track plan expiry, invoices, paid and due amounts, receipts and renewal reminders before revenue slips away.' },
];

const plans = [
  { name:'Launch', price:'₹1,999', note:'For independent gyms getting organised', members:'Up to 150 members', features:['Owner + staff dashboard','Member management','Attendance & check-in','Membership plans & payments','Basic reports','Member mobile experience'] },
  { name:'Grow', price:'₹3,999', note:'For growing teams that want more automation', members:'Up to 500 members', popular:true, features:['Everything in Launch','Trainer workspaces','Workout & diet planning','Goals and progress tracking','Advanced reports','Roles and permissions','Priority support'] },
  { name:'Scale', price:'Custom', note:'For multi-location fitness businesses', members:'500+ members', features:['Everything in Grow','Multiple gym locations','Cross-location analytics','Custom roles and controls','Data onboarding support','Dedicated success manager'] },
];

function App() {
  useEffect(()=>{ const els=document.querySelectorAll('.reveal'); const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12}); els.forEach(el=>io.observe(el)); return()=>io.disconnect(); },[]);
  const submit = e => { e.preventDefault(); e.currentTarget.reset(); alert('Thanks! Your PulseFit demo request is ready.'); };
  return <><Nav/><main id="top">
    <div className="trial-strip"><span><Sparkles size={15}/> Limited launch offer</span><b>Your first month is completely free.</b><button onClick={scrollToDemo}>Start free — no card required <ArrowRight size={15}/></button></div>
    <section className="hero shell"><GymBackground/><div className="hero-copy"><div className="mini-proof"><span className="avatar-stack"><i>A</i><i>S</i><i>R</i></span><span><b>Built with gym owners</b><small>Made for the way you work</small></span></div><h1>Run your gym.<br/><span>Grow your people.</span></h1><p>PulseFit brings members, staff, attendance, payments and coaching into one calm, connected operating system.</p><div className="hero-actions"><button className="btn btn-lime" onClick={scrollToDemo}>Start 1 month free <ArrowRight size={18}/></button><a href="#product" className="text-link">Explore the platform <span>↓</span></a></div><small className="hero-fine"><Check size={14}/> Full access · No credit card · Cancel anytime</small></div><div className="hero-side"><div className="orbit-note"><span>ONE PLACE FOR</span><b>EVERY<br/>MOVING<br/>PART.</b></div><div className="hero-orbit-row"><div className="pulse-orbit"><Zap size={35}/><span/></div><button className="free-orbit" onClick={scrollToDemo} aria-label="Start your one month free trial"><small>1 MONTH</small><b>FREE</b><strong>FREE</strong><i>→</i></button></div></div></section>
    <section className="dashboard-stage"><div className="shell"><DashboardMock/><div className="proof-row"><span>YOUR GYM, AT A GLANCE</span><div><b>10+ hrs</b><small>saved every week</small></div><div><b>2× faster</b><small>member follow-up</small></div><div><b>100%</b><small>clearer operations</small></div></div></div></section>
    <section className="problem shell section-pad reveal"><span className="eyebrow">Less admin. More momentum.</span><div className="problem-grid"><h2>Your gym has enough<br/>heavy lifting already.</h2><div><p>When member data lives in one place, payments in another, and staff updates happen in chat, the important things get missed.</p><p>PulseFit connects the whole operation—so your team knows what to do next and your members feel the difference.</p><div className="check-row"><span><Check/> No spreadsheets</span><span><Check/> No blind spots</span><span><Check/> No tool chaos</span></div></div></div></section>
    <FeatureExplorer/>
    <section className="lifecycle section-pad"><div className="shell"><div className="section-intro"><span className="eyebrow">The complete member journey</span><h2>PulseFit checks every moving part.<br/><em>From joining to renewing.</em></h2><p>Every action updates the same member record, giving each role exactly the context they need.</p></div><div className="life-flow">{lifecycle.map((item,i)=>{const Icon=item.icon;return <article key={item.label}><div className="life-head"><span>{String(i+1).padStart(2,'0')}</span><Icon/></div><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p>{i<lifecycle.length-1&&<ChevronRight className="life-arrow"/>}</article>})}</div><div className="role-row"><span><ShieldCheck/> One secure system</span><div><b>Owner</b><small>Business overview</small></div><div><b>Reception</b><small>Members & check-ins</small></div><div><b>Trainer</b><small>Plans & progress</small></div><div><b>Member</b><small>Daily fitness journey</small></div><div><b>Super admin</b><small>Platform control</small></div></div></div></section>
    <section id="how" className="how section-pad"><div className="shell"><div className="section-intro light"><span className="eyebrow">Simple by design</span><h2>From scattered to sorted.<br/><em>In three moves.</em></h2></div><div className="steps">{[
      ['01','Set up','Bring in your members, plans, staff and gym details. We help you get organised from day one.'],['02','Run daily','Check-ins, assignments, payments and member follow-ups flow through one shared system.'],['03','Improve','Use clear reports and AI-assisted planning to retain more members and grow with confidence.']
    ].map((s,i)=><article key={s[0]}><span>{s[0]}</span><div className="step-icon">{i===0?<Users/>:i===1?<CalendarCheck/>:<BarChart3/>}</div><h3>{s[1]}</h3><p>{s[2]}</p>{i<2&&<ArrowRight className="step-arrow"/>}</article>)}</div></div></section>
    <section id="results" className="results shell section-pad reveal"><div className="result-image"><img src="/gym-detail.png" alt="Modern gym training space"/><div className="image-tag"><b>184</b><span>members, one clear view</span></div></div><div className="result-copy"><span className="eyebrow">Built to move the numbers</span><h2>Better operations feel better everywhere.</h2><p>Give your team clarity, give members more personal attention, and give yourself the information to grow sustainably.</p><div className="result-list"><div><b>01</b><span><strong>Keep members engaged</strong><small>Spot attendance changes and follow up while it still matters.</small></span></div><div><b>02</b><span><strong>Make every trainer effective</strong><small>Plans, sessions and progress stay visible and accountable.</small></span></div><div><b>03</b><span><strong>Protect your revenue</strong><small>Know what is paid, due, expiring, and ready to renew.</small></span></div></div></div></section>
    <section className="quote-band"><div className="shell"><div className="quote-mark">“</div><blockquote>PulseFit gave us something we never had before: one version of the truth for the whole gym.</blockquote><div className="quote-author"><span>RK</span><p><b>Rahul Khanna</b><small>Owner, Northside Strength</small></p></div><div className="quote-stats"><span><b>28%</b><small>less admin time</small></span><span><b>17%</b><small>higher renewals</small></span></div></div></section>
    <section id="pricing" className="pricing section-pad"><div className="shell"><div className="pricing-head"><div className="section-intro"><span className="eyebrow">Simple pricing</span><h2>Start free. Choose as<br/><em>your gym grows.</em></h2></div><div className="free-callout"><Sparkles/><span><b>1 month free on every plan</b><small>No credit card required. Your paid plan starts only after the trial.</small></span></div></div><div className="plan-grid">{plans.map(plan=><article className={plan.popular?'popular':''} key={plan.name}>{plan.popular&&<span className="popular-tag">Most popular</span>}<div className="plan-name"><span>{plan.name}</span><small>{plan.note}</small></div><div className="plan-price"><b>{plan.price}</b>{plan.price!=='Custom'&&<span>/ month</span>}</div><div className="member-limit"><Users size={17}/>{plan.members}</div><button className={`btn ${plan.popular?'btn-lime':'btn-outline'}`} onClick={scrollToDemo}>{plan.price==='Custom'?'Talk to us':'Start 1 month free'} <ArrowRight size={17}/></button><div className="plan-features"><b>What’s included</b>{plan.features.map(f=><span key={f}><Check size={15}/>{f}</span>)}</div></article>)}</div><p className="pricing-note">All prices are billed monthly and exclude applicable taxes. Need a different setup? We’ll tailor a plan around your gym.</p></div></section>
    <section id="demo" className="demo section-pad"><div className="shell demo-grid"><div><span className="eyebrow">Try the complete PulseFit experience</span><h2>Your first month<br/>is on us.</h2><p>Get full access for 30 days and see how PulseFit fits your team, your members and your way of working. No credit card required.</p><div className="demo-points"><span><Check/> Complete product access</span><span><Check/> Guided setup for your gym</span><span><Check/> Cancel anytime before billing</span></div></div><form onSubmit={submit}><div className="form-title"><b>Start your free month</b><small>Tell us about your gym. We’ll help with the rest.</small></div><label>Your name<input required placeholder="e.g. Arjun Kumar"/></label><label>Work email<input required type="email" placeholder="you@yourgym.com"/></label><label>Gym name<input required placeholder="Your gym"/></label><label>Active members<select defaultValue=""><option value="" disabled>Select range</option><option>Under 100</option><option>100–300</option><option>300–1,000</option><option>1,000+</option></select></label><button className="btn btn-dark" type="submit">Start 1 month free <ArrowRight size={18}/></button><small>No card required. By submitting, you agree to our privacy policy.</small></form></div></section>
  </main><footer><div className="shell footer-top"><div><Logo/><p>One connected operating system<br/>for ambitious gyms.</p></div><div><b>Product</b><a href="#product">Features</a><a href="#how">How it works</a><a href="#results">Results</a></div><div><b>Company</b><a href="#about">About</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a></div><div className="footer-note"><Sparkles/><span>Made for gyms<br/>that care deeply.</span></div></div><div className="shell footer-bottom"><span>© 2026 PulseFit Technologies</span><span>Built to keep gyms moving.</span></div></footer></>;
}

export default App;
