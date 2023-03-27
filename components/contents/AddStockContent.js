import { useEffect, useState } from 'react';

const AddStockContent = () => {
    // Select functionalllity
    const [suppliers, setSuppliers] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("");
    const [drugrData, setDrugData] = useState({});
    const [stock, setStock] = useState([])

    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [date, setDate] = useState("");

    const [rows, setRows] = useState([
        { medicineName: "", packaging: "", batchID: "", expiryDate: "", rate: "", amount: "" },
    ]);

    const [formData, setFormData] = useState([{}])

    // Add a new row
    const handleAddRow = () => {
        const newRow = {
            medicineName: '',
            packaging: '',
            batchID: '',
            expiryDate: '',
            rate: '',
            amount: ''
        };
        setRows([...rows, newRow]);
    };

    // Delete a row
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    //  Fetch up the supplier
    useEffect(() => {
        fetch("http://localhost:3001/admin/supplier")
            .then(res => res.json())
            .then(data => setSuppliers(data.suppliers))
            .catch(err => console.log(err));
    }, []);

    //  Fetch up the drugs
    useEffect(() => {
        fetch("http://localhost:3001/admin/drugs")
            .then(res => res.json())
            .then(data => setDrugs(data.drugs))
            .catch(err => console.log(err));
    }, []);


    // Hnadle which drug is choosen to be the stock
    function handleSelectChange(event, index) {
        const supplierDrugname = event.target.value;
        setSelectedDrug(supplierDrugname);

        fetch(`http://localhost:3001/admin/drug/${supplierDrugname}`)
            .then(res => res.json())
            .then(data => setDrugData(data))
            .catch(err => console.log(err));

        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    medicineName: supplierDrugname,
                };
            }
            return row;
        });
        setRows(newRows);
    }

    // Handles the packaging values
    const handlePackagingChange = (e, index) => {
        const newPackaging = e.target.value;
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    packaging: newPackaging,
                    amount: newPackaging * row.rate || 0
                };
            }
            return row;
        });
        setRows(newRows);
    };

    // Handles the rate values
    const handleRateChange = (e, index) => {
        const newRate = e.target.value;
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    rate: newRate,
                    amount: row.packaging * newRate || 0
                };
            }
            return row;
        });
        setRows(newRows);
    };

    const handleExpiryDate = (e, index) => {
        const ExpiryDate = e.target.value;
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    expiryDate: ExpiryDate,
                };
            }
            return row;
        });
        setRows(newRows);
    };

    // function handleSaveForm(event) {
    //     event.preventDefault(); // prevent default form submission

    //     const fieldsData = {
    //         selectedSupplier,
    //         invoiceNumber,
    //         paymentType,
    //         date,
    //     };

    //     setFormData({
    //         ...formData,
    //         fieldsData
    //     })

    // }

    // Add handle submit fully implemented
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newRows = rows.map((row, i) => {
    //         return {
    //             ...row,
    //             batchID: drugrData.BatchID,
    //         };
    //     });
    //     setRows(newRows);

    //     if (newRows) {
    //         setFormData({
    //             ...formData,
    //             rows
    //         })
    //     }

    //     try {
    //         const response = await fetch('http://localhost:3001/admin/stock', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         const result = await response.json();

    //         console.log(result);

    //         // reset the form fields
    //         setSelectedSupplier("");
    //         setInvoiceNumber("");
    //         setPaymentType("");
    //         setDate("");
    //         setRows([{ medicineName: "", packaging: "", batchID: "", expiryDate: "", rate: "", amount: "" }]);
    //     } catch (error) {
    //         console.error(error);
    //     }

    //     console.log("this total form data ", formData);

    // }

    const handleGenerateStock = async () => {
        try {
            // Create invoice object
            const stockObj = {
                selectedSupplier: selectedSupplier, // add selectedSupplier field
                invoiceNumber: invoiceNumber,
                paymentType: paymentType,
                date: date, // add date field
                totalNet: rows.reduce((acc, row) => acc + row.amount, 0),
                items: rows,
            };

            // Send invoice to backend
            const response = await fetch("http://localhost:3001/admin/stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(stockObj),
            });

            const data = await response.json();
            setStock(data);
            // reset the form fields
            setSelectedSupplier("");
            setInvoiceNumber("");
            setPaymentType("");
            setDate("");
            setRows([{ medicineName: "", packaging: "", batchID: "", expiryDate: "", rate: "", amount: "" }]);
            console.log(invoice, "and data", data)
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="p-4">
            <div className="flex items-center justify-between px-4 ">
                <h1 className="text-lg font-bold">Add Stock</h1>
                <div className="flex items-center space-x-2">
                    <button className="p-2 bg-green-500 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11 9V5a1 1 0 00-2 0v4H5a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="p-2 bg-red-500 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.707 5.707a1 1 0 011.414 0L10 8.586l2.879-2.879a1 1 0 011.414 1.414L11.414 10l2.879 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <hr className="my-4 border-red-500" />
            <div class="p-8">
                <form className="grid grid-cols-3 gap-4">
                    <div className="block mb-4">
                        <label
                            className="block mb-2 font-bold text-gray-700"
                            htmlFor="supplier-select"
                        >
                            Supplier Name:
                        </label>
                        <select
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="supplier-select"
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                        >
                            <option value="">Select a supplier</option>
                            {suppliers.map((supplier, index) => (
                                <option key={index} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="block mb-4">
                        <label
                            className="block mb-2 font-bold text-gray-700"
                            htmlFor="invoice-number"
                        >
                            Invoice Number
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="invoice-number"
                            type="text"
                            placeholder="Enter invoice number"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </div>
                    <div className="block mb-4">
                        <label
                            className="block mb-2 font-bold text-gray-700"
                            htmlFor="payment-type"
                        >
                            Payment Type
                        </label>
                        <select
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="payment-type"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >
                            <option value="">Select payment type</option>
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div className="block mb-4">
                        <label
                            className="block mb-2 font-bold text-gray-700"
                            htmlFor="date"
                        >
                            Date
                        </label>
                        <input
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            placeholder="Select date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </form>
            </div>

            <hr className="my-4 border-green-500" />
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
                <tbody>
                    {rows?.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="medicineName"
                                    name="medicineName"
                                    value={selectedDrug}
                                    onChange={(e) => handleSelectChange(e, index)}
                                >
                                    <option value="">Select a medicine</option>
                                    {drugs.map((drug, index) => (
                                        <option key={index} value={drug.name}>
                                            {drug.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input

                                    type="number"
                                    name="Packaging"
                                    onChange={(e) => handlePackagingChange(e, index)}
                                    value={row.packaging}
                                    className='w-[100px] px-5 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'
                                />


                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {drugrData && (
                                    <input
                                        type="number"
                                        name="BatchID"
                                        placeholder="Batch ID"
                                        value={drugrData.BatchID}
                                        className='w-[100px] px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'

                                    />
                                )}

                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input
                                    type="date"
                                    name="ExpiryDate"
                                    value={row.expiryDate}
                                    onChange={(e) => handleExpiryDate(e, index)}
                                    // onChange={(e) => setExpiryDate(e.target.value)}
                                    className='px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'
                                />
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="Rate"
                                    placeholder="Rate"
                                    value={row.rate}
                                    onChange={(e) => handleRateChange(e, index)}
                                    className='w-[100px] px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'

                                />

                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="Amount"
                                    placeholder="Amount"
                                    value={row.amount}
                                    className='w-[100px] px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'

                                />

                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <button onClick={handleAddRow} className="p-2 bg-green-500 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M11 9V5a1 1 0 00-2 0v4H5a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {rows.length > 1 ? (
                                    <button onClick={() => handleDeleteRow(index)} className="p-2 bg-red-500 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 1a9 9 0 100 18 9 9 0 000-18zM5.707 5.707a1 1 0 011.414 0L10 8.586l2.879-2.879a1 1 0 011.414 1.414L11.414 10l2.879 2.879a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                ) : ("")}


                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <hr className="my-4 border-green-500" />

            <br />

            <div className="flex flex-col float-right">
                <button onClick={handleGenerateStock} className="w-24 py-2 text-white bg-blue-500 focus:outline-none">
                    Add
                </button>
            </div>


        </div>

    );
};

export default AddStockContent;




