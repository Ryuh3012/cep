import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const ModalCourses = ({ item, isOpen, onClose }) => {
    // Parser seguro para contenido (soporta Array, JSON string o texto con saltos de línea)
    const parseContenido = () => {
        const raw = item?.contenido || item?.contendido;
        if (!raw) return [];
        if (Array.isArray(raw)) return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                // Si no es JSON válido, separar por líneas
                return raw.split('\n').filter(Boolean);
            }
        }
        return [String(raw)];
    };

    const syllabus = parseContenido();

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose(false)}
            placement="center"
            size="2xl"
            scrollBehavior="inside"
            classNames={{
                backdrop: "bg-black/50 backdrop-blur-sm",
                base: "border border-slate-200 shadow-2xl rounded-2xl",
                header: "border-b border-slate-100 pb-3",
                footer: "border-t border-slate-100 pt-3"
            }}
        >
            <ModalContent>
                {() => (
                    <div className="flex flex-col w-full max-h-[85vh]">
                        <ModalHeader className="flex flex-col gap-1 text-center sm:text-left">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-600">Detalles del Curso</span>
                            <h2 className="text-xl font-bold text-slate-800">{item?.cursos || item?.nombrecurso}</h2>
                        </ModalHeader>

                        <ModalBody className="p-4 md:p-6 flex flex-col gap-5 overflow-y-auto">
                            {/* Grilla de atributos del curso */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                                <div className="flex items-start gap-2.5">
                                    <span className="p-2 rounded-lg bg-red-100/70 text-red-600 text-base">🕒</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Horario</p>
                                        <p className="text-sm font-semibold text-slate-800">{item?.horario || 'Por definir'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <span className="p-2 rounded-lg bg-blue-100/70 text-blue-600 text-base">⏳</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Duración</p>
                                        <p className="text-sm font-semibold text-slate-800">{item?.duracion || 'Consultar'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <span className="p-2 rounded-lg bg-purple-100/70 text-purple-600 text-base">💻</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Modalidad</p>
                                        <p className="text-sm font-semibold text-slate-800">{item?.modalidad || 'Presencial'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5">
                                    <span className="p-2 rounded-lg bg-emerald-100/70 text-emerald-600 text-base">👨‍🏫</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Facilitador</p>
                                        <p className="text-sm font-semibold text-slate-800">{item?.facilitador || 'Docente asignado'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2.5 sm:col-span-2 border-t border-slate-200/60 pt-2">
                                    <span className="p-2 rounded-lg bg-amber-100/70 text-amber-700 text-base">💵</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Inversión / Costo</p>
                                        <p className="text-base font-bold text-slate-900">{item?.monto || 'Consultar en sede'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido Programático */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                                    <span>📑</span> Contenido Programático:
                                </h3>
                                {syllabus.length > 0 ? (
                                    <ul className="grid grid-cols-1 gap-1.5 pl-2">
                                        {syllabus.map((line, idx) => (
                                            <li key={`${line}-${idx}`} className="text-xs md:text-sm text-slate-600 flex items-start gap-2">
                                                <span className="text-red-500 font-bold">•</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-slate-500 italic pl-2">Temario disponible en la coordinación.</p>
                                )}
                            </div>

                            {/* Información de Pago */}
                            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-700">
                                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                    <span>🏦</span> Formas de Pago Aceptadas:
                                </h3>
                                <div className="text-xs leading-relaxed flex flex-col gap-1 text-slate-600">
                                    <p className="font-medium text-slate-800">
                                        • Transferencia Bancaria (Tasa Oficial BCV del día):
                                    </p>
                                    <div className="bg-white/80 p-2.5 rounded-lg border border-blue-100 flex flex-col gap-0.5 ml-2 font-mono text-[11px] text-slate-700">
                                        <p><b>Banco:</b> Mercantil</p>
                                        <p><b>Cuenta Corriente:</b> 0105-0083-44-1083100815</p>
                                        <p><b>Titular:</b> IUJO, A.C | <b>RIF:</b> J-30576524-3</p>
                                    </div>
                                    <p className="mt-1">
                                        • <b>Efectivo en divisas o punto de venta:</b> Directamente en la caja principal de la sede Catia.
                                    </p>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex justify-between items-center">
                            <Button color="default" variant="light" onPress={() => onClose(false)} className="text-slate-600 font-medium text-sm">
                                Cerrar
                            </Button>
                            <Button
                                as={Link}
                                to="/participant"
                                className="bg-[#8C113E] hover:bg-[#6A2473] text-white font-bold text-sm shadow-md"
                            >
                                Inscribirse en este Curso →
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalCourses;

