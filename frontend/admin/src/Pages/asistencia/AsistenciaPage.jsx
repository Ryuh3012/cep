
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import Layout from '../layout';
import { SocketContext } from '../../SocketProvider';
import { Chip, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@heroui/react';
import CardCourses from '../../components/Card/CardCourses';
const columns = [
    {
        key: "cedula",
        label: "CEDULA",
    },
    {
        key: "nombre",
        label: "NOMBRE",
    },

    {
        key: "apellido",
        label: "APELLIDO",
    },
    {
        key: "participante",
        label: "PARTICIPANTE",
    },
    {
        key: "nombrecurso",
        label: "CURSOS",
    },
    {
        key: "saldo_pendiente",
        label: "STATUS",
    },

];

const AsistenciaPage = () => {

    const { socket } = useContext(SocketContext);
    const [studen, setStuden] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;


    useEffect(() => {
        socket.emit('[bag] Studen', () => { }, (listAllcourses) => setStuden(JSON.parse(listAllcourses)))
        return () => {
            socket.off('[bag] Studen')
        }
    }, [socket])

    const pages = Math.ceil(studen.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return studen.slice(start, end);
    }, [page, studen]);
    const statusOpen = (status) => {
        if (status == 'Completo') return 'success';
        if (status == 'Pendiente') return 'warning'
    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "nombre":
                return user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1)
            case "apellido":
                return user.apellido.charAt(0).toUpperCase() + user.apellido.slice(1)
            case "saldo_pendiente":
                return (
                    <Chip className="capitalize" color={statusOpen(user.saldo_pendiente)} variant="flat">
                        {cellValue}
                    </Chip>
                );

            default:
                return cellValue;
        }
    }, []);

    return (
        <Layout>
            <div className="p-10 flex flex-col gap-6">
                <div className="bg-white rounded-[5px] shadow-md p-5 w-full border-[1px] border-[#C4CEDC]">
                    <h1 className='text-[30px] font-semibold mb-5'>Gestion de Estudiantes</h1>
                    <CardCourses />
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
        </Layout>
    );

}

export default AsistenciaPage;
