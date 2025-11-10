# 🎵 Vintage Record - Full Stack Application

![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple?style=for-the-badge&logo=bootstrap)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)

## 📖 Descripción

**Vintage Record** es una aplicación full-stack para una tienda especializada en vinilos, discos retro y equipos clásicos ubicada en Chapinero, Bogotá, Colombia.

## 📁 Estructura del Proyecto

```
Vintage-Record-main/
│
├── backend/            # Express.js API REST
│   ├── server.js      # Servidor principal
│   ├── package.json   # Dependencias backend
│   └── .env           # Variables de entorno
│
└── frontend/          # Angular 17 App
    ├── src/
    │   ├── app/
    │   │   ├── navbar/    # NavbarComponent
    │   │   ├── registro/  # RegistroComponent
    │   │   ├── perfil/    # PerfilComponent
    │   │   ├── services/  # VinylService (HttpClient)
    │   │   └── ...
    │   └── environments/
    └── package.json
```

## ✨ Características Implementadas

### Angular Frontend
- ✅ **Angular Router**: Navegación entre 5 vistas (Inicio, Registro, Login, Perfil, Dashboard)
- ✅ **3 Componentes Personalizados**: NavbarComponent, RegistroComponent, PerfilComponent
- ✅ **HttpClient Service**: VinylService para comunicación con backend
- ✅ **Formularios Reactivos**: Two-way binding con FormsModule
- ✅ **Estados de Carga**: Spinners y manejo de errores
- ✅ **Diseño Responsivo**: Bootstrap 5.3.3

### Express Backend
- ✅ **API REST**: Endpoints para vinilos y contacto
- ✅ **CORS configurado**: Permite peticiones desde Angular
- ✅ **Variables de entorno**: Configuración con .env

### Integración
- ✅ **Frontend consume Backend**: HttpClient conecta a Express
- ✅ **Manejo de errores**: Feedback visual al usuario

## 🚀 Tecnologías

### Frontend Angular
- **Angular 17**: Framework SPA
- **TypeScript**: Tipado estático
- **RxJS**: Observables para HTTP
- **Bootstrap 5.3.3**: Estilos
- **FormsModule**: Formularios

### Backend
- **Node.js + Express**: API REST
- **CORS**: Cross-origin
- **dotenv**: Variables de entorno

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

## 🛠️ Instalación y Uso

### Requisitos Previos
- **Node.js 18+** y npm
- **Angular CLI** (opcional): `npm install -g @angular/cli`

### Instalación Rápida

```bash
# Clonar repositorio
cd Vintage-Record-main

# Backend
cd backend
npm install
npm run dev
# ✅ Backend en http://localhost:3000

# Frontend Angular (nueva terminal)
cd ../frontend
npm install
npm start
# ✅ Angular en http://localhost:4200
```

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

## 🚧 Próximas Mejoras

- [ ] Backend para procesamiento real de formularios
- [ ] Base de datos de productos
- [ ] Carrito de compras
- [ ] Sistema de búsqueda
- [ ] Integración con pasarelas de pago
- [ ] Panel de administración
- [ ] API REST
- [ ] Sistema de autenticación de usuarios
- [ ] Blog de noticias musicales
- [ ] Integración con redes sociales

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

### Consideraciones Técnicas
- **No hay backend**: Los formularios se manejan con localStorage
- **Imágenes externas**: Actualmente usa URLs de CDN
- **Sin framework JS**: JavaScript vanilla para mejor rendimiento
- **Bootstrap CDN**: No requiere instalación local

### Buenas Prácticas Implementadas
- ✅ Código modular y organizado
- ✅ Comentarios descriptivos
- ✅ Nombres de variables en español para consistencia
- ✅ Manejo de errores
- ✅ Validación de entrada de usuario
- ✅ Accesibilidad básica
- ✅ Responsive design

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

**Desarrollado con ❤️ para los amantes del vinilo**

🎵 *"La música suena mejor en vinilo"* 🎵
