export const newPage = async (personas, tipoDePago, montoTotal, referencia, banco, fechaDelPag, titularDeLaCedula, nombreDelTitulante) => {
    const query = {
        text: `INSERT INTO pages( monto,fecha, banco, referencia, nombre, cedula, tipodepagoid, personaid) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING idpage`,
        value: [montoTotal, fechaDelPag, !banco ? null : banco, !referencia ? null : referencia, !nombreDelTitulante ? null : nombreDelTitulante, !titularDeLaCedula ? null : titularDeLaCedula, tipoDePago, personas]
    }
    const { rows } = await connectdb.query(query);
    return rows[0];

}