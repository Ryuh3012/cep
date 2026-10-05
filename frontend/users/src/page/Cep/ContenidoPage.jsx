
import { useEffect, useState, useContext, useMemo } from "react";
import { Button, Card, CardBody, Image, Skeleton, Input } from "@nextui-org/react";
import LayoutDashboard from "../LayoutDashboard";
import { SocketContext } from "../../SocketProvider";
import ModalCourses from "../../components/Info/modalCourses";

// Imágenes temáticas según el curso
import CiscoImg from "../../assets/cisco1.png";
import CiscoImg2 from "../../assets/cisco2.png";
import DisenoImg from "../../assets/diseno.jpg";
import DiscoImg from "../../assets/disco.jpg";
import DisenowebImg from "../../assets/disenoweb.jpg";
import ExcelImg from "../../assets/excel.jpg";
import ExcelImg2 from "../../assets/excel2.jpg";
import AsistenteImg from "../../assets/asistente.jpg";

const getCourseImage = (item) => {
    const text = `${item?.cursos || ''} ${item?.nombrecurso || ''} ${item?.codigodecuso || ''}`.toLowerCase();
    if (text.includes('cisco-02') || text.includes('módulo 2') || text.includes('srwe')) return CiscoImg2;
    if (text.includes('cisco') || text.includes('network')) return CiscoImg;
    if (text.includes('web') || text.includes('diseño web')) return DisenowebImg;
    if (text.includes('diseño')) return DisenoImg;
    if (text.includes('mantenimiento') || text.includes('reparación') || text.includes('disco')) return DiscoImg;
    if (text.includes('excel') && (text.includes('intermedio') || text.includes('05'))) return ExcelImg2;
    if (text.includes('excel')) return ExcelImg;
    if (text.includes('asistente') || text.includes('gerencia') || text.includes('talento')) return AsistenteImg;
    return CiscoImg;
};

const ContenidoPage = () => {
    const { socket } = useContext(SocketContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        if (!socket) return;

        const handleCoursesResponse = (listAllcourses) => {
            try {
                const parsed = typeof listAllcourses === 'string' ? JSON.parse(listAllcourses) : listAllcourses;
                setCourses(Array.isArray(parsed) ? parsed : []);
            } catch (err) {
                console.error("Error al procesar la lista de cursos:", err);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        // Emitir solicitud de cursos
        socket.emit('[bag] courses', () => { }, handleCoursesResponse);

        return () => {
            socket.off('[bag] courses');
        };
    }, [socket]);

    // Filtrado de cursos memoizado para máximo rendimiento
    const filteredCourses = useMemo(() => {
        return courses.filter((item) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                (item.formacion && item.formacion.toLowerCase().includes(selectedCategory.toLowerCase()));

            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !searchLower ||
                (item.cursos && item.cursos.toLowerCase().includes(searchLower)) ||
                (item.nombrecurso && item.nombrecurso.toLowerCase().includes(searchLower)) ||
                (item.facilitador && item.facilitador.toLowerCase().includes(searchLower));

            return matchesCategory && matchesSearch;
        });
    }, [courses, selectedCategory, searchQuery]);

    const categories = [
        { id: 'all', label: 'Todos los Cursos' },
        { id: 'cisco', label: 'Cisco Networking' },
        { id: 'oficios', label: 'Oficios Tecnológicos' },
        { id: 'liderazgo', label: 'Gestión y Liderazgo' }
    ];

    return (
        <LayoutDashboard>
            <main className="flex flex-col w-full h-full gap-6">
                {/* Encabezado y buscador */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-600">Catálogo Académico</span>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                            Programación Permanente de Cursos
                        </h1>
                        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                            Cursos certificados para estudiantes, egresados y público general.
                        </p>
                    </div>

                    <div className="w-full md:w-72">
                        <Input
                            type="text"
                            placeholder="Buscar curso o facilitador..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="sm"
                            variant="bordered"
                            isClearable
                            onClear={() => setSearchQuery('')}
                            classNames={{
                                inputWrapper: "bg-slate-50 border-slate-300 hover:border-slate-400"
                            }}
                        />
                    </div>
                </div>

                {/* Filtros por Categoría */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            size="sm"
                            variant={selectedCategory === cat.id ? "solid" : "flat"}
                            className={
                                selectedCategory === cat.id
                                    ? "bg-[#8C113E] text-white font-bold"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                            }
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                {/* Estado de carga con Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <Card key={n} className="p-3 space-y-3 rounded-2xl border border-slate-200/80">
                                <Skeleton className="rounded-xl h-44 w-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                                    <Skeleton className="h-3 w-1/2 rounded-lg" />
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <span className="text-4xl mb-2">🔍</span>
                        <h3 className="text-base font-bold text-slate-800">No se encontraron cursos</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                            No hay resultados que coincidan con el criterio de búsqueda o categoría seleccionada.
                        </p>
                        <Button
                            size="sm"
                            variant="light"
                            className="mt-3 text-red-600 font-semibold"
                            onPress={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                        >
                            Restablecer filtros
                        </Button>
                    </div>
                ) : (
                    /* Grilla de Cursos Optimizada */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredCourses.map((item, index) => {
                            const courseKey = item.idcurso || item.codigodecuso || `curso-${index}`;
                            const courseImg = getCourseImage(item);

                            return (
                                <Card
                                    key={courseKey}
                                    isPressable
                                    onPress={() => {
                                        setModalItem(item);
                                        setOpenModal(true);
                                    }}
                                    className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                                >
                                    <div className="relative w-full h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                                        <Image
                                            src={courseImg}
                                            alt={item.nombrecurso || item.cursos}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            radius="none"
                                        />
                                        {item.modalidad && (
                                            <span className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">
                                                {item.modalidad}
                                            </span>
                                        )}
                                    </div>

                                    <CardBody className="p-4 flex flex-col justify-between flex-1 gap-3">
                                        <div className="flex flex-col gap-1">
                                            {item.formacion && (
                                                <span className="text-[11px] font-bold uppercase text-red-600 tracking-wider">
                                                    {item.formacion}
                                                </span>
                                            )}
                                            <h3 className="text-sm md:text-base font-bold text-slate-800 line-clamp-2 leading-snug">
                                                {item.cursos || item.nombrecurso}
                                            </h3>
                                        </div>

                                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                🕒 {item.duracion || 'Consultar'}
                                            </span>
                                            <span className="font-bold text-slate-800 text-sm">
                                                {item.monto ? `${item.monto}` : 'Consultar'}
                                            </span>
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Modal renderizado una sola vez en el nivel raíz */}
                {openModal && modalItem && (
                    <ModalCourses
                        item={modalItem}
                        isOpen={openModal}
                        onClose={() => {
                            setOpenModal(false);
                            setModalItem(null);
                        }}
                    />
                )}
            </main>
        </LayoutDashboard>
    );
};

export default ContenidoPage;