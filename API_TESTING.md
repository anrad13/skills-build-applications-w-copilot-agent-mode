# OctoFit Tracker API Setup and Testing

## Configuration Updates

### ✅ Completed Updates:

1. **settings.py** - Updated `ALLOWED_HOSTS` to support:
   - `localhost` and `127.0.0.1` for local development
   - Dynamic codespace URL: `$CODESPACE_NAME-8000.app.github.dev`

2. **urls.py** - Updated to:
   - Include environment variable `$CODESPACE_NAME` for base URL construction
   - Properly route API endpoints to `/api/[component]/`
   - Handle both https (codespace) and http (localhost) protocols

3. **launch.json** - Configured to:
   - Launch Django backend on `0.0.0.0:8000`
   - Support Python virtual environment from `octofit-tracker/backend/venv`

## Starting the Django Server

### Option 1: Using VS Code Debug (Recommended)
1. Open the Run and Debug panel (Cmd+Shift+D or Ctrl+Shift+D)
2. Select "Launch Django Backend" from the dropdown
3. Click the green play button to start the server
4. Server will run on `http://localhost:8000`

### Option 2: Using Terminal
```bash
cd octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## Testing API Endpoints

Once the server is running, test the endpoints using curl:

### 1. Test API Root Endpoint (Lists all available endpoints)
```bash
curl http://localhost:8000/api/
```

### 2. Test Activities Endpoint
```bash
curl http://localhost:8000/api/activities/
```

### 3. Test Users Endpoint
```bash
curl http://localhost:8000/api/users/
```

### 4. Test Teams Endpoint
```bash
curl http://localhost:8000/api/teams/
```

### 5. Test Workouts Endpoint
```bash
curl http://localhost:8000/api/workouts/
```

### 6. Test Leaderboard Endpoint
```bash
curl http://localhost:8000/api/leaderboard/
```

## Codespace URL Testing

When running in GitHub Codespaces, replace `localhost:8000` with your codespace URL:
- Base URL: `https://$CODESPACE_NAME-8000.app.github.dev`
- Example API endpoint: `https://$CODESPACE_NAME-8000.app.github.dev/api/activities/`

## Environment Variables

The application automatically detects:
- `$CODESPACE_NAME` - GitHub Codespaces environment variable for the codespace name
- If `$CODESPACE_NAME` is set, uses HTTPS codespace URL
- If not set, defaults to `http://localhost:8000` for local testing

## Supported Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/` | API root - lists all available endpoints |
| GET/POST | `/api/users/` | User management |
| GET/POST | `/api/teams/` | Team management |
| GET/POST | `/api/activities/` | Activity logging |
| GET/POST | `/api/workouts/` | Workout suggestions |
| GET | `/api/leaderboard/` | Competitive leaderboard |
| GET | `/admin/` | Django admin panel |
