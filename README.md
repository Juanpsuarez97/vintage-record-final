# 🎵 Vintage Record - Proyecto Full Stack

![Angular](https://img.shields.io/badge/Angular-17-red?style=flat-square&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=flat-square&logo=bootstrap)

## 📖 Descripción

Proyecto de una tienda de vinilos retro con frontend Angular y backend Node.js + MongoDB. 

Incluye todo lo pedido en el curso: routing, componentes, servicios, formularios reactivos, autenticación con JWT y CRUD completo.

## 📁 Estructura del Proyecto

```
Vintage-Record-main/
│
├── backend/                # Express + MongoDB API
│   ├── config/
│   │   └── database.js    # Configuración MongoDB
│   ├── models/
│   │   ├── User.js        # Modelo Usuario (auth)
│   │   ├── Vinyl.js       # Modelo Vinilo (CRUD)
│   │   └── Contact.js     # Modelo Contacto
│   ├── server.js          # Servidor Express
│   ├── package.json       # Dependencias backend
│   └── .env               # Variables de entorno
│
└── frontend/              # Angular 17 SPA
    ├── src/app/
    │   ├── components/
    │   │   ├── navbar/        # NavbarComponent
    │   │   ├── registro/      # RegistroComponent
    │   │   ├── perfil/        # PerfilComponent
    │   │   ├── login/         # LoginComponent
    │   │   └── dashboard/     # DashboardComponent (CRUD)
    │   ├── services/
    │   │   ├── auth.service.ts   # Autenticación + localStorage
    │   │   └── vinyl.service.ts  # HTTP CRUD operations
    │   ├── guards/
    │   │   └── auth.guard.ts     # Protección de rutas
    │   └── environments/
    └── package.json
```

## ✨ Lo que tiene el proyecto

### Frontend (Angular)
- Router con 5 páginas
- Componentes: Navbar, Login, Registro, Perfil, Dashboard
- Servicios con HttpClient (AuthService y VinylService)
- Formularios reactivos con validaciones
- AuthGuard para proteger rutas
- Bootstrap para el diseño

### Backend (Node + Express + MongoDB)
- 9 endpoints REST (auth, CRUD de vinilos, contacto)
- MongoDB con Mongoose (3 modelos)
- Autenticación con JWT y bcrypt
- CRUD completo que funciona
- Seed automático con datos de prueba

### Funcionalidades
- Login/Registro con JWT
- Crear, editar y eliminar vinilos
- Formularios con validaciones
- LocalStorage para la sesión
- Todo conectado frontend-backend

## 🛠️ Tecnologías usadas

**Frontend:** Angular 17, TypeScript, Bootstrap 5, RxJS

**Backend:** Node.js, Express, MongoDB, Mongoose

**Autenticación:** JWT + bcrypt

**Otros:** CORS, dotenv

## 📁 Estructura del Proyecto

```
Vintage-Record-main/
│
├── index.html          # Página principal con servicios y contacto
├── galeria.html        # Galería de vinilos por categoría
├── detalle.html        # Página de detalle de producto
├── sobre.html          # Página "Sobre Nosotros" con historia y equipo
├── style.css           # Estilos globales del sitio
├── script.js           # Funcionalidad JavaScript
└── README.md           # Documentación del proyecto
```

## 🎯 Páginas del Sitio

### 1. **Página Principal** (`index.html`)
- Sección de bienvenida con imágenes destacadas
- Información sobre la tienda
- Tarjetas de servicios (venta, restauración, equipos)
- Formulario de contacto funcional
- Información de ubicación y horarios

### 2. **Galería** (`galeria.html`)
- Categorías de vinilos: Rock, Pop, Jazz
- Imágenes uniformes con efectos hover
- Diseño de cuadrícula responsivo

### 3. **Detalle** (`detalle.html`)
- Vista ampliada de producto
- Información del artista y descripción
- Navegación de regreso a galería

### 4. **Sobre Nosotros** (`sobre.html`)
- Historia de la empresa con línea de tiempo
- Valores corporativos
- Perfiles del equipo
- Call-to-action

## 🚀 Cómo correr el proyecto

**Necesitas:**
- Node.js y npm
- MongoDB instalado y corriendo

**Pasos:**

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env
npm run dev
# Corre en http://localhost:3000

# 2. Frontend (otra terminal)
cd frontend
npm install
npm start
# Corre en http://localhost:4200
```

Listo! Abre http://localhost:4200 en el navegador.

## 💡 Funcionalidades JavaScript

### 1. Scroll Suave
```javascript
// Navegación suave entre secciones
initSmoothScroll();
```

### 2. Animaciones Fade-in
```javascript
// Elementos aparecen al hacer scroll
initFadeAnimations();
```

### 3. Validación de Formularios
```javascript
// Validación en tiempo real
// - Email válido
// - Campos obligatorios
// - Longitud mínima
initContactForm();
```

### 4. Funciones de Utilidad
```javascript
// Ver envíos de formularios (consola)
getFormSubmissions();

// Limpiar envíos almacenados
clearFormSubmissions();
```

## 🎨 Personalización

### Cambiar Colores
Editar variables en `style.css`:
```css
/* Color dorado principal */
#c9a227

/* Color de fondo oscuro */
#121212

/* Color de acento amarillo */
#ffc107
```

### Agregar Nuevos Vinilos
Editar `galeria.html`:
```html
<div class="col-md-4 mb-4 gallery-item">
  <p class="gallery-title">Título de Categoría</p>
  <img class="gallery-img" src="URL_IMAGEN" alt="Descripción">
</div>
```

### Modificar Información de Contacto
Editar sección de contacto en `index.html`:
```html
<li><i class="bi bi-geo-alt-fill"></i> Tu Dirección</li>
<li><i class="bi bi-telephone-fill"></i> Tu Teléfono</li>
<li><i class="bi bi-envelope-fill"></i> Tu Email</li>
```

## 📱 Compatibilidad

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome    | 90+            |
| Firefox   | 88+            |
| Safari    | 14+            |
| Edge      | 90+            |

## 🔍 SEO y Meta Tags

Cada página incluye:
- Meta charset UTF-8
- Meta viewport para responsividad
- Títulos descriptivos únicos
- Estructura semántica HTML5

## 📊 Análisis de Formularios

Los envíos del formulario se guardan en `localStorage` del navegador:

```javascript
// Ver todos los envíos
console.log(getFormSubmissions());

// Ejemplo de salida:
[
  {
    nombre: "Juan Pérez",
    email: "juan@example.com",
    mensaje: "Me interesan los vinilos de jazz",
    timestamp: "2025-11-10T21:45:00.000Z"
  }
]
```

## ✅ Qué funciona

**Backend:**
- API REST con 9 endpoints
- MongoDB con 3 modelos (User, Vinyl, Contact)
- Login/Registro con JWT + bcrypt
- CRUD completo de vinilos

**Frontend:**
- Angular con 5 páginas
- Login, registro, protección de rutas (AuthGuard)
- Dashboard para crear/editar/borrar vinilos
- Formularios con validaciones
- LocalStorage para la sesión

**Todo conectado:**
- Frontend llama al backend con HttpClient
- Manejo de errores con mensajes
- Spinners mientras carga
- Diseño responsive con Bootstrap

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Notas

- MongoDB guarda los datos permanentemente (no se pierden al reiniciar)
- JWT con expiración de 7 días
- Las contraseñas se hashean con bcrypt
- Seed automático pone 5 vinilos de ejemplo al iniciar
- Funciona con MongoDB local o Atlas (nube)

## 📧 Contacto

**Vintage Record**
- 📍 Calle 45 #22-10, Chapinero, Bogotá, Colombia
- 📞 +57 320 123 4567
- 📧 contacto@vintagerecord.com
- 📷 Instagram: [@vintagerecord_co](https://instagram.com/vintagerecord_co)

**Horario:**
Lunes a Sábado: 9:00 AM - 7:00 PM

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

---

**Proyecto de curso - Full Stack con Angular + Node.js + MongoDB**

Todo funciona y está documentado. Si algo no corre, revisa que MongoDB esté prendido y que hayas hecho `npm install` en ambas carpetas.
