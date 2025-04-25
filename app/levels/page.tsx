'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';

// Types des données
type Program = {
    id: string;
    name: string;
    sigle: string;
};

type Level = {
    id: string;
    name: string;
    sigle: string;
    levelIndex: number;
    updatedAt: string;
    programLevels: {
        program: Program;
    }[];
};

const columnHelper = createColumnHelper<Level>();

const columns = [
    columnHelper.accessor('name', { header: 'Nom' }),
    columnHelper.accessor('sigle', { header: 'Sigle' }),
    columnHelper.accessor('levelIndex', { header: 'Index' }),
    columnHelper.accessor('programLevels', {
        header: 'Programmes associés',
        cell: (info) => (
            <div className="flex space-x-2">
                {info.getValue().map((programLevel, idx) => (
                    <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                        {programLevel.program.name}
                    </span>
                ))}
            </div>
        ),
    }),
    columnHelper.accessor('updatedAt', {
        header: 'Date de modification',
        cell: (info) =>
            new Date(info.getValue()).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <div className="space-x-2">
                <button className="text-blue-600 hover:underline">✏️</button>
                <button className="text-red-600 hover:underline">🗑️</button>
            </div>
        ),
    }),
];

export default function LevelsPage() {
    const [data, setData] = useState<Level[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://api-staging.supmanagement.ml/v2/levels', {
                headers: {
                    Authorization: `Bearer 0000-8432-3244-0923`,
                },
            })
            .then((res) => {
                setData(res.data); // Adapté à la structure donnée
            })
            .catch((err) => {
                console.error('Erreur lors du chargement des niveaux :', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Niveaux</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    ➕ Ajouter un niveau
                </button>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <table className="min-w-full bg-white border rounded shadow">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-gray-100">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="p-2 text-left border-b">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-2 border-b">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
