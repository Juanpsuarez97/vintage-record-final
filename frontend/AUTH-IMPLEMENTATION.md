# ✅ Autenticación y LocalStorage - Implementado

## AuthService Creado

**Archivo:** `/frontend/src/app/services/auth.service.ts`

### Funcionalidades:

#### 1. Login y Almacenamiento
```typescript
login(email, password) {
  // Simula backend
  // Crea objeto User con token
  // ✅ Guarda en localStorage
  localStorage.setItem('currentUser', JSON.stringify(user));
}
```

#### 2. Recuperación de Usuario
```typescript
// Observable que emite cambios de autenticación
currentUser: Observable<User | null>

// Obtener usuario actual
currentUserValue: User | null

// Verifica si está autenticado
isAuthenticated(): boolean

// Obtiene token
getToken(): string | null
```

#### 3. Logout
```typescript
logout() {
  // ✅ Remueve de localStorage
  localStorage.removeItem('currentUser');
  // Redirige a login
}
```

## AuthGuard Implementado

**Archivo:** `/frontend/src/app/guards/auth.guard.ts`

### Protección de Rutas:
```typescript
canActivate() {
  if (authenticated) return true;
  // Redirige a /login con returnUrl
  router.navigate(['/login'], { 
    queryParams: { returnUrl } 
  });
}
```

### Rutas Protegidas:
- ✅ `/perfil` - Solo usuarios autenticados
- ✅ `/dashboard` - Solo usuarios autenticados

## Componentes Actualizados

### LoginComponent
- ✅ Usa AuthService.login()
- ✅ Guarda token en localStorage
- ✅ Redirige según returnUrl
- ✅ Previene acceso si ya autenticado

### NavbarComponent
- ✅ Muestra nombre del usuario autenticado
- ✅ Dropdown con opciones (Perfil, Logout)
- ✅ Links condicionales (Login/Registro vs Perfil/Dashboard)
- ✅ Suscripción a currentUser observable

### PerfilComponent
- ✅ Obtiene datos del usuario desde localStorage
- ✅ Pre-llena formulario con info del usuario
- ✅ Muestra nombre y email recuperados

## Flujo de Autenticación

1. **Login**:
   - Usuario ingresa credenciales
   - AuthService valida y crea token
   - Guarda en localStorage
   - Emite nuevo usuario en observable
   - Redirige a dashboard o returnUrl

2. **Acceso a Ruta Protegida**:
   - AuthGuard verifica autenticación
   - Si no autenticado: redirige a /login
   - Guarda URL de destino en queryParams

3. **Navegación**:
   - Navbar se actualiza automáticamente
   - Muestra opciones según estado de auth

4. **Logout**:
   - Remueve datos de localStorage
   - Emite null en observable
   - Navbar se actualiza
   - Redirige a /login

## Datos Almacenados en LocalStorage

```json
{
  "id": "1",
  "nombre": "Juan Pérez",
  "email": "test@test.com",
  "token": "fake-jwt-token-1699..."
}
```

**Key:** `currentUser`

## Credenciales de Prueba

- **Email:** test@test.com
- **Password:** 123456

## Verificación

### Consola del navegador:
```javascript
// Ver datos almacenados
localStorage.getItem('currentUser')

// Ver token
JSON.parse(localStorage.getItem('currentUser')).token
```

### Pruebas:
1. Ir a `/dashboard` sin login → Redirige a `/login`
2. Login exitoso → Guarda en localStorage
3. Navbar muestra nombre del usuario
4. `/perfil` muestra datos del usuario
5. Logout → Limpia localStorage

## Características Implementadas

✅ AuthService con BehaviorSubject  
✅ LocalStorage para persistencia  
✅ AuthGuard para proteger rutas  
✅ Recuperación de usuario al cargar app  
✅ Navbar reactivo al estado de auth  
✅ ReturnUrl para redirección post-login  
✅ Logout con limpieza completa  
✅ Prevención de doble login  
