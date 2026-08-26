import { useEffect, useState } from 'react';
import { fetchItems } from '../api';

function Leaderboard() {
  const [state, setState] = useState({ items: [], loading: true, configured: true, error: '' });
  useEffect(() => { fetchItems('leaderboard').then((result) => setState({ ...result, loading: false, error: '' })).catch((error) => setState({ items: [], loading: false, configured: true, error: error.message })); }, []);
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p>Small wins, seen by the whole team.</p></div></div>{!state.configured ? <p className="status">API is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.</p> : state.loading ? <p className="status">Loading rankings...</p> : state.error ? <p className="status status-error">{state.error}</p> : <div className="ranking-list">{state.items.length ? state.items.map((user, index) => <div className="ranking-row" key={user._id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="avatar">{user.name?.charAt(0) || '?'}</span><strong>{user.name || 'Unnamed athlete'}</strong><span className="level">{user.fitnessLevel || 'All levels'}</span><b>{user.points ?? 0} pts</b></div>) : <p className="status">No rankings available yet.</p>}</div>}</section>;
}

export default Leaderboard;