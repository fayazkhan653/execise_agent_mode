import { useEffect, useState } from 'react';
import { fetchItems } from '../api';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : null;

function Activities() {
  const [state, setState] = useState({ items: [], loading: true, configured: true, error: '' });

  useEffect(() => {
    fetchItems(activitiesEndpoint).then((result) => setState({ ...result, loading: false, error: '' }))
      .catch((error) => setState({ items: [], loading: false, configured: true, error: error.message }));
  }, []);

  return <ResourceTable title="Recent activity" description="Every session adds momentum to your week."
    state={state} columns={['Activity', 'Athlete', 'Points', 'Logged']} />;
}

function ResourceTable({ title, description, state, columns }) {
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Live feed</p><h1>{title}</h1><p>{description}</p></div><span className="section-count">{state.items.length} records</span></div>
    {!state.configured ? <ConfigNotice /> : state.loading ? <p className="status">Loading activity...</p> : state.error ? <p className="status status-error">{state.error}</p> : state.items.length === 0 ? <p className="status">No activity logged yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{state.items.map((item, index) => <tr key={item._id || index}><td>{item.type || item.activityType || 'Workout'}</td><td>{item.user?.name || item.user || 'Unknown athlete'}</td><td>{item.points ?? 0}</td><td>{item.loggedAt ? new Date(item.loggedAt).toLocaleDateString() : 'Recently'}</td></tr>)}</tbody></table></div>}
  </section>;
}

function ConfigNotice() { return <p className="status">API is not configured. Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code>.</p>; }

export default Activities;