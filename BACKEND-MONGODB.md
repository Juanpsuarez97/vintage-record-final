# 🗄️ Backend con MongoDB

## Qué se agregó

**Dependencias nuevas:**
- `mongoose` - Para conectar con MongoDB
- `bcryptjs` - Para hashear contraseñas
- `jsonwebtoken` - Para los tokens JWT

### 2. Estructura de Modelos Creada

```
backend/
├── config/
│   └── database.js         # ✅ Conexión a MongoDB
├── models/
│   ├── User.js            # ✅ Modelo de Usuario (auth)
│   ├── Vinyl.js           # ✅ Modelo de Vinilo (CRUD)
│   └── Contact.js         # ✅ Modelo de Contacto
└── server.js              # ✅ Actualizado con MongoDB
```

### 3. Modelos Implementados

#### User Model (`models/User.js`)
```javascript
{
  nombre: String (required),
  email: String (required, unique),
  password: String (required, hashed con bcrypt),
  createdAt: Date
}

// Métodos:
- pre('save') → Hash automático de password
- comparePassword(password) → Comparar contraseñas
```

#### Vinyl Model (`models/Vinyl.js`)
```javascript
{
  categoria: String (required, enum),
  nombre: String (required),
  precio: Number (required, min: 0),
  stock: Number (required, min: 0),
  createdAt: Date
}
```

#### Contact Model (`models/Contact.js`)
```javascript
{
  nombre: String (required),
  email: String (required),
  mensaje: String (required),
  createdAt: Date
}
```

### 4. Database Configuration (`config/database.js`)

```javascript
const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB conectado');
};
```

### 5. Endpoints Actualizados

#### Nuevos Endpoints de Autenticación:
```javascript
POST /api/auth/register  // Registrar usuario en MongoDB
POST /api/auth/login     // Login con JWT
```

#### Endpoints CRUD (ahora con MongoDB):
```javascript
GET    /api/vinyls      // Obtener de MongoDB
GET    /api/vinyls/:id  // Obtener por ID de MongoDB
POST   /api/vinyls      // Guardar en MongoDB
PUT    /api/vinyls/:id  // Actualizar en MongoDB
DELETE /api/vinyls/:id  // Eliminar de MongoDB
```

#### Endpoints de Contacto (ahora con MongoDB):
```javascript
POST /api/contact  // Guardar mensaje en MongoDB
GET  /api/contact  // Obtener mensajes de MongoDB
```

### 6. Características de Seguridad

✅ **Password Hashing:**
```javascript
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
});
```

✅ **JWT Generation:**
```javascript
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
```

✅ **Auth Middleware (preparado):**
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.userId = decoded.id;
  next();
};
```

### 7. Seed Data Automático

```javascript
const seedDatabase = async () => {
  const count = await Vinyl.countDocuments();
  if (count === 0) {
    // Inserta 5 vinilos de prueba automáticamente
    await Vinyl.insertMany([...]);
  }
};
```

### 8. Variables de Entorno Actualizadas

**`.env.example`:**
```env
PORT=3000
FRONTEND_URL=http://localhost:4200

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vintage-record

# O MongoDB Atlas
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vintage-record

# JWT Secret
JWT_SECRET=vintage-record-secret-key-change-in-production
```

## 🔄 Migración de In-Memory a MongoDB

### Antes (In-Memory):
```javascript
let vinyls = [
  { id: 1, categoria: 'Rock', nombre: 'Classic Rock' }
];

app.get('/api/vinyls', (req, res) => {
  res.json({ vinyls });
});
```

### Después (MongoDB):
```javascript
app.get('/api/vinyls', async (req, res) => {
  const vinyls = await Vinyl.find().sort({ createdAt: -1 });
  res.json({ success: true, vinyls });
});
```

## 📊 Comparación

| Característica | Antes (In-Memory) | Ahora (MongoDB) |
|----------------|-------------------|-----------------|
| **Persistencia** | ❌ Se pierde al reiniciar | ✅ Permanente |
| **Usuarios** | ❌ Simulado | ✅ Real con bcrypt |
| **Autenticación** | ❌ Fake token | ✅ JWT real |
| **Validaciones** | ❌ Mínimas | ✅ Schema validation |
| **IDs** | ❌ Numéricos simples | ✅ MongoDB ObjectId |
| **Escalabilidad** | ❌ Limitada | ✅ Lista para producción |
| **Consultas** | ❌ Básicas | ✅ Mongoose queries |

## 🧪 Probar MongoDB Backend

### 1. Instalar MongoDB (macOS)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### 2. Instalar Dependencias
```bash
cd backend
npm install
```

### 3. Configurar Variables
```bash
cp .env.example .env
# Editar .env si es necesario
```

### 4. Iniciar Backend
```bash
npm run dev
```

**Salida esperada:**
```
✅ MongoDB conectado: localhost
📦 Base de datos inicializada con datos de prueba
🚀 Server running on http://localhost:3000
📊 Endpoints disponibles:
   POST   /api/auth/register
   POST   /api/auth/login
   GET    /api/vinyls
   ...
```

### 5. Verificar MongoDB
```bash
# Conectar a MongoDB Shell
mongosh

# Usar la base de datos
use vintage-record

# Ver colecciones
show collections
# Output: contacts, users, vinyls

# Ver vinilos
db.vinyls.find().pretty()

# Ver usuarios
db.users.find().pretty()
```

### 6. Registrar Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@test.com","password":"123456"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
```

### 7. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.com","password":"123456"}'
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@test.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 8. CRUD de Vinilos

**Obtener todos:**
```bash
curl http://localhost:3000/api/vinyls
```

**Crear:**
```bash
curl -X POST http://localhost:3000/api/vinyls \
  -H "Content-Type: application/json" \
  -d '{"categoria":"Rock","nombre":"Abbey Road","precio":65000,"stock":3}'
```

**Actualizar:**
```bash
curl -X PUT http://localhost:3000/api/vinyls/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"categoria":"Rock","nombre":"Abbey Road Remaster","precio":70000,"stock":5}'
```

**Eliminar:**
```bash
curl -X DELETE http://localhost:3000/api/vinyls/507f1f77bcf86cd799439011
```

## 📚 Documentación Adicional

Consultar archivos:
- `backend/README.md` - Guía completa del backend
- `QUICK-START.md` - Inicio rápido actualizado
- `EVIDENCIA-REQUERIMIENTOS.md` - Evidencia de implementación

## ✅ Listo

El backend ya tiene:
- MongoDB conectado (guarda datos de verdad)
- JWT para autenticación
- CRUD completo de vinilos
- 9 endpoints funcionando
- Seed automático con 5 vinilos de ejemplo

Funciona con MongoDB local o puedes usar MongoDB Atlas (en la nube).
