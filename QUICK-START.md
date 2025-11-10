# 🚀 Quick Start Guide - Vintage Record

## Estructura de Carpetas

```
├── backend/   → Express API (Puerto 3000)
└── frontend/  → Angular App (Puerto 4200)
```

## Inicio Rápido (2 comandos)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```
✅ Backend corriendo en `http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```
✅ Angular corriendo en `http://localhost:4200`

## Probar Funcionalidades

### 1. Navegación (Angular Router)
- `/inicio` - Página principal
- `/registro` - Formulario de registro
- `/login` - Login
- `/perfil` - **Conecta con backend** (POST /api/contact)
- `/dashboard` - **Conecta con backend** (GET /api/vinyls)

### 2. Componentes Personalizados
- **NavbarComponent**: Barra de navegación
- **RegistroComponent**: Registro de usuarios
- **PerfilComponent**: Perfil + formulario de contacto

### 3. Servicio HTTP
- **VinylService**: Gestiona llamadas HTTP
  - `getVinyls()` → GET /api/vinyls
  - `sendContactForm()` → POST /api/contact

## Endpoints Backend

```javascript
GET  /api/vinyls   → Lista de vinilos
POST /api/contact  → Enviar mensaje
```

## Verificación

### Backend funcionando:
```bash
curl http://localhost:3000/api/vinyls
```

### Angular funcionando:
Abre `http://localhost:4200` en el navegador

### Probar integración:
1. Ir a `http://localhost:4200/perfil`
2. Llenar formulario
3. Click "Enviar Mensaje"
4. Ver consola del backend para el mensaje recibido

## Variables de Entorno

### Backend (.env)
```
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
```

### Angular (environment.ts)
```typescript
apiUrl: 'http://localhost:3000/api'
```

## Troubleshooting

❌ **Error CORS**: Asegúrate que el backend esté corriendo
❌ **Puerto ocupado**: Cambia el puerto en .env
❌ **npm install falla**: Prueba `npm install --legacy-peer-deps`

## Características Implementadas

✅ Angular Router con 5 rutas
✅ 3 componentes personalizados
✅ 1 servicio HTTP con HttpClient
✅ Backend Express con 2 endpoints
✅ Integración frontend-backend funcional
✅ Manejo de errores y loading states

---

**¿Todo listo?** Si ambos servidores están corriendo, la app está completamente funcional. 🎉
