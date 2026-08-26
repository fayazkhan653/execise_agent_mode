import { useEffect, useState } from 'react';
import { fetchItems } from '../api';

function Teams() {
  const [state, setState] = useState({ items: [], loading: true, configured: true, error: '' });
  useEffect(() => { fetchItems('/api/teams/').then((result) => setState({ ...result, loading: false, error: '' })).catch((error) => setState({ items: [], loading: false, configured: true, error: error.message })); }, []);
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Find your pace</p><h1>Teams</h1><p>Training is better when the effort is shared.</p></div></div>{!state.configured ? <p className="status">API is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.</p> : state.loading ? <p className="status">Loading teams...</p> : state.error ? <p className="status status-error">{state.error}</p> : <div className="row g-3">{state.items.length ? state.items.map((team, index) => <div className="col-md-6" key={team._id || index}><article className="team-card"><span className="team-mark">0{index + 1}</span><h2>{team.name || 'Unnamed team'}</h2><p>{team.description || 'Keep showing up together.'}</p><small>{team.members?.length || 0} members</small></article></div>) : <p className="status">No teams created yet.</p>}</div>}</section>;
}

export default Teams;