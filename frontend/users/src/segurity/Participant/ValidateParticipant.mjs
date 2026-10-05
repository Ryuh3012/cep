export const validateParticipant = ({ values }) => {
    const errors = {};

    // 1. Validar Cédula
    const cedulaStr = String(values.cedula || '').trim();
    if (!cedulaStr) {
        errors.cedula = 'Debes introducir la cédula';
    } else if (!/^\d{6,9}$/.test(cedulaStr)) {
        errors.cedula = 'La cédula debe contener entre 6 y 9 dígitos numéricos';
    }

    // 2. Validar Nombre (admite tildes, diéresis, ñ y espacios)
    const nombre = String(values.nombre || '').trim();
    if (!nombre) {
        errors.nombre = 'Debes introducir el nombre';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre)) {
        errors.nombre = 'El nombre solo puede contener letras y espacios';
    }

    // 3. Validar Apellido (admite tildes, diéresis, ñ y espacios)
    const apellido = String(values.apellido || '').trim();
    if (!apellido) {
        errors.apellido = 'Debes introducir el apellido';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(apellido)) {
        errors.apellido = 'El apellido solo puede contener letras y espacios';
    }

    // 4. Validar Correo Electrónico
    const email = String(values.email || '').trim();
    if (!email) {
        errors.email = 'Debes introducir el correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Introduce un formato de correo válido (ej: usuario@correo.com)';
    }

    // 5. Validar Teléfono (permite dígitos, espacios, guiones y prefijo +)
    const telefono = String(values.telefono || '').trim();
    if (!telefono) {
        errors.telefono = 'Debes introducir el teléfono de contacto';
    } else if (!/^[\d\s+\-()]{7,16}$/.test(telefono)) {
        errors.telefono = 'Introduce un teléfono válido (al menos 7 dígitos)';
    }

    // 6. Validar Tipo de Participante
    if (!values.tipoDeParticipante) {
        errors.tipoDeParticipante = 'Debes seleccionar el tipo de participante';
    }

    // 7. Validar Curso seleccionado
    if (!values.cursos) {
        errors.cursos = 'Indica el curso que deseas inscribir';
    }

    // 8. Validar Tipo de Pago
    if (!values.tipoDePago) {
        errors.tipoDePago = 'Indica la forma de pago';
    }

    // 9. Validar Monto Total
    const monto = String(values.montoTotal || '').trim();
    if (!monto) {
        errors.montoTotal = 'Debe introducir el monto total';
    } else if (isNaN(Number(monto)) || Number(monto) <= 0) {
        errors.montoTotal = 'El monto total debe ser un número mayor a cero';
    }

    // 10. Validaciones adicionales si es transferencia bancaria
    if (values.tipoDePago === 'Transferencia Bancaria') {
        if (!values.banco) errors.banco = 'Seleccione el banco emisor';
        if (!values.referencia) errors.referencia = 'Indique el número de referencia';
    }

    return errors;
};