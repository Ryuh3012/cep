export const validateCourses = ({ values }) => {

    let errors = {}
    if (!values.codigodecuso) errors.codigodecuso = 'Debes introducir el cursos';
    if (!values.nombrecurso) errors.nombrecurso = 'Debes introducir el nombre del cursos';
    if (!values.duracion) errors.duracion = 'Debes introducir la duracion del curso';
    if (!values.horario) errors.horario = 'Debes introducir el curso'
    if (!values.facilitador) errors.facilitador = 'Debes elejir el facilitador'
    if (!values.modalidad) errors.modalidad = 'Debes elejir la modalidad'
    if (!values.formacion) errors.formacion = 'Debes elejir la '
    if (!values.monto) errors.monto = 'Debes introducir el precio del curso'
    if (!values.status) errors.status = 'Debes elejir el estatus del curso'
    if (!values.contenido) errors.contenido = 'Debes introducir el contenido del curso'
    return errors
}