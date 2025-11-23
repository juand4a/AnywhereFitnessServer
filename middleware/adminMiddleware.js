// middleware/adminMiddleware.js
module.exports = (req, res, next) => {
    // Verifica si el usuario existe en la solicitud Y si su rol es 'admin'
    if (req.user && req.user.rol === 'admin') {
        // El usuario es un administrador, permite que continúe a la siguiente función (el controlador)
        next();
    } else {
        // Si no es admin, denegar el acceso.
        return res.status(403).json({ 
            message: 'Acceso denegado. Se requiere el rol de Administrador.' 
        });
    }
};