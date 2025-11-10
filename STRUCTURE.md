# 📂 Project Structure - Vintage Record

## Final Clean Structure

```
Vintage-Record-main/
│
├── backend/                    # Express.js API
│   ├── server.js              # Main server
│   ├── package.json           # Backend dependencies
│   ├── .env                   # Environment variables
│   ├── .env.example           # Environment template
│   └── README.md              # Backend documentation
│
├── frontend/                   # Angular 17 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── inicio/        # Home component
│   │   │   ├── login/         # Login component
│   │   │   ├── registro/      # Register component ✨
│   │   │   ├── perfil/        # Profile component ✨
│   │   │   ├── dashboard/     # Dashboard component
│   │   │   ├── navbar/        # Navbar component ✨
│   │   │   ├── services/      # HTTP services
│   │   │   │   └── vinyl.service.ts  # API calls ✨
│   │   │   ├── app.component.*
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/
│   │   │   └── environment.ts
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json           # Angular dependencies
│   ├── README.md              # Frontend documentation
│   └── COMPONENTS-SERVICES.md # Components/Services details
│
├── .gitignore                 # Git ignore rules
├── README.md                  # Main documentation
├── QUICK-START.md            # Quick setup guide
├── PROJECT-STATUS.md         # Original project status
└── STRUCTURE.md              # This file

✨ = Custom created components/services
```

## Key Features by Folder

### `/backend`
- Express.js REST API
- CORS enabled for Angular
- 2 endpoints: `/api/vinyls`, `/api/contact`
- Environment variables support

### `/frontend`
- Angular 17 SPA
- 5 routed views
- 3 custom components (Navbar, Registro, Perfil)
- 1 HTTP service (VinylService)
- HttpClient integration with backend
- Bootstrap 5.3.3 styling

## Port Allocation

| Service  | Port | URL                      |
|----------|------|--------------------------|
| Backend  | 3000 | http://localhost:3000    |
| Frontend | 4200 | http://localhost:4200    |

## Quick Commands

```bash
# Start everything (2 terminals)

# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm start
```

## Removed Files

The following were removed/consolidated:
- Old `/frontend` folder (HTML/CSS/JS static files)
- `frontend-angular` renamed to `frontend`
- Cleaner 2-folder structure

## Documentation Files

- **README.md** - Main project documentation
- **QUICK-START.md** - Fast setup guide
- **STRUCTURE.md** - This file (project structure)
- **backend/README.md** - Backend specific docs
- **frontend/README.md** - Frontend specific docs
- **frontend/COMPONENTS-SERVICES.md** - Components/Services details
