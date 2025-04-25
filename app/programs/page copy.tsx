'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import Link from 'next/link';

type Program = {
    id: string;
    name: string;
    sigle: string;
    createdAt: string;
    programType: {
        name: string;
    };
    levels: any[]; // ou type exact si défini
};

const columnHelper = createColumnHelper<Program>();

const columns = [
    columnHelper.accessor('name', { header: 'Nom' }),
    columnHelper.accessor('sigle', { header: 'Sigle' }),
    columnHelper.accessor((row) => row.programType?.name ?? '—', {
        id: 'type',
        header: 'Type',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.levels?.length ?? 0, {
        id: 'levels',
        header: 'Niveaux associés',
        cell: (info) => `${info.getValue()} niveau(x)`,
    }),
    columnHelper.accessor('createdAt', {
        header: 'Date de création',
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

export default function ProgramsPage() {
    const [data, setData] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('https://api-staging.supmanagement.ml/v2/programs', {
                headers: {
                    Authorization: `Bearer 0000-8432-3244-0923`,
                },
            })
            .then((res) => {
                setData(res.data); // ← assure-toi que c’est bien res.data.data
            })
            .catch((err) => {
                console.error('Erreur chargement des programmes :', err);
            })
            .finally(() => setLoading(false));
    }, []);

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    console.log(data)

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Programmes</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    ➕ Créer un programme
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
