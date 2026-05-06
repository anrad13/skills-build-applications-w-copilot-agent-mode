import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.results) {
          setActivities(data.results);
        } else {
          setActivities(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );
  }

  return (
    <div className="component-section">
      <div className="card">
        <div className="card-header">
          <h5>
            <i className="bi bi-activity me-2"></i> Activities
          </h5>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="alert alert-info">No activities found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Calories Burned</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge bg-primary">{index + 1}</span>
                      </td>
                      <td>
                        <strong>{activity.activity_type}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">{activity.duration} min</span>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">{activity.calories_burned} cal</span>
                      </td>
                      <td>{new Date(activity.date).toLocaleDateString() || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-3">
            <button className="btn btn-primary me-2">
              <i className="bi bi-plus-circle me-2"></i> Add Activity
            </button>
            <button className="btn btn-secondary">
              <i className="bi bi-arrow-clockwise me-2"></i> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;