# ElderGuard — Patient Monitoring Dashboard

A full-stack web application for doctors and nurses to monitor elderly patients' vital signs and health status in real time.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Radix UI, Lucide Icons |
| Charts | Recharts |
| State | Zustand (UI), TanStack Query v5 (server state) |
| Realtime | Socket.io-client (prepared) |
| Backend | FastAPI (Python) |
| Database | PostgreSQL via SQLAlchemy |
| Auth | JWT (python-jose + passlib) |

## Project Structure

```
pka-elder-guard-web-app/
├── backend/                  # FastAPI application
│   ├── api/
│   │   └── endpoints/        # Route handlers (auth, ...)
│   ├── core/                 # Config, security helpers
│   ├── crud/                 # Database CRUD operations
│   ├── db/                   # SQLAlchemy engine & base
│   ├── models/               # ORM models
│   ├── schemas/              # Pydantic schemas
│   ├── services/             # Business logic
│   ├── main.py               # FastAPI app entry point
│   └── requirements.txt
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── dashboard/    # Main dashboard
│   │   │   ├── patients/     # Patient list
│   │   │   ├── messages/     # Internal messaging
│   │   │   └── settings/     # User settings
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities & mock data
│   │   └── types/            # TypeScript type definitions
│   └── package.json
└── plans/                    # Architecture & design plans
```

## Prerequisites

- **Node.js** >= 18
- **Python** >= 3.10
- **PostgreSQL** >= 14

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd pka-elder-guard-web-app
```

### 2. Backend setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env            # then edit .env with your values
```

**Required `.env` variables:**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/elderguard
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API_BASE_URL=https://jeane-unubiquitous-superprecariously.ngrok-free.dev/PKA_ElderGuard
```

You can also copy the prepared template:

```bash
copy .env.example .env
```

**Run the backend:**

```bash
uvicorn main:app --reload
```

If you run the backend locally with `uvicorn`, the dev server is available at `http://localhost:8000`
Interactive docs are available at `http://localhost:8000/docs`

### Backend URL config

Backend now uses a single URL variable:

```env
API_BASE_URL=https://jeane-unubiquitous-superprecariously.ngrok-free.dev/PKA_ElderGuard
```

How it is used:

- The path part is used as the FastAPI API prefix.
- The full URL is published into the OpenAPI `servers` config.
- Mobile should point to the same value via its own `API_BASE_URL`.

Current default public URL:

```text
https://jeane-unubiquitous-superprecariously.ngrok-free.dev/PKA_ElderGuard
```

If you later move to another public domain:

1. Edit `backend/.env` and change `API_BASE_URL` to the new public URL.
2. Restart the backend process.
3. Run the mobile app with `--dart-define=API_BASE_URL=<new-public-url>`.
4. Re-test `POST /geofences` and `POST /events`.

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.local.example .env.local   # then edit if needed
```

**Run the frontend:**

```bash
npm run dev
```

App available at `http://localhost:3000`

## Available Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Vitals overview, patient stats, health trend charts |
| `/patients` | Patient list with filtering, pagination, and activity log |
| `/messages` | Internal messaging between staff |
| `/settings` | Profile, notifications, security, appearance, alert thresholds |

## API Endpoints

Base prefix: derived from `API_BASE_URL`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/PKA_ElderGuard/auth/register` | Register a new account |
| `POST` | `/PKA_ElderGuard/auth/login` | Login and receive JWT token |
| `POST` | `/PKA_ElderGuard/geofences` | Create or update a geofence by `device_id` |
| `POST` | `/PKA_ElderGuard/events` | Receive camera event payloads |

### Geofence payload

Request:

```json
{
  "device_id": "mobile-123",
  "anchor_latitude": 10.776889,
  "anchor_longitude": 106.700806,
  "radius_meters": 150
}
```

Response:

```json
{
  "status": "created",
  "geofence": {
    "id": 1,
    "device_id": "mobile-123",
    "anchor_latitude": 10.776889,
    "anchor_longitude": 106.700806,
    "radius_meters": 150,
    "created_at": "2026-04-07T09:30:00",
    "updated_at": "2026-04-07T09:30:00"
  }
}
```

### Event payload

Request:

```json
{
  "camera_id": 3,
  "timestamp": "2026-04-10T19:30:00",
  "event_type": "fall_detected",
  "confidence": 0.97,
  "url": "https://server.example/videos/events/123.mp4"
}
```

Push behavior:

- The visible notification text stays human-readable, for example `Phát hiện té ngã tại camera 3`.
- The backend forwards structured metadata in OneSignal `data`.
- If `url` is present in the request, the backend includes it as `data.url` instead of appending the link to the notification body.
- Mobile can use `data.url` as a deep link or external URL target when the user taps the notification.

## Development Notes

- The frontend currently uses **mock data** (`src/lib/mock-*.ts`) — no live API calls are made yet.
- Socket.io-client is installed and ready for real-time vitals integration.
- The `frontend/` directory has its own `.gitignore` (auto-generated by `create-next-app`). The root `.gitignore` covers Python/backend rules.

## Scripts

**Frontend:**

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

**Backend:**

```bash
uvicorn main:app --reload          # Development
uvicorn main:app --host 0.0.0.0    # Production
```

## License

See [LICENSE](./LICENSE).
