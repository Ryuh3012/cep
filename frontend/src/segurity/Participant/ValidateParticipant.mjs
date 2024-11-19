export const validateParticipant = ( {values} ) => {
    let errors = {}

    values.cedula.toString().replace(/[^0-9]*$/, '')

    if (values.cedula.length == 0) errors.cedula = 'Debes Introducir la Cédula'

    if (values.nombre.length == 0) errors.nombre = 'Debes Introducir el Nombre'

    if (values.apellido.length == 0) errors.apellido = 'Debes Introducir el Apellido'
    if (values.email.length == 0) errors.email = 'Debes Introducir el Correo'
    if (values.telefono.length == 0) errors.telefono = 'Debes Introducir el Telefono'
    if (values.tipoDeParticipante.length == 0) errors.tipoDeParticipante = 'Debes Elegir el Tipo de Participante'
    if (values.cursos.length == 0) errors.cursos = 'Indique el curso deseado'
    if (values.tipoDePago.length == 0) errors.tipoDePago = 'Indique el Tipo de Pago'
    if (values.montoTotal.length == 0) errors.montoTotal = 'Debe Introducir el Monto total'

    return errors

}