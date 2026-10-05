import { Router } from "express";
import { loginHttp, logoutHttp, getMeHttp } from "../controllers/auth.mjs";
import { verifyAdmin, verifyUser, verifyTokenMiddleware } from "../middlewares/authMiddleware.mjs";

const router = Router();

/**
 * 🔐 Ruta pública: Inicio de sesión
 * POST http://localhost:3000/auth o http://localhost:3000/auth/login
 */
router.post("/", loginHttp);
router.post("/auth", loginHttp);
router.post("/login", loginHttp);

/**
 * 🚪 Ruta pública: Cerrar sesión (destruye la cookie HttpOnly)
 * POST http://localhost:3000/auth/logout
 */
router.post("/logout", logoutHttp);

/**
 * 🔄 Ruta protegida: Verificar estado de la sesión actual
 * GET http://localhost:3000/auth/validate
 * 
 * Explicación del flujo:
 * 1. Pasa por 'verifyTokenMiddleware' para leer la cookie y validar el JWT.
 * 2. Si todo está bien, responde al frontend confirmando que la sesión sigue activa.
 */
router.get("/validate", verifyTokenMiddleware, (req, res) => {
    return res.status(200).json({
        active: true,
        message: "Sesión activa y válida ✅",
        user: {
            idUsuario: req.idUsuario,
            usuario: req.usuario,
            rolId: req.rolId,
            nombre: req.nombre,
        }
    });
});

router.get("/me", verifyTokenMiddleware, getMeHttp);

/**
 * 🛡️ Ruta protegida: Exclusivo para Administrador General (Rol ID: 1)
 * GET http://localhost:3000/auth/admin-dashboard
 */
router.get("/admin-dashboard", verifyTokenMiddleware, verifyAdmin, (req, res) => {
    return res.status(200).json({
        message: "¡Bienvenido al panel de control de Administrador General! 👑",
        idUsuario: req.idUsuario,
        usuario: req.usuario,
        rolId: req.rolId,
    });
});

/**
 * 🛡️ Ruta protegida: Acceso mixto para Administrador (1) y Personal de Caja (2)
 * GET http://localhost:3000/auth/caja-dashboard
 */
router.get("/caja-dashboard", verifyTokenMiddleware, verifyUser, (req, res) => {
    return res.status(200).json({
        message: "¡Acceso autorizado para módulo de caja y operaciones! 💳",
        idUsuario: req.idUsuario,
        usuario: req.usuario,
        rolId: req.rolId,
    });
});

export default router;

