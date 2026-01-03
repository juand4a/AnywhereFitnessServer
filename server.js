// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes'); // 👈 NUEVO
const userRoutes = require('./routes/userRoutes');
const routineRoutes = require("./routes/routineRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', onboardingRoutes); // 👈 NUEVO  (/api/users/:id/onboarding)
app.use('/api/user', userRoutes);
app.use("/routine", routineRoutes);

// Sincronización con la BD
sequelize.sync()
  .then(() => console.log('✅ Conectado a MySQL y sincronizado'))
  .catch(err => console.error('❌ Error al conectar con la BD:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
