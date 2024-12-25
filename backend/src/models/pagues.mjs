import { connectdb } from "../db/connectdb.mjs";

export const newPayments = async (personas, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante) => {
    const query = {
        text: `INSERT INTO pagos( monto,fecha, banco, referencia, nombre, cedula, tipodepagoid, personaid) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING idpage`,
        value: [montoTotal, fechaDelPag, !banco ? null : banco, !referencia ? null : referencia, !nombreDelTitulante ? null : nombreDelTitulante, !titularDeLaCedula ? null : titularDeLaCedula, tipoDePago, personas]
    }
    const { rows } = await connectdb.query(query);
    return rows[0];

}

export const updatePayments = async ({ person, montoTotal }) => {

    const query = {
        text: `UPDATE pagos  SET monto = $1 WHERE  personaid= $2 RETURNING idpage`,
        values: [montoTotal, person]
    }
    const { rows } = await connectdb.query(query);
    return rows[0];
}