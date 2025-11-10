require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/database');
const User = require('./models/User');
const Vinyl = require('./models/Vinyl');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'vintage-record-secret-key';

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ===== MIDDLEWARE DE AUTENTICACIÓN =====
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }
};

// ===== ENDPOINTS DE AUTENTICACIÓN =====

// POST - Registro de usuario
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El email ya está registrado' });
    }
    
    // Crear nuevo usuario
    const user = new User({ nombre, email, password });
    await user.save();
    
    console.log('✅ POST /api/auth/register - Usuario registrado:', email);
    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente'
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST - Login de usuario
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    
    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
    
    // Generar token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    console.log('✅ POST /api/auth/login - Usuario autenticado:', email);
    res.json({ 
      success: true,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        token
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== ENDPOINTS DE VINILOS =====

// GET - Obtener todos los vinilos
app.get('/api/vinyls', async (req, res) => {
  try {
    const vinyls = await Vinyl.find().sort({ createdAt: -1 });
    console.log('✅ GET /api/vinyls - Vinilos obtenidos:', vinyls.length);
    res.json({ 
      success: true,
      vinyls
    });
  } catch (error) {
    console.error('Error al obtener vinilos:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET - Obtener un vinilo por ID
app.get('/api/vinyls/:id', async (req, res) => {
  try {
    const vinyl = await Vinyl.findById(req.params.id);
    
    if (!vinyl) {
      return res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
    }
    
    console.log(`✅ GET /api/vinyls/${req.params.id} - Vinilo encontrado`);
    res.json({ success: true, vinyl });
  } catch (error) {
    console.error('Error al obtener vinilo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST - Crear nuevo vinilo
app.post('/api/vinyls', async (req, res) => {
  try {
    const { categoria, nombre, precio, stock } = req.body;
    
    const vinyl = new Vinyl({
      categoria,
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    });
    
    await vinyl.save();
    console.log('✅ POST /api/vinyls - Vinilo creado:', vinyl.nombre);
    
    res.status(201).json({ 
      success: true, 
      message: 'Vinilo creado exitosamente',
      vinyl
    });
  } catch (error) {
    console.error('Error al crear vinilo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT - Actualizar vinilo
app.put('/api/vinyls/:id', async (req, res) => {
  try {
    const { categoria, nombre, precio, stock } = req.body;
    
    const vinyl = await Vinyl.findByIdAndUpdate(
      req.params.id,
      { categoria, nombre, precio: parseFloat(precio), stock: parseInt(stock) },
      { new: true, runValidators: true }
    );
    
    if (!vinyl) {
      return res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
    }
    
    console.log(`✅ PUT /api/vinyls/${req.params.id} - Vinilo actualizado`);
    res.json({ 
      success: true, 
      message: 'Vinilo actualizado',
      vinyl
    });
  } catch (error) {
    console.error('Error al actualizar vinilo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE - Eliminar vinilo
app.delete('/api/vinyls/:id', async (req, res) => {
  try {
    const vinyl = await Vinyl.findByIdAndDelete(req.params.id);
    
    if (!vinyl) {
      return res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
    }
    
    console.log(`✅ DELETE /api/vinyls/${req.params.id} - Vinilo eliminado`);
    res.json({ 
      success: true, 
      message: 'Vinilo eliminado',
      vinyl
    });
  } catch (error) {
    console.error('Error al eliminar vinilo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== ENDPOINTS DE CONTACTO =====

// POST - Enviar mensaje de contacto
app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    
    const contact = new Contact({ nombre, email, mensaje });
    await contact.save();
    
    console.log('✅ POST /api/contact - Mensaje recibido:', email);
    
    res.json({ 
      success: true, 
      message: 'Mensaje recibido correctamente',
      data: contact
    });
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET - Obtener mensajes de contacto
app.get('/api/contact', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    console.log('✅ GET /api/contact - Mensajes obtenidos:', messages.length);
    res.json({ 
      success: true,
      messages
    });
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== SEED DATA (Opcional) =====
const seedDatabase = async () => {
  try {
    const count = await Vinyl.countDocuments();
    if (count === 0) {
      const vinyls = [
        { categoria: 'Rock', nombre: 'Classic Rock Collection', precio: 45000, stock: 5 },
        { categoria: 'Pop', nombre: 'Pop Hits 80s', precio: 38000, stock: 8 },
        { categoria: 'Jazz', nombre: 'Jazz Classics', precio: 42000, stock: 3 },
        { categoria: 'Rock', nombre: 'Led Zeppelin IV', precio: 55000, stock: 2 },
        { categoria: 'Jazz', nombre: 'Kind of Blue', precio: 48000, stock: 4 }
      ];
      await Vinyl.insertMany(vinyls);
      console.log('📦 Base de datos inicializada con datos de prueba');
    }
  } catch (error) {
    console.error('Error al inicializar datos:', error);
  }
};

seedDatabase();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/vinyls`);
  console.log(`   GET    /api/vinyls/:id`);
  console.log(`   POST   /api/vinyls`);
  console.log(`   PUT    /api/vinyls/:id`);
  console.log(`   DELETE /api/vinyls/:id`);
  console.log(`   POST   /api/contact`);
  console.log(`   GET    /api/contact`);
});
