import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.results) {
          setTeams(data.results);
        } else {
          setTeams(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      // Add team creation logic here
      console.log('Creating team:', teamName);
      setShowModal(false);
      setTeamName('');
    }
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
              <i className="bi bi-people me-2"></i> Teams
            </h5>
            <button
              className="btn btn-sm btn-success"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle me-1"></i> Create Team
            </button>
          </div>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="alert alert-info">No teams found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id}>
                      <td>
                        <span className="badge bg-primary">{index + 1}</span>
                      </td>
                      <td>
                        <strong>{team.name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          <i className="bi bi-people me-1"></i>
                          {team.members ? team.members.length : 0}
                        </span>
                      </td>
                      <td>{new Date(team.created_at).toLocaleDateString() || 'N/A'}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          <i className="bi bi-eye me-1"></i> View
                        </button>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil me-1"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Team Modal */}
      <div
        className={`modal fade ${showModal ? 'show d-block' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i> Create New Team
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="teamNameInput" className="form-label">
                  Team Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="teamNameInput"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateTeam}
              >
                Create Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;