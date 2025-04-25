'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

// Données fictives des étudiants
const studentsData = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', level: 'Licence 1', program: 'Tronc Commun', registrationDate: '2023-09-01' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', level: 'Licence 2', program: 'Tronc Commun', registrationDate: '2022-09-01' },
    { id: '3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', level: 'Master 1', program: 'Licence', registrationDate: '2021-09-01' },
    { id: '4', firstName: 'Bob', lastName: 'Brown', email: 'bob.brown@example.com', level: 'Licence 1', program: 'Tronc Commun', registrationDate: '2023-05-15' },
];

export default function StudentsPage() {
    const [globalFilter, setGlobalFilter] = useState('');
    const [levelFilter, setLevelFilter] = useState('');
    const [programFilter, setProgramFilter] = useState('');

    // Fonction pour filtrer les données
    // Fonction pour filtrer les données
    const filteredData = studentsData.filter((student) => {
        console.log('Filtrage en cours pour:', student);  // Afficher chaque étudiant pendant le filtrage
        return (
            student.firstName.toLowerCase().includes(globalFilter.toLowerCase()) ||
            student.lastName.toLowerCase().includes(globalFilter.toLowerCase()) ||
            student.email.toLowerCase().includes(globalFilter.toLowerCase())
        ) &&
            (levelFilter ? student.level === levelFilter : true) &&
            (programFilter ? student.program === programFilter : true);
    });

    console.log('Données filtrées:', filteredData); // Afficher les données filtrées


    // Fonction pour exporter les données en Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        XLSX.writeFile(wb, 'students.xlsx');
    };

    // Fonction pour exporter les données en PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // En-têtes
        doc.text('Nom, Prénom, Email, Niveau, Programme, Date d\'inscription', 10, 10);
        doc.setFontSize(10);

        // Données
        filteredData.forEach((student, index) => {
            doc.text(
                `${student.lastName}, ${student.firstName}, ${student.email}, ${student.level}, ${student.program}, ${student.registrationDate}`,
                10,
                20 + index * 10
            );
        });

        doc.save('students.pdf');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Liste des Étudiants</h1>

            {/* Recherche rapide */}
            <div className="mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-1/3"
                    placeholder="🔍 Recherche rapide"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)} // Mise à jour du filtre global
                />
            </div>

            {/* Filtres par Niveau et Programme */}
            <div className="flex space-x-4 mb-4">
                <select
                    className="p-2 border rounded"
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                >
                    <option value="">Filtrer par Niveau</option>
                    <option value="Licence 1">Licence 1</option>
                    <option value="Licence 2">Licence 2</option>
                    <option value="Master 1">Master 1</option>
                </select>

                <select
                    className="p-2 border rounded"
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                >
                    <option value="">Filtrer par Programme</option>
                    <option value="Tronc Commun">Tronc Commun</option>
                    <option value="Licence">Licence</option>
                </select>
            </div>

            {/* Boutons d'exportation */}
            <div className="mb-4">
                <button
                    onClick={exportToExcel}
                    className="p-2 bg-blue-500 text-white rounded mr-4"
                >
                    📤 Exporter en Excel
                </button>
                <button
                    onClick={exportToPDF}
                    className="p-2 bg-green-500 text-white rounded"
                >
                    📤 Exporter en PDF
                </button>
            </div>

            {/* Tableau des étudiants */}
            <table className="min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2 text-left">Nom</th>
                        <th className="border-b p-2 text-left">Prénom</th>
                        <th className="border-b p-2 text-left">Email</th>
                        <th className="border-b p-2 text-left">Niveau</th>
                        <th className="border-b p-2 text-left">Programme</th>
                        <th className="border-b p-2 text-left">Date d’inscription</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((student) => (
                        <tr key={student.id}>
                            <td className="border-b p-2">{student.lastName}</td>
                            <td className="border-b p-2">{student.firstName}</td>
                            <td className="border-b p-2">{student.email}</td>
                            <td className="border-b p-2">{student.level}</td>
                            <td className="border-b p-2">{student.program}</td>
                            <td className="border-b p-2">{student.registrationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
