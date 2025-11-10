# Backend - Vintage Record

API REST para la tienda Vintage Record con MongoDB, autenticación JWT y CRUD completo.

## 🚀 Stack Tecnológico

- **Node.js** + **Express** - Servidor HTTP
- **MongoDB** + **Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación con tokens
- **Bcrypt** - Hash de contraseñas
- **CORS** - Peticiones cross-origin

## 📋 Prerequisitos

Antes de instalar, asegúrate de tener:

1. **Node.js** (v14 o superior)
2. **MongoDB** instalado y corriendo

### Instalar MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Descargar desde [mongodb.com](https://www.mongodb.com/try/download/community)

**Opción Cloud (MongoDB Atlas):**
Crear cuenta gratuita en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## 📦 Instalación

```bash
cd backend
npm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Edita `.env` con tus configuraciones:

```env
PORT=3000
FRONTEND_URL=http://localhost:4200

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/vintage-record

# O MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/vintage-record

# JWT Secret (cambiar en producción)
JWT_SECRET=tu-secret-key-super-segura
```

## 🎯 Ejecución

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor iniciará en `http://localhost:3000`

## 📊 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | `{ nombre, email, password }` |
| POST | `/api/auth/login` | Login de usuario | `{ email, password }` |

**Ejemplo de Response Login:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Vinilos (CRUD Completo)

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/api/vinyls` | Obtener todos los vinilos | - |
| GET | `/api/vinyls/:id` | Obtener vinilo por ID | - |
| POST | `/api/vinyls` | Crear nuevo vinilo | `{ categoria, nombre, precio, stock }` |
| PUT | `/api/vinyls/:id` | Actualizar vinilo | `{ categoria, nombre, precio, stock }` |
| DELETE | `/api/vinyls/:id` | Eliminar vinilo | - |

**Ejemplo de Vinilo:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "categoria": "Rock",
  "nombre": "Led Zeppelin IV",
  "precio": 55000,
  "stock": 5,
  "createdAt": "2024-01-10T10:30:00.000Z"
}
```

### Contacto

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| POST | `/api/contact` | Enviar mensaje | `{ nombre, email, mensaje }` |
| GET | `/api/contact` | Obtener mensajes | - |

## 🗃️ Modelos de Datos

### User
```javascript
{
  nombre: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Vinyl
```javascript
{
  categoria: String (required, enum),
  nombre: String (required),
  precio: Number (required, min: 0),
  stock: Number (required, min: 0),
  createdAt: Date
}
```

### Contact
```javascript
{
  nombre: String (required),
  email: String (required),
  mensaje: String (required),
  createdAt: Date
}
```

## 🔐 Autenticación JWT

Para endpoints protegidos, incluir token en headers:

```bash
Authorization: Bearer <token>
```

**Ejemplo con fetch:**
```javascript
fetch('http://localhost:3000/api/vinyls', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## 🧪 Probar API

### Con cURL

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test User","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Obtener vinilos
curl http://localhost:3000/api/vinyls
```

### Con Postman o Thunder Client

1. Importar colección de endpoints
2. Registrar usuario en `/api/auth/register`
3. Login en `/api/auth/login` y copiar token
4. Usar token en headers para endpoints protegidos

## 📦 Datos de Prueba

Al iniciar por primera vez, el servidor carga automáticamente 5 vinilos de prueba.

## 🔍 Verificar MongoDB

```bash
# Conectar a MongoDB Shell
mongo

# Usar base de datos
use vintage-record

# Ver colecciones
show collections

# Ver vinilos
db.vinyls.find().pretty()

# Ver usuarios
db.users.find().pretty()
```

## 📝 Estructura del Proyecto

```
backend/
├── config/
│   └── database.js      # Configuración de MongoDB
├── models/
│   ├── User.js          # Modelo de Usuario
│   ├── Vinyl.js         # Modelo de Vinilo
│   └── Contact.js       # Modelo de Contacto
├── server.js            # Servidor Express principal
├── package.json         # Dependencias
├── .env                 # Variables de entorno (no subir a git)
└── .env.example         # Ejemplo de configuración
```

## 🚨 Solución de Problemas

### MongoDB no conecta

```bash
# Verificar que MongoDB está corriendo
mongod --version

# Iniciar MongoDB
mongosh
```

### Puerto 3000 ocupado

Cambiar `PORT` en `.env` a otro puerto (ej: 3001)

### Error de módulos

```bash
rm -rf node_modules
npm install
```

## 📚 Documentación Adicional

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
