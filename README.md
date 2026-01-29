## AdVolcano Full Stack

Unified production-ready setup for the AdVolcano marketing site (Vite + React + Tailwind) and the Django 5 backend that powers demo requests, contact workflows, Razorpay payments, and SendGrid automations.

### Repo Structure
- `backend/` – Django project (`payments`) with DRF, Razorpay, SendGrid, Dockerfile, and entrypoint
- `frontend/` – Vite + React marketing experience with lead forms wired to the backend APIs
- `docker-compose.yml` – Production-grade stack (backend API + frontend/Nginx)
- `env.example` – Root environment template consumed by Docker Compose
- `backend/env.example` & `frontend/env.example` – Local-only templates for manual runs
- `deploy/` – (future) infra helpers; current Nginx config lives in `frontend/nginx/default.conf`

### Quick Start (Local)
1. **Clone both repos** (already colocated in this workspace).
2. **Backend**
   ```bash
   cd backend
   cp env.example .env
   python -m venv .venv && .venv\Scripts\activate  # or source .venv/bin/activate on Linux
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
3. **Frontend**
   ```bash
   cd frontend
   cp env.example .env
   npm install
   npm run dev
   ```
4. Visit `http://localhost:5173` (frontend) and `http://localhost:8000/api/health` (backend health endpoints such as `/api/request-demo/`).

### Docker (Prod-like)
1. Duplicate the root `env.example`:
   ```bash
   cp env.example .env
   ```
   - Update **all secrets**, Razorpay keys, and SendGrid credentials.
   - The stack runs on SQLite by default; only set `DATABASE_URL` if you later add an external Postgres instance.
   - Set `VITE_API_BASE_URL` to the public API host (e.g. `https://api.advolcano.io`) so the static build embeds the right endpoint.
2. Build + start everything:
   ```bash
   docker compose up --build -d
   ```
3. Logs & health:
   ```bash
   docker compose logs -f backend
   docker compose logs -f frontend
   ```
4. Stop/remove:
   ```bash
   docker compose down
   ```

### Hostinger VPS Deployment
1. Install Docker & Compose v2 on the VPS.
2. Copy this repo (or pull from GitHub) onto the server.
3. Copy `env.example` to `.env` and fill in:
   - `DJANGO_ALLOWED_HOSTS` → `api.advolcano.io,backend.internal`
   - `DJANGO_CSRF_TRUSTED_ORIGINS` → `https://api.advolcano.io,https://advolcano.io`
   - `VITE_API_BASE_URL` → `https://api.advolcano.io`
   - All Razorpay + SendGrid keys.
4. (Optional) Point DNS:
   - `api.advolcano.io` → VPS public IP (for backend/API + frontend since Nginx proxies both)
   - `advolcano.io` → same IP (serve marketing site + proxy `/api`)
5. On the server:
   ```bash
   docker compose up --build -d
   docker compose exec backend python manage.py createsuperuser  # optional
   ```
6. Configure HTTPS by either:
   - Terminating TLS at Hostinger’s network layer.
   - Adding a reverse-proxy (Caddy/Traefik) in front of this stack that handles Let’s Encrypt certificates and forwards traffic to `frontend:80`.

### Environment Variables (Summary)
| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Optional: external Postgres URL (`postgresql://user:pass@host:5432/db`) |
| `DJANGO_SECRET_KEY` | Production secret key |
| `DJANGO_DEBUG` | `False` in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated hostnames/IPs |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Origins allowed to POST with CSRF protection |
| `DJANGO_CORS_ALLOWED_ORIGINS` | Frontend origins allowed through CORS |
| `SENDGRID_API_KEY`, `ADMIN_EMAIL`, `FROM_EMAIL`, `VERIFIED_SENDER_EMAIL` | Email delivery |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Payment processing |
| `VITE_API_BASE_URL` | API base embedded into the frontend build |
| `BACKEND_PORT`, `FRONTEND_PORT` | Host ports (defaults 8000/8080 for local testing) |

### Data Flows & Forms
- `/api/contact/` – triggered by the new contact form in `Contact.tsx`
- `/api/request-demo/` – triggered by `DemoRequest.tsx`
- `/api/create-payment/` & `/api/payment/verify/` – backend endpoints for Razorpay checkout (client integration to be wired with live keys)

### Logs & Static Files
- Django logs: `backend/logs/django.log` (or `/app/logs` inside the container)
- Collected static assets: `static_volume` (shared between backend + frontend containers)
- Use `docker compose logs backend` to follow SendGrid/Razorpay activity.

### Migrations & Admin Tasks
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

### Useful Next Steps
- Add HTTPS termination (Caddy/Traefik).
- Configure `RAZORPAY_KEY_ID`/`SECRET` with live credentials & wire the frontend checkout experience.
- Plug CI/CD (e.g., GitHub Actions) to build images and deploy to Hostinger automatically.

