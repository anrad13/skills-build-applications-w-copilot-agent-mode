import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.results) {
          setLeaderboard(data.results);
        } else {
          setLeaderboard(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return '#cd7f32';
    return null;
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary text-white';
    if (rank === 3) return 'bg-danger text-white';
    return 'bg-info text-white';
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
          <h5>
            <i className="bi bi-trophy me-2"></i> Competitive Leaderboard
          </h5>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="alert alert-info">No leaderboard data available.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User ID</th>
                    <th>Score</th>
                    <th>Position</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <span className={`badge ${getRankBadgeClass(entry.rank)}`}>
                          {entry.rank === 1 && <i className="bi bi-trophy me-1"></i>}
                          {entry.rank === 2 && <i className="bi bi-award me-1"></i>}
                          {entry.rank === 3 && <i className="bi bi-star me-1"></i>}
                          #{entry.rank}
                        </span>
                      </td>
                      <td>
                        <strong>User {entry.user}</strong>
                      </td>
                      <td>
                        <span className="badge bg-success">{entry.score} pts</span>
                      </td>
                      <td>
                        {entry.rank === 1 && <span className="badge bg-warning text-dark">🥇 Gold</span>}
                        {entry.rank === 2 && <span className="badge bg-secondary text-white">🥈 Silver</span>}
                        {entry.rank === 3 && <span className="badge bg-danger text-white">🥉 Bronze</span>}
                        {entry.rank > 3 && <span className="badge bg-info text-white">Top {entry.rank}</span>}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;