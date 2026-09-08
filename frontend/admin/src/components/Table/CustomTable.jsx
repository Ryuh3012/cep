import React, { useMemo, useState, useEffect } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue
} from '@heroui/react';
import { Search, Inbox, SlidersHorizontal } from 'lucide-react';

/**
 * Componente de Tabla reutilizable moderna con búsqueda en vivo,
 * paginación reactiva, estados vacíos estilizados y claves seguras.
 */
const CustomTable = ({
    columns = [],
    data = [],
    rowsPerPage = 6,
    renderCell,
    keyField,
    emptyContent = 'No hay registros disponibles',
    ariaLabel = 'Tabla de datos',
    searchPlaceholder = 'Buscar registros...',
    showSearch = true,
}) => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar datos en tiempo real si hay término de búsqueda
    const filteredData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        if (!searchTerm.trim()) return data;

        const term = searchTerm.toLowerCase();
        return data.filter((item) => {
            return Object.values(item).some((val) => {
                if (val === null || val === undefined) return false;
                if (typeof val === 'object') return false;
                return String(val).toLowerCase().includes(term);
            });
        });
    }, [data, searchTerm]);

    // Resetear a página 1 cuando cambia la búsqueda
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    // Calcular total de páginas
    const pages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

    useEffect(() => {
        if (page > pages && pages > 0) {
            setPage(pages);
        }
    }, [pages, page]);

    // Elementos paginados
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
    }, [page, filteredData, rowsPerPage]);

    // Clave única para cada fila
    const getRowKey = (item, index) => {
        if (typeof keyField === 'function') {
            const calculated = keyField(item);
            if (calculated) return calculated;
        }
        if (typeof keyField === 'string' && item[keyField] !== undefined && item[keyField] !== null) {
            return String(item[keyField]);
        }
        const fallback = item.id || item.idfacilitador || item.codigodecuso || item.cedula || item._id;
        if (fallback !== undefined && fallback !== null) {
            return String(fallback);
        }
        return `row-${index}`;
    };

    return (
        <div className="w-full flex flex-col gap-3">
            {/* Barra superior de herramientas y búsqueda */}
            {showSearch && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
                        Total: <span className="font-bold text-slate-700">{filteredData.length}</span> registros
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-sm">
                <Table
                    shadow="none"
                    aria-label={ariaLabel}
                    emptyContent={
                        <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <Inbox size={24} />
                            </div>
                            <p className="text-sm font-semibold text-slate-700">{emptyContent}</p>
                            {searchTerm && (
                                <p className="text-xs text-slate-400">
                                    No se encontraron resultados para &quot;{searchTerm}&quot;
                                </p>
                            )}
                        </div>
                    }
                    bottomContent={
                        pages > 1 ? (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                                <span className="text-xs text-slate-500 font-medium">
                                    Página {page} de {pages} ({filteredData.length} resultados)
                                </span>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(newPage) => setPage(newPage)}
                                    classNames={{
                                        wrapper: "gap-1 shadow-none",
                                        item: "text-xs rounded-lg font-medium",
                                        cursor: "bg-[#1F2559] shadow-md shadow-indigo-900/20 text-white rounded-lg font-bold"
                                    }}
                                />
                            </div>
                        ) : null
                    }
                    classNames={{
                        base: "overflow-x-auto",
                        wrapper: "p-0 shadow-none rounded-none",
                        table: "min-w-full",
                        th: "bg-[#1F2559] text-white font-semibold text-xs uppercase tracking-wider px-5 py-3.5 border-b border-[#161b40]",
                        td: "px-5 py-4 text-sm text-slate-700 border-b border-slate-100 transition-colors",
                        tr: "hover:bg-blue-50/40 transition-colors cursor-default"
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.key}
                                className={column.className || 'text-left bg-[#1F2559] text-white px-5'}
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={items} emptyContent={emptyContent}>
                        {(item) => {
                            const rowKey = getRowKey(item);
                            return (
                                <TableRow key={rowKey}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell
                                                ? renderCell(item, columnKey)
                                                : getKeyValue(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        }}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default CustomTable;
