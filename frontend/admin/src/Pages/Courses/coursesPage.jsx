import { Button, Card, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, getKeyValue, Pagination, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@heroui/react';
import Layout from '../layout';
import { useContext, useEffect, useMemo, useState } from 'react';

import CardCourses from '../../components/Card/CardCourses';
import { SocketContext } from '../../SocketProvider';
import ModalCourses from '../../components/Modals/ModalCourses';
import { useFormik } from 'formik';
import { validateCourses } from '../../security/courses/ValidateCourses.mjs';
import { useCallback } from 'react';
import ModalEdit from '../../components/Modals/ModalEdit';

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
    },
    {
        key: "actions",
        label: "ACIONES",
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
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        socket.emit('[bag] courses', () => { }, (listAllcourses) => setCursos(JSON.parse(listAllcourses)))
        return () => {
            socket.off('[bag] courses')
        }
    }, [socket])


    const pages = Math.ceil(cursos.length / rowsPerPage);


    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return cursos.slice(start, end)
    }, [page, cursos]);


    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();



    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues,
        validate: (values) => validateCourses({ values }),
        onSubmit: async (values, { resetForm }) => {

            try {
                socket.emit('[bag] addCourse', values, {})
                setCursos([...cursos, values])
                setMessag("Curso creado adecuadamente")
                setTimeout(() => {
                    setMessag(null)
                    return resetForm()
                }, 3000);
            } catch (error) {
                console.log(error)
            }
        }
    })
    const statusOpen = (status) => {
        if (status == 'Activo') return 'warning';
        if (status == 'Proceso') return 'primary'
        if (status == 'Completados') return 'success'

    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "status":
                return (
                    <Chip className="capitalize" color={statusOpen(user.status)} variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                {/* <ModalEdit user={user} /> */}
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ModalEdit
                                    item={user}
                                    onClose={() => setOpenModal(false)}
                                    isOpen={openModal}
                                    values={values}
                                    handleSubmit={() => handleSubmit(values, {}, true)}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    touched={touched}
                                ></ModalEdit>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            {/* <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                            </span> */}
                        </Tooltip>
                    </div>
                );

            default:
                return cellValue.charAt(0).toUpperCase() + cellValue.slice(1);

        }
    }, []);

    return (
        <Layout>
            {messag ?
                <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-success-700 dark:text-success bg-success-50">
                    <p>{messag}</p>
                </div>
                : null}
            {Error ?
                <div className="flex flex-col w-full justify-center items-center py-1 pl-4 text-danger-600 bg-danger-50 ">
                    <p>{Error}</p>
                </div>
                : null}
            <div className="p-5 flex flex-col gap-6">
                <div className="bg-white rounded-[5px] shadow-md p-2 w-full gap-2 border-[1px] border-[#C4CEDC] ">
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
                                <DropdownItem key="nuevo">Nuevo Curso</DropdownItem>
                                {/* <DropdownItem key="copy">Copy link</DropdownItem>
                                <DropdownItem key="edit">Edit file</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                    Delete file
                                </DropdownItem> */}
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
                                        color="secondary"
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
                            {(column) => <TableColumn className="text-left bg-[#1F2559] text-white px-3" key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={items}>
                            {(item) => (
                                <TableRow key={item}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </Layout >
    );
}

export default CoursesPage;
