import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.results) {
          setUsers(data.results);
        } else {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h5 className="m-0">
            <i className="bi bi-person me-2"></i> Users
          </h5>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="alert alert-info">No users found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-primary">{index + 1}</span>
                      </td>
                      <td>
                        <strong>
                          <i className="bi bi-person-circle me-2"></i>
                          {user.username}
                        </strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          <i className="bi bi-envelope me-1"></i>
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <span className="badge bg-success">
                          <i className="bi bi-check-circle me-1"></i> Active
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">
                          <i className="bi bi-eye me-1"></i> View
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          <i className="bi bi-chat me-1"></i> Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Showing {filteredUsers.length} of {users.length} users
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;