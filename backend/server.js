require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos simulada en memoria
let vinyls = [
  { id: 1, categoria: 'Rock', nombre: 'Classic Rock Collection', precio: 45000, stock: 5 },
  { id: 2, categoria: 'Pop', nombre: 'Pop Hits 80s', precio: 38000, stock: 8 },
  { id: 3, categoria: 'Jazz', nombre: 'Jazz Classics', precio: 42000, stock: 3 },
  { id: 4, categoria: 'Rock', nombre: 'Led Zeppelin IV', precio: 55000, stock: 2 },
  { id: 5, categoria: 'Jazz', nombre: 'Kind of Blue', precio: 48000, stock: 4 }
];

let contactMessages = [];

// ===== ENDPOINTS =====

// GET - Obtener todos los vinilos
app.get('/api/vinyls', (req, res) => {
  console.log('✅ GET /api/vinyls - Vinilos obtenidos');
  res.json({ 
    success: true,
    vinyls: vinyls 
  });
});

// GET - Obtener un vinilo por ID
app.get('/api/vinyls/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const vinyl = vinyls.find(v => v.id === id);
  
  if (vinyl) {
    console.log(`✅ GET /api/vinyls/${id} - Vinilo encontrado`);
    res.json({ success: true, vinyl });
  } else {
    res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
  }
});

// POST - Crear nuevo vinilo
app.post('/api/vinyls', (req, res) => {
  const { categoria, nombre, precio, stock } = req.body;
  
  const newVinyl = {
    id: vinyls.length + 1,
    categoria,
    nombre,
    precio: parseFloat(precio),
    stock: parseInt(stock)
  };
  
  vinyls.push(newVinyl);
  console.log('✅ POST /api/vinyls - Vinilo creado:', newVinyl);
  
  res.status(201).json({ 
    success: true, 
    message: 'Vinilo creado exitosamente',
    vinyl: newVinyl 
  });
});

// PUT - Actualizar vinilo
app.put('/api/vinyls/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { categoria, nombre, precio, stock } = req.body;
  
  const index = vinyls.findIndex(v => v.id === id);
  
  if (index !== -1) {
    vinyls[index] = { 
      id, 
      categoria, 
      nombre, 
      precio: parseFloat(precio), 
      stock: parseInt(stock) 
    };
    console.log(`✅ PUT /api/vinyls/${id} - Vinilo actualizado`);
    res.json({ 
      success: true, 
      message: 'Vinilo actualizado',
      vinyl: vinyls[index] 
    });
  } else {
    res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
  }
});

// DELETE - Eliminar vinilo
app.delete('/api/vinyls/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = vinyls.findIndex(v => v.id === id);
  
  if (index !== -1) {
    const deleted = vinyls.splice(index, 1);
    console.log(`✅ DELETE /api/vinyls/${id} - Vinilo eliminado`);
    res.json({ 
      success: true, 
      message: 'Vinilo eliminado',
      vinyl: deleted[0] 
    });
  } else {
    res.status(404).json({ success: false, message: 'Vinilo no encontrado' });
  }
});

// POST - Enviar mensaje de contacto
app.post('/api/contact', (req, res) => {
  const { nombre, email, mensaje } = req.body;
  
  const newMessage = {
    id: contactMessages.length + 1,
    nombre,
    email,
    mensaje,
    fecha: new Date().toISOString()
  };
  
  contactMessages.push(newMessage);
  console.log('✅ POST /api/contact - Mensaje recibido:', newMessage);
  
  res.json({ 
    success: true, 
    message: 'Mensaje recibido correctamente',
    data: newMessage
  });
});

// GET - Obtener mensajes de contacto
app.get('/api/contact', (req, res) => {
  console.log('✅ GET /api/contact - Mensajes obtenidos');
  res.json({ 
    success: true,
    messages: contactMessages 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   GET    /api/vinyls`);
  console.log(`   GET    /api/vinyls/:id`);
  console.log(`   POST   /api/vinyls`);
  console.log(`   PUT    /api/vinyls/:id`);
  console.log(`   DELETE /api/vinyls/:id`);
  console.log(`   POST   /api/contact`);
  console.log(`   GET    /api/contact`);
});
