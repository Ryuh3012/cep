
import { useContext, useEffect, useMemo, useState } from 'react';

import Layout from '../layout';
import { SocketContext } from '../../SocketProvider';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
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
        key: "tipoDeparticipante",
        label: "PARTICIPANTE",
    },
    {
        key: "Apellido",
        label: "APELLIDO",
    },
    {
        key: "nombreCurso",
        label: "CURSOS",
    },
    {
        key: "",
        label: "STATUS",
    },

];
const AsistenciaPage = () => {
    const [cursos, setCursos] = useState([])
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const { socket } = useContext(SocketContext)

    useEffect(() => {
        socket.on('[bag] courses', (res) => setCursos(...cursos, res))
    }, []);

    const pages = Math.ceil(cursos.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return cursos.slice(start, end);
    }, [page, cursos]);

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
        </Layout>
    );

}

export default AsistenciaPage;
