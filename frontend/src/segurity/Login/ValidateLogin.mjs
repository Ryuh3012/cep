export const loginValidate = ({ values }) => {
    let errors = {}

    values.cedula.toString().replace(/[^0-9]*$/, '')

    if (values.cedula.length === 0) errors.cedula = 'Debes introducir la cédula'
    if (values.password.length === 0) errors.password = 'Debes introducir la contraseña'

    return errors

}