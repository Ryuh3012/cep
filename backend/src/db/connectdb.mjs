import pkg from "pg";
import { dbName, dbPassword, dbPort, dbUrl, dbUser } from "../config/config.mjs";
const { Pool } = pkg;

export const connectdb = new Pool({
    host: dbUrl,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: dbPort,
    max: 20, // Límite máximo de conexiones simultáneas en el pool
    idleTimeoutMillis: 30000, // Cierra clientes inactivos después de 30 segundos
    connectionTimeoutMillis: 5000, // Falla rápido (5s) en lugar de colgarse indefinidamente
});

// Manejo de errores en clientes inactivos (evita que un error de red tumbe el proceso)
connectdb.on('error', (err) => {
    console.error('[PostgreSQL] Error inesperado en cliente inactivo del pool:', err);
});

// Verificación inicial de conexión
connectdb.connect((err, client, release) => {
    if (err) {
        return console.error('[PostgreSQL] Error al conectar con la base de datos:', err.message);
    }
    client.query('SELECT NOW()', (queryErr) => {
        release();
        if (queryErr) {
            return console.error('[PostgreSQL] Error al ejecutar consulta de prueba:', queryErr.message);
        }
        console.log('[PostgreSQL] Conexión a la base de datos establecida correctamente.');
    });
});
