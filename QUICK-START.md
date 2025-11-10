# 🚀 Guía Rápida

## Qué necesitas

- Node.js
- MongoDB (si no lo tienes: `brew install mongodb-community`)

## Carpetas

```
├── backend/   → API con Express + MongoDB
└── frontend/  → App Angular
```

## Correr todo

### Terminal 1 - Backend
```bash
cd backend
npm install
cp .env.example .env  # Crear archivo de configuración
npm run dev
```
✅ Backend corriendo en `http://localhost:3000`
✅ MongoDB conectado automáticamente
✅ Datos de prueba cargados

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```
✅ Angular corriendo en `http://localhost:4200`

## 🧪 Probar

Abre http://localhost:4200

**Para probar todo:**
1. Regístrate en `/registro`
2. Haz login en `/login`
3. Ve al `/dashboard` para crear/editar/borrar vinilos
4. Revisa `/perfil` para ver tus datos

Todo se guarda en MongoDB.

## 📡 Endpoints Backend

### Autenticación
```javascript
POST /api/auth/register  → Registrar usuario
POST /api/auth/login     → Login (devuelve JWT)
```

### Vinilos (CRUD)
```javascript
GET    /api/vinyls      → Obtener todos
GET    /api/vinyls/:id  → Obtener por ID
POST   /api/vinyls      → Crear nuevo
PUT    /api/vinyls/:id  → Actualizar
DELETE /api/vinyls/:id  → Eliminar
```

### Contacto
```javascript
POST /api/contact  → Enviar mensaje
GET  /api/contact  → Obtener mensajes
```

## ✅ Verificación

### 1. Backend funcionando:
```bash
curl http://localhost:3000/api/vinyls
```
Debería devolver JSON con 5 vinilos

### 2. MongoDB conectado:
```bash
mongosh
use vintage-record
db.vinyls.find()
```

### 3. Registrar usuario:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","email":"test@test.com","password":"123456"}'
```

### 4. Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

## ⚙️ Variables de Entorno

### Backend (.env)
```env
PORT=3000
FRONTEND_URL=http://localhost:4200

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/vintage-record

# O MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vintage-record

# JWT Secret
JWT_SECRET=tu-secret-key-super-segura
```

### Frontend (environment.ts)
```typescript
apiUrl: 'http://localhost:3000/api'
```

## 🚨 Troubleshooting

### MongoDB no conecta
```bash
# Verificar instalación
mongod --version

# Iniciar MongoDB
brew services start mongodb-community

# O manualmente
mongod --dbpath ~/data/db
```

### Puerto ocupado
Cambiar `PORT` en `.env` a otro puerto (ej: 3001)

### Error de módulos
```bash
cd backend
rm -rf node_modules
npm install
```

### CORS Error
Asegúrate que el backend esté corriendo en puerto 3000

## ✨ Características Implementadas

### Backend
✅ Express + Node.js
✅ MongoDB con Mongoose
✅ Autenticación JWT
✅ Hash de contraseñas (bcrypt)
✅ CRUD completo de vinilos
✅ Modelos: User, Vinyl, Contact
✅ Seed data automático

### Frontend
✅ Angular 17 con TypeScript
✅ Angular Router (5 rutas)
✅ AuthGuard para rutas protegidas
✅ 3+ componentes personalizados
✅ 2 servicios (AuthService, VinylService)
✅ Formularios reactivos con validaciones
✅ LocalStorage para persistencia
✅ HttpClient para API calls
✅ CRUD completo con UI
✅ Bootstrap 5 + diseño responsivo

---

**¡Todo listo!** 🎉

Si ambos servidores están corriendo y MongoDB conectado, la aplicación está completamente funcional con base de datos real.
