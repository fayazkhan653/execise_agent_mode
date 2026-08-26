import { useEffect, useState } from 'react';
import { fetchItems } from '../api';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : null;

function Users() {
  const [state, setState] = useState({ items: [], loading: true, configured: true, error: '' });
  useEffect(() => { fetchItems(usersEndpoint).then((result) => setState({ ...result, loading: false, error: '' })).catch((error) => setState({ items: [], loading: false, configured: true, error: error.message })); }, []);
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Athletes</h1><p>See who is building a stronger routine.</p></div><span className="section-count">{state.items.length} athletes</span></div>{!state.configured ? <p className="status">API is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.</p> : state.loading ? <p className="status">Loading athletes...</p> : state.error ? <p className="status status-error">{state.error}</p> : <div className="row g-3">{state.items.length ? state.items.map((user, index) => <div className="col-md-6 col-xl-4" key={user._id || index}><article className="person-card"><span className="avatar avatar-large">{user.name?.charAt(0) || '?'}</span><h2>{user.name || 'Unnamed athlete'}</h2><p>{user.email || 'Profile in progress'}</p><strong>{user.points ?? 0} points</strong></article></div>) : <p className="status">No athletes registered yet.</p>}</div>}</section>;
}

export default Users;