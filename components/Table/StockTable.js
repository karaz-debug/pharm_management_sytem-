import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const StockTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [stocksPerPage] = useState(20);
    const [stocks, setStocks] = useState([]);
    const [Editstock, setEditStock] = useState([]);

    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/stock');
                setStocks(data.stocks);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStocks();
    }, []);
    const indexOfLastStock = currentPage * stocksPerPage;
    const indexOfFirstStock = indexOfLastStock - stocksPerPage;

    const searchQuery = useSelector((state) => state.search.searchQuery);
    const searchResult = useSelector((state) => state.search.searchResult);
    const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);
    const stocksToRender = searchQuery ? searchResult : currentStocks;


    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [editingRow, setEditingRow] = useState(null);
    const [updatedStocks, setUpdatedStocks] = useState([]);
    const [fieldStock, setFieldStock] = useState({});

    useEffect(() => {
        if (updatedStocks) {
            setFieldStock({
                selectedSupplier: updatedStocks.medicines ? updatedStocks.selectedSupplier : "",
                invoiceNumber: updatedStocks.medicines ? updatedStocks.invoiceNumber : "",
                paymentType: updatedStocks.medicines ? updatedStocks.paymentType : "",
                medicineName: updatedStocks.medicines && updatedStocks.medicines.length > 0 ? updatedStocks.medicines[0].medicineName : "",
                expiryDate: updatedStocks.medicines ? updatedStocks.expiryDate : "",
                packaging: updatedStocks.medicines && updatedStocks.medicines.length > 0 ? updatedStocks.medicines[0].packaging : "",
                amount: updatedStocks.medicines && updatedStocks.medicines.length > 0 ? updatedStocks.medicines[0].amount : "",
            });
        } else {
            setFieldStock({
                selectedSupplier: "",
                invoiceNumber: "",
                paymentType: "",
                medicineName: "",
                expiryDate: "",
                packaging: "",
                amount: "",
            });
        }
    }, [updatedStocks]);


    // Edit Stock
    const handleEdit = (stock) => {
        setUpdatedStocks(stock);
        // setShowModal(true);
        setEditingRow(stock._id);


    }

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setFieldStock((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async (stock) => {
        try {

            const updatedStock = {
                ...fieldStock,
            };
            const response = await fetch(`http://localhost:3001/admin/stock/${stock._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedStock)
            });

            if (response.ok) {
                alert("Succesfully Edited the Stock");

            } else {
                alert('YOur not authourized || failed to Edit Stock');
            }

            console.log(response)
            setFieldStock("");
            setEditingRow(null);
        } catch (error) {
            console.error(error);
        }
    };
    const handleCancel = () => {
        setEditingRow(null);
    };

    console.log("this is fieldstock ", fieldStock)
    console.log("this is updated ", updatedStocks)

    // Delete a stock
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/stock/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                    alert("Succesfully Edited the Drug");

                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    alert('YOur not authourized || failed to Edit Drug');
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The stock entry with the specified ID does not exist.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });
    };



    return (
        <div>
            <div className="overflow-hidden overflow-x-scroll border rounded-lg">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Supplier Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Invoice No:
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Payment Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Medicine Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Expiry Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Package
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                                Total Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {stocksToRender.map((stock) => (
                            <tr key={stock._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="text"
                                            name="selectedSupplier"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.selectedSupplier}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.selectedSupplier
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="number"
                                            name="invoiceNumber"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.invoiceNumber}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.invoiceNumber
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="string"
                                            name="paymentType"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.paymentType}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.paymentType
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="string"
                                            name="medicineName"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.medicineName}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.items?.map((item, index) => (
                                            <span key={item._id} style={{ marginRight: '0.5rem' }}>
                                                {item.medicineName.length > 10 ? item.medicineName.slice(0, 5) + '...,' : item.medicineName}
                                                {index === stock.items?.length - 1 ? `(${stock.items?.length})` : null}
                                            </span>
                                        ))
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {editingRow === stock._id ? (<input
                                        type="date"
                                        name="expiryDate"
                                        className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                        value={moment(fieldStock.expiryDate).format('YYYY-MM-DD')}
                                        onChange={handleFieldChange}
                                    />
                                    ) : (

                                        moment(stock.medicines?.ExpiryDate).format('MMM DD, YYYY')
                                    )}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="number"
                                            name="packaging"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.packaging}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.medicines?.map((medico) => (
                                            <span key={medico._id} style={{ marginRight: '0.5rem' }}>
                                                {medico.packaging.length > 1 ? medico.packaging.slice(0, 3) + ',' : medico.packaging}
                                            </span>
                                        ))
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                    {editingRow === stock._id ? (
                                        <input
                                            type="text"
                                            name="amount"
                                            className={`w-full border border-gray-300 px-3 py-2 ${editingRow === stock._id ? 'border-blue-500 focus:outline-none focus:border-blue-600' : ''}`}
                                            value={fieldStock.amount}
                                            onChange={handleFieldChange}
                                        />
                                    ) : (
                                        stock.items?.map((item) => (
                                            <span key={item._id} style={{ marginRight: '0.5rem' }}>
                                                {item.amount.length > -1 ? item.amount.slice(0, 3) + '..,' : item.amount}
                                            </span>
                                        ))

                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right">
                                    {editingRow === stock._id ? (
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                onClick={() => handleSaveChanges(stock)}
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
                                                onClick={() => handleEdit(stock)}
                                            >
                                                Edit
                                            </button>
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    className="p-2 text-red-600 rounded-full hover:text-red-900 hover:bg-red-100 focus:outline-none focus:bg-red-100 focus:text-red-900"
                                                    onClick={() => handleDelete(stock._id)}
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
                {Array.from({ length: Math.ceil(stocks.length / stocksPerPage) }, (_, index) => {
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

export default StockTable;

