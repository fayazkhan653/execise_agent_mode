import { useEffect, useState } from 'react';
import { fetchItems } from '../api';

function Workouts() {
  const [state, setState] = useState({ items: [], loading: true, configured: true, error: '' });
  useEffect(() => { fetchItems('/api/workouts/').then((result) => setState({ ...result, loading: false, error: '' })).catch((error) => setState({ items: [], loading: false, configured: true, error: error.message })); }, []);
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Today's menu</p><h1>Workouts</h1><p>Pick a challenge that meets you where you are.</p></div></div>{!state.configured ? <p className="status">API is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.</p> : state.loading ? <p className="status">Loading workouts...</p> : state.error ? <p className="status status-error">{state.error}</p> : <div className="row g-3">{state.items.length ? state.items.map((workout, index) => <div className="col-md-6" key={workout._id || index}><article className="workout-card"><span className="workout-number">{String(index + 1).padStart(2, '0')}</span><h2>{workout.name || workout.title || 'Untitled workout'}</h2><p>{workout.description || 'A focused session for a stronger day.'}</p><footer><span>{workout.durationMinutes || 30} min</span><span>{workout.fitnessLevel || 'All levels'}</span></footer></article></div>) : <p className="status">No workouts available yet.</p>}</div>}</section>;
}

export default Workouts;