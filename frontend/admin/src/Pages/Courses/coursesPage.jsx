import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import Layout from '../layout';
import { useContext, useEffect, useMemo, useState } from 'react';

import CardCourses from '../../components/Card/CardCourses';
import { SocketContext } from '../../SocketProvider';
import ModalCourses from '../../components/Modals/ModalCourses';
import { useFormik } from 'formik';

const columns = [
    {
        key: "codigodecurso",
        label: "CÓDIGO DE CURSOS",
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
        key: "Modalidad",
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
    codigodecurso: '',
    horario: "",
    facilitador: "",
    Modalidad: '',
    formacion: '',
    monto: '',
    status: "",
}

const CoursesPage = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const [cursos, setCursos] = useState([])
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const { socket } = useContext(SocketContext)

    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues,
        onSubmit: async (values,) => {

            console.log(values)
        }
    })



    useEffect(() => {
        socket.on('courses', (res) => setCursos(...cursos, res))
    }, [cursos, page]);

    const pages = Math.ceil(cursos.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return cursos.slice(start, end);
    }, [page, cursos]);

    return (
        <Layout>
            <div className="p-5 ">
                <div className="bg-white rounded-[5px] shadow-md p-2 w-full gap-2 border-[1px] border-[#C4CEDC]">
                    <h1 className='text-[30px] font-semibold mb-5'>Gestion de Cursos</h1>
                    <CardCourses />
                    <div className="flex justify-end items-center m-2">
                        <Dropdown
                        >
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
                    <ModalCourses isOpen={isModalOpen} onClose={onModalClose} onOpen={onModalOpen} values={values} handleSubmit={handleSubmit} handleChange={handleChange} handleBlur={handleBlur} />
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
                            {(column) => <TableColumn className="text-left bg-[#1F2559] text-white" key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={items}>
                            {(item) => (
                                <TableRow key={item.name}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
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
