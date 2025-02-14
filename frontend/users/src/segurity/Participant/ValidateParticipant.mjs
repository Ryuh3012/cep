export const validateParticipant = ({ values }) => {
    let errors = {}

    values.cedula.toString().replace(/[^0-9]*$/, '')
    values.nombre.replace(/^[A-Za-z]+$/, '')
    values.apellido.replace(/^[A-Za-z]+$/, '')
    values.email.indexOf('@') === -1
    console.log(values.cedula.toString().replace(/[^0-9]*$/, '').length);
    // Validar cédula
    if (values.cedula.toString().replace(/[^0-9]*$/, '').length == 0) errors.cedula = 'Debes Introducir la Cédula'
    if (values.cedula.toString().length < 6 && values.cedula.toString().length > 1) errors.cedula = 'No puede ser menor de los 6 digitos'
    if (values.cedula.toString().length > 9) errors.cedula = 'No puede ser mayor de los 9 digitos'

    // Validar nombre
    if (values.nombre.length == 0) errors.nombre = 'Debes Introducir el Nombre'
    if (values.nombre.replace(/^[A-Za-z]+$/, '')) errors.nombre = 'No puede introducir numeros'

    // Validar apellido
    if (values.apellido.length == 0) errors.apellido = 'Debes Introducir el Apellido'
    if (values.apellido.replace(/^[A-Za-z]+$/, '')) errors.apellido = 'No puede introducir numeros'

    // Validar email
    if (values.email.length == 0) errors.email = 'Debes Introducir el Correo'

    // Validar teléfono
    if (values.telefono.length == 0) errors.telefono = 'Debes Introducir el Telefono'
    if (/[^0-9]/.test(values.telefono)) errors.telefono = 'No puede introducir letras ni caracteres especiales'

    // Validar tipo de participante
    if (values.tipoDeParticipante.length == 0) errors.tipoDeParticipante = 'Debes Elegir el Tipo de Participante'

    // Validar cursos
    if (values.cursos.length == 0) errors.cursos = 'Indique el curso deseado'

    // Validar tipo de pago
    if (values.tipoDePago.length == 0) errors.tipoDePago = 'Indique el Tipo de Pago'

    // Validar monto total
    if (values.montoTotal.length == 0) errors.montoTotal = 'Debe Introducir el Monto total'
    if (/[^0-9.]/.test(values.montoTotal)) errors.montoTotal = 'El monto total debe ser un número válido';

    return errors

}