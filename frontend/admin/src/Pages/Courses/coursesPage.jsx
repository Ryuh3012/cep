import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, getKeyValue, Pagination, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import Layout from '../layout';
import { useContext, useEffect, useMemo, useState } from 'react';

import CardCourses from '../../components/Card/CardCourses';
import { SocketContext } from '../../SocketProvider';
import ModalCourses from '../../components/Modals/ModalCourses';
import { useFormik } from 'formik';
import { validateCourses } from '../../security/courses/ValidateCourses.mjs';

const columns = [
    {
        key: "cursos",
        label: "CURSOS",
    },

    {
        key: "horario",
        label: "HORARIO",
    },
    {
        key: "facilitador",
        label: "FACILITADORES",
    },
    {
        key: "modalidad",
        label: "MODALIDAD",
    },
    {
        key: "formacion",
        label: "FORMACIÓN",
    },
    {
        key: "monto",
        label: "PRECIO",
    },
    {
        key: "status",
        label: "ESTATUS",
    }
];

const initialValues = {
    codigodecuso: '', nombrecurso: '', duracion: '', horario: "", monto: '', contenido: '', status: '', facilitador: '', modalidad: '', formacion: ''
}

const CoursesPage = () => {

    const rowsPerPage = 5;
    const { socket } = useContext(SocketContext)
    const [cursos, setCursos] = useState([])
    const [messag, setMessag] = useState(null);
    const [Error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        socket.on('[bag] courses', (res) => setCursos(res))
    }, []);


    const pages = Math.ceil(cursos.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return cursos.slice(start, end);
    }, [page, cursos])
    console.log(cursos)

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();



    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues,
        validate: (values) => validateCourses({ values }),
        onSubmit: async (values, { resetForm }) => {
            try {
                socket.emit('[bag] addCourse', values, {})

                setMessag("Curso creado adecuadamente")
                setTimeout(() => {
                    setMessag(null)
                    return resetForm()
                }, 3000);

            } catch (error) {
                console.log(error)
                setError('No se pudo crear el curso, faltaron datos')
                setTimeout(() => {
                    setMessag(null)
                    return resetForm()
                }, 3000);
            }

        },
    })

    return (
        <Layout>
            {messag ?
                <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-success-700 dark:text-success bg-success-50">
                    <p>{messag}</p>
                </div>
                : null}
            <div className="p-5 ">
                <div className="bg-white rounded-[5px] shadow-md p-2 w-full gap-2 border-[1px] border-[#C4CEDC]">
                    <h1 className='text-[30px] font-semibold mb-5'>Gestion de Cursos</h1>
                    <CardCourses />
                    <div className="flex justify-end items-center m-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered">Open Menu</Button>
                            </DropdownTrigger>
                            <DropdownMenu onAction={(key) => {
                                if (key === "nuevo") {
                                    onModalOpen();
                                }
                            }}>
                                <DropdownItem key="nuevo">new</DropdownItem>
                                <DropdownItem key="copy">Copy link</DropdownItem>
                                <DropdownItem key="edit">Edit file</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <ModalCourses isOpen={isModalOpen} onClose={onModalClose} onOpen={onModalOpen} values={values} handleSubmit={handleSubmit} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} />
                    <Table
                        shadow="none"
                        aria-label="Example table with client side pagination"
                        bottomContent={
                            pages > 0 ? (
                                <div className="flex w-full justify-center">
                                    <Pagination
                                        isCompact
                                        showControls
                                        showShadow
                                        page={page}
                                        total={pages}
                                        onChange={(page) => setPage(page)}
                                    />
                                </div>
                            ) : null
                        }
                        classNames={{
                            wrapper: "min-h-[222px]",

                        }}
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn className="text-left bg-[#1F2559] text-white" key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={items}>
                            {
                                cursos?.map(user => (
                                    <TableRow key={user._id}>

                                        {(columnKey) => {
                                            // if (columnKey === 'edit') return <TableCell><ModalCases data={data} close={info} isOpen={setInfo} /></TableCell>
                                            return <TableCell>{getKeyValue(user, columnKey)}</TableCell>
                                        }}


                                    </TableRow>
                                ))

                            }
                        </TableBody>
                    </Table>

                </div>
            </div>
        </Layout >
    );
}

export default CoursesPage;
