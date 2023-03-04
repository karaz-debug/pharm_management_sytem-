import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DrugModalPop from '../Modal/DrugModalPop';

const DrugTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [drugsPerPage] = useState(5);
    const [drugs, setDrugs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/drugs');
                setDrugs(data.drugs);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDrugs();
    }, []);
    const indexOfLastdrug = currentPage * drugsPerPage;
    const indexOfFirstdrug = indexOfLastdrug - drugsPerPage;

    const currentDrugs = drugs.slice(indexOfFirstdrug, indexOfLastdrug);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [editingRow, setEditingRow] = useState(null);
    const [updatedDrugs, setUpdatedDrugs] = useState([]);
    const [medicineField, setMedicineField] = useState({});

    useEffect(() => {
        if (updatedDrugs) {
            setMedicineField({
                name: updatedDrugs.name || "",
                Packaging: updatedDrugs.Packaging || "",
                BatchID: updatedDrugs.BatchID || "",
                Exdate: updatedDrugs.Exdate || "",
                supplier: updatedDrugs.supplier || "",
                Quantity: updatedDrugs.Quantity || "",
            });
        } else {
            setMedicineField({
                name: "",
                Packaging: "",
                BatchID: "",
                Exdate: "",
                supplier: "",
                Quantity: "",
            });
        }
    }, [updatedDrugs]);


    // Edit drug
    const handleEdit = (drug) => {
        setUpdatedDrugs(drug);
        setEditingRow(drug._id);
    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setMedicineField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (drug) => {
        try {

            const updatedDrugs = {
                ...medicineField,
            };
            const response = await fetch(`http://localhost:3001/admin/drug/${drug._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedDrugs)
            });

            console.log(response)
            setMedicineField("");
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCancel = () => {
        setEditingRow(null);
    };


    // Delete a drug
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/drug/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The drug entry with the specified ID does not exist.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });
    };



    return (
        <div>
            <div className="overflow-hidden overflow-x-scroll border rounded-lg">
                <table className="w-full">
                    <thead className=" bg-gray-50">
                        <tr >
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Medicine Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Packaging
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Batch ID
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Ex.Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Rate
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentDrugs.map((drug) => (
                            <tr key={drug._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === drug._id ? (
                                        <input
                                            type="text"
                                            name="name"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.name}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        drug.name
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === drug._id ? (
                                        <input
                                            type="text"
                                            name="Packaging"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.Packaging}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        drug.Packaging
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === drug._id ? (
                                        <input
                                            type="text"
                                            name="BatchID"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.BatchID}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        drug.BatchID
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === drug._id ? (
                                        <input
                                            type="text"
                                            name="Exdate"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={medicineField.Exdate}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        drug.Exdate
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === drug._id ? (<input
                                        type="text"
                                        name="supplier"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={medicineField.supplier}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        drug.supplier
                                    )}

                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === drug._id ? (<input
                                        type="text"
                                        name="Quantity"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === drug._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={medicineField.Quantity}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (
                                        drug.Quantity
                                    )}

                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right">
                                    {editingRow === drug._id ? (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleSaveChanges(drug)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleEdit(drug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleDelete(drug._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(drugs.length / drugsPerPage) }, (_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            className={`mr-4 rounded-full py-2 px-4 btn btn-blue bg-slate-200    ${pageNumber === currentPage ? 'active' : ''}`}
                            onClick={() => paginate(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default DrugTable;
