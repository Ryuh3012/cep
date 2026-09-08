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
        const cleanCedula = String(cedula).trim();
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
                    CASE 
                        WHEN usuarios.roleid = 1 THEN 'Administrador'
                        WHEN usuarios.roleid = 2 THEN 'Cajero / Operador'
                        ELSE 'Operador'
                    END AS rol_nombre
                   FROM usuarios 
                   INNER JOIN personas ON usuarios.personaid = personas.idpersona
                   WHERE personas.cedula = $1;`,
            values: [cleanCedula]
        };

        const { rows } = await connectdb.query(query);
        if (rows && rows.length > 0) return rows[0];

        return null;
    } catch (error) {
        console.error("Error en findOneByAuth:", error);
        return null;
    }
};
