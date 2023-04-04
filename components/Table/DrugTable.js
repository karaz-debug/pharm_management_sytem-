import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const DrugTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [drugsPerPage] = useState(10);
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


    const searchDrug = useSelector((state) => state.drugsearch.searchDrug);
    const searchResultDrug = useSelector((state) => state.drugsearch.searchResultDrug);

    const currentDrugs = drugs.slice(indexOfFirstdrug, indexOfLastdrug);
    const drugsToRender = searchDrug ? searchResultDrug : currentDrugs;


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

            if (response.ok) {
                alert("Succesfully Edited the Drug");

            } else {
                alert('YOur not authourized || failed to Edit Drug');
            }

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
                    alert("Succesfully Deleted the Drug");
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    alert('Your not authourized to delete  Drug');
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
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Batch ID
                            </th>

                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Ex.Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Manufucture
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {drugsToRender.map((drug) => (
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
                                        drug.Quantity
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

                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="p-2 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100 focus:outline-none focus:bg-red-100 focus:text-red-900"
                                                    onClick={() => handleDelete(drug._id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

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

