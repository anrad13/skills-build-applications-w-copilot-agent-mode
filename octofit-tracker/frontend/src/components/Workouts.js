import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.results) {
          setWorkouts(data.results);
        } else {
          setWorkouts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getDifficultyBadgeClass = (difficulty) => {
    const diff = difficulty?.toLowerCase() || 'beginner';
    if (diff === 'beginner') return 'bg-success';
    if (diff === 'intermediate') return 'bg-warning text-dark';
    if (diff === 'advanced') return 'bg-danger';
    return 'bg-info';
  };

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
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">
              <i className="bi bi-heart-pulse me-2"></i> Personalized Workouts
            </h5>
            <button className="btn btn-sm btn-success">
              <i className="bi bi-plus-circle me-1"></i> Add Workout
            </button>
          </div>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="alert alert-info">No workouts available.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Workout Name</th>
                    <th>Difficulty</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id}>
                      <td>
                        <span className="badge bg-primary">{index + 1}</span>
                      </td>
                      <td>
                        <strong>
                          <i className="bi bi-heart-pulse me-2"></i>
                          {workout.name}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${getDifficultyBadgeClass(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      </td>
                      <td>
                        <small>{workout.description}</small>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          {workout.duration || 'N/A'} min
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-success me-2">
                          <i className="bi bi-play-circle me-1"></i> Start
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-info-circle me-1"></i> Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3 p-3 bg-light rounded">
            <h6 className="mb-2">
              <i className="bi bi-lightbulb me-2"></i> Pro Tip
            </h6>
            <small className="text-muted">
              Choose workouts based on your fitness level and gradually increase difficulty for better results.
              Mix cardio and strength workouts for a balanced routine.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;