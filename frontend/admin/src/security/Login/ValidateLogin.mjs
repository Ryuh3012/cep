export const loginValidate = ({ values }) => {
    let errors = {}

    values.cedula.toString().replace(/[^0-9]*$/, '')

    if (values.cedula.length === 0) errors.cedula = 'Debes introducir la cédula'
    if (values.cedula.length < 7) errors.cedula = 'La cédula debe tener al menos 7 dígitos'
    if (values.cedula.length > 10) errors.cedula = 'La cédula no puede tener más de 10 dígitos'
    if(values.cedula.length > 0 && !/^[0-9]+$/.test(values.cedula)) errors.cedula = 'La cédula solo puede contener números'


    
    if (values.password.length === 0) errors.password = 'Debes introducir la contraseña'

    return errors

}