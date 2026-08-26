import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Athletes'], ['/workouts', 'Workouts']];

function App() {
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><img src="/octofitapp-small.png" alt="" /><span>OctoFit<span>Tracker</span></span></div><p className="sidebar-label">Training room</p><nav>{navigation.map(([path, label]) => <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end={path === '/'} to={path} key={path}><span className="nav-dot" />{label}</NavLink>)}</nav><div className="sidebar-footer"><strong>Keep your streak alive.</strong><span>One session at a time.</span></div></aside><main className="main-content"><header className="topbar"><span>Wednesday, August 26</span><span className="connection"><i /> OctoFit community</span></header><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main></div>;
}

function Overview() { return <section className="overview"><div className="hero-copy"><p className="eyebrow">Welcome back, athlete</p><h1>Make today<br /><em>count.</em></h1><p className="hero-text">Your next personal best is closer than you think. Check the board, choose a session, and get moving.</p><NavLink className="primary-action" to="/workouts">Browse workouts <span>→</span></NavLink></div><div className="stat-strip"><div><span>Community points</span><strong>1,284</strong></div><div><span>Active athletes</span><strong>24</strong></div><div><span>Sessions this week</span><strong>86</strong></div></div></section>; }

export default App;