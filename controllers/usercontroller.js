
const { Usuario } = require('../models');

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
