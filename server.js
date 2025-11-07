// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/auth', authRoutes);

// Sincronización con la BD
sequelize.sync()
  .then(() => console.log('✅ Conectado a MySQL y sincronizado'))
  .catch(err => console.error('❌ Error al conectar con la BD:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
