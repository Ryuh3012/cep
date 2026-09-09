import { connectdb } from "../db/connectdb.mjs";

export const auth = async ({ cedula, password, personas, rol }) => {

    const query = {
        text: `insert into usuarios(cedula, password, roleid,personaid)
        values($1, $2, $3, $4)
        RETURNING idusuario
        `,
        values: [cedula, password, rol, personas]
    }

    const { rows } = await connectdb.query(query)

    return rows[0];
}

export const findOneByAuth = async (cedula) => {
    try {
        const query = {
            text: `SELECT 
                    usuarios.idusuario,
                    usuarios.password,
                    usuarios.roleid,
                    personas.idpersona,
                    personas.cedula,
                    personas.nombre,
                    personas.apellido,
                    personas.email,
                    COALESCE(roles.rol, 'Operador') AS rol_nombre
                   FROM usuarios 
                   INNER JOIN personas ON usuarios.personaid = personas.idpersona
                   LEFT JOIN roles ON usuarios.roleid = roles.idrole
                   WHERE personas.cedula = $1;`,
            values: [String(cedula).trim()]
        };

        const { rows } = await connectdb.query(query);
        return rows[0] || null;
    } catch (error) {
        console.error("Error en findOneByAuth:", error);
        return null;
    }
};
