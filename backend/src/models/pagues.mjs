import { connectdb } from "../db/connectdb.mjs";

export const newPayments = async ({
    persona,
    tipoDePago,
    montoTotal,
    referencia,
    banco,
    fechaDelPag,
    titularDeLaCedula,
    nombreDelTitulante,
}) => {
    try {
        const fecha = fechaDelPag ? fechaDelPag : null;
        const bancoNombre = banco ? banco : null;
        const referenciaPago = referencia ? referencia : null;
        const cedulaTitular = titularDeLaCedula ? titularDeLaCedula : null;
        const nombreTitular = nombreDelTitulante ? nombreDelTitulante : null;

        const query = {
            text: `INSERT INTO pagos(monto, fecha, banco, referencia, nombre, cedula, tipodepagoid, personaid)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING idpago;`,
            values: [
                parseFloat(montoTotal),
                fecha,
                bancoNombre,
                referenciaPago,
                nombreTitular,
                cedulaTitular,
                tipoDePago,
                persona,
            ],
        };

        const { rows } = await connectdb.query(query);
        const newPaymentId = rows[0].idpago;
        return newPaymentId;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePayments = async ({ person, montoTotal }) => {

    const query = {
        text: `UPDATE pagos  SET monto = $1 WHERE  personaid= $2 RETURNING idpage`,
        values: [montoTotal, person]
    }
    const { rows } = await connectdb.query(query);
    return rows[0];
}