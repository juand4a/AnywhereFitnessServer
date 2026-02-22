
const { Usuario,OnboardingProfile,OnboardingDay } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        // Buscar todos los usuarios, EXCLUYENDO campos sensibles
        const users = await Usuario.findAll({
            attributes: { 
                exclude: ['password', 'createdAt', 'updatedAt'] 
            }
        });

        return res.status(200).json({
            message: `Se encontraron ${users.length} usuarios.`,
            users: users,
        });

    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos el usuario incluyendo su perfil de onboarding y sus días
        const user = await Usuario.findByPk(id, {
            attributes: { 
                exclude: ['password'] // Siempre protegemos la contraseña
            },
            include: [
                {
                    model: OnboardingProfile,
                    attributes: ['goal', 'experience', 'location', 'frequency_per_week', 'injuries', 'notes']
                },
                {
                    model: OnboardingDay,
                    attributes: ['day_code']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Mapeamos los días para que lleguen como un array simple: ["lun", "mar", "mie"]
        const diasEntrenamiento = user.OnboardingDays 
            ? user.OnboardingDays.map(d => d.day_code) 
            : [];

        // Estructuramos la respuesta para que el Frontend (ProfileScreen) la consuma directo
        const response = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            celular: user.celular,
            peso: user.peso,
            altura: user.altura,
            tipo_plan: user.tipo_plan,
            onboarded: user.onboarded,
            // Datos del OnboardingProfile
            objetivo: user.OnboardingProfile?.goal || 'No definido',
            experiencia: user.OnboardingProfile?.experience || 'No definida',
            frecuencia: user.OnboardingProfile?.frequency_per_week || 0,
            ubicacion: user.OnboardingProfile?.location || 'No definida',
            lesiones: user.OnboardingProfile?.injuries || 'Ninguna',
            notas: user.OnboardingProfile?.notes || '',
            // Array de días
            dias: diasEntrenamiento.join(', ') // "lun, mar, mie"
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error('Error al obtener perfil completo:', error);
        res.status(500).json({ 
            message: 'Error en el servidor', 
            error: error.message 
        });
    }
};