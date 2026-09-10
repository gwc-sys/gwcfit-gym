# Developer login

The owner site is connected to the PulseFit FastAPI backend.

## Run locally

From the repository root, start the backend:

```powershell
docker compose up -d
```

Then start the owner site:

```powershell
cd pulsefit-owner-site
npm install
npm run dev
```

Open `http://localhost:5173` and select **Developer login**. Vite proxies `/api` to `http://127.0.0.1:8000` in development.

## Create the application owner

The UI calls this a developer login. Its backend authorization role is `super_admin`, representing the trusted application owner. With an empty database, bootstrap that account using:

```powershell
docker exec -it gym_application-api-1 python -m app.scripts.create_super_admin --email owner@yourcompany.com --name "Application Owner"
```

Only `super_admin` accounts are accepted. Gym owners, trainers, receptionists, sub-admins, and members are rejected.

## Edit public subscriptions

After signing in, use **Developer controls → Subscription plans**. The application owner can change plan names, descriptions, prices, billing periods, member limits, feature lists, CTA labels, trial days, the popular badge, visibility, and display order. Saving updates the backend and refreshes the public pricing cards immediately. Leaving the price blank displays **Custom**.

## Gym sales workflow

1. A prospective gym submits **Start your free month**. The inquiry is persisted in `gym_inquiries`.
2. The application owner sees it under **Gyms, trials and inquiries** after Developer login.
3. **Invite gym owner** creates a secure, email-bound, one-time invitation. Copy it or use **Email invitation**.
4. The owner registers using that token. Only then are the gym and owner account created.
5. Registration converts the inquiry and automatically starts the selected plan's free trial.
6. The developer gym list shows owner/contact details, user/member/trainer counts, plan, status, and trial end date. The developer can change the gym plan or subscription state.

## Production API

The default API path is same-origin `/api/v1`. For separate production origins, configure:

```env
VITE_API_URL=https://api.example.com/api/v1
VITE_APP_URL=https://app.example.com
```
