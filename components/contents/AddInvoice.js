import { useEffect, useState } from 'react';

const AddInvoice = () => {
    const [customers, setCustomers] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("");
    const [drugrData, setDrugData] = useState({});

    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [date, setDate] = useState("");
    const [contact, setContact] = useState("");

    const [paid, setPaid] = useState("");
    const [change, setChange] = useState("");

    const [formData, setFormData] = useState([{}])

    const [rows, setRows] = useState([
        {
            medicineName: "",
            packaging: "",
            batchID: "",
            expiryDate: "",
            rate: "",
            amount: "",
            discount: "",
            netTotal: "",

        },
    ]);


    // Add a new row
    const handleAddRow = () => {
        const newRow = {
            medicineName: '',
            packaging: '',
            batchID: '',
            expiryDate: '',
            rate: '',
            amount: '',
            discount: "",
            netTotal: "",
        };
        setRows([...rows, newRow]);
    };
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    //  Fetch up the customer
    useEffect(() => {
        fetch("http://localhost:3001/admin/customer")
            .then(res => res.json())
            .then(data => setCustomers(data.customers))
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
    async function handleSelectChange(event, index) {
        const invoiceDrugname = event.target.value;
        setSelectedDrug(invoiceDrugname);

        try {
            const response = await fetch(`http://localhost:3001/admin/drug/${invoiceDrugname}`);
            const data = await response.json();
            setDrugData(data);
        } catch (err) {
            console.log(err);
        }

        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    medicineName: invoiceDrugname,
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
                    amount: row.packaging * newRate || 0,

                };
            }
            return row;
        });
        setRows(newRows);
    };

    // Handles the discount values
    const handleDiscountChange = (e, index) => {
        const newDiscount = parseFloat(e.target.value);
        console.log(newDiscount);
        const newRows = rows.map((row, i) => {
            console.log("this amount", row.amount, "and this is discount offered", newDiscount, "=", row.netTotal)
            if (i === index) {
                return {
                    ...row,
                    discount: newDiscount,
                    netTotal: row.amount - newDiscount
                };
            }
            return row;
        });
        setRows(newRows);
    };

    // handles paid amount
    const handlePaidMoney = (e, index) => {
        const paid = e.target.value;
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    paid: paid,
                };
            }
            return row;
        });
        setRows(newRows);
    };

    // Handles change
    const handleChange = (e, index) => {
        const change = e.target.value;
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return {
                    ...row,
                    change: change,
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

    const [fieldsData, setFieldsData] = useState({})

    useEffect(() => {
        // Update formData state with new fieldsData
        setFormData({
            ...formData,
            fieldsData
        });
    }, [fieldsData]);






    const handleGenerateInvoice = async () => {

        try {
            // Create invoice object
            const invoiceObj = {
                invoiceNumber,
                customer: selectedCustomer,
                paymentType,
                date,
                contact,
                total: rows.reduce((acc, row) => acc + row.netTotal, 0),
                discount: rows.reduce((acc, row) => acc + row.discount, 0),
                items: rows,
                paid,
                change,
            };

            console.log(invoiceObj)

            // Send invoice to backend
            const response = await fetch("http://localhost:3001/admin/invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(invoiceObj),
            });

            const data = await response.json();
            setInvoice(data);

            // Print the generated invoice
            window.print();
            // reset the form fields
            setSelectedCustomer("");
            setInvoiceNumber("");
            setPaymentType("");
            setDate("");
            setContact("")
            setRows([{ medicineName: "", packaging: "", batchID: "", expiryDate: "", rate: "", amount: "" }]);
            console.log(invoice, "and data", data)
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="">
            <div className="flex items-center justify-between px-4 ">
                <h1 className="text-lg font-bold">Add Invoice</h1>
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
                <form className="grid grid-cols-3 gap-4" >
                    <div className="block mb-4">
                        <label
                            className="block mb-2 font-bold text-gray-700"
                            htmlFor="supplier-select"
                        >
                            Customer Name:
                        </label>
                        <select
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="supplier-select"
                            value={selectedCustomer}
                            onChange={(e) => setSelectedCustomer(e.target.value)}
                        >
                            <option value="">Select a Customer</option>
                            {customers.map((customer, index) => (
                                <option key={index} value={customer.name}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div class="block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="address-name">
                            Address
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="supplier-name"
                            type="text"
                            placeholder="Enter supplier name"
                        />
                    </div>
                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="invoice-number">
                            Invoice Number
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="invoice-number"
                            type="text"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            placeholder="Enter invoice number"
                        />
                    </div>
                    <div class="block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="payment-type">
                            Payment Type
                        </label>
                        <select
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="payment-type"
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                        >

                            <option value="">Select payment type</option>
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                    <div class="block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="date">
                            Date
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Select date"
                        />
                    </div>
                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="contact-number">
                            Contact Number
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="contact-number"
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Enter contact number"
                        />
                    </div>
                    <div className="flex justify-start mt-2 pt-7">
                        <button type="submit" className="w-1/4 h-10 text-white bg-blue-500 rounded-lg focus:outline-none" >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <hr className="my-4 font-bold border-green-500" />

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
                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                            Discount
                        </th>
                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                            Net Amount
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
                            {/* <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="Quantity"
                                    placeholder="Rate"
                                    className='w-[100px] px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'

                                />

                            </td> */}
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
                                <input
                                    type="number"
                                    name="Discount"
                                    placeholder="Discount"
                                    value={row.discount}
                                    onChange={(e) => handleDiscountChange(e, index)}
                                    className='w-[100px] px-3 py-2 border border-blue-500 focus:outline-none focus:border-blue-600'

                                />

                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="Total"
                                    placeholder="Net Total"
                                    value={row.netTotal}
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
            <hr className="my-4 font-bold border-green-500" />

            {/* <hr className="my-4 border-green-500" /> */}

            <br />

            {/* <div className="flex float-right gap-4">
                <div class=" block mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="total-amount">
                        Total Amount
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="total-amount"
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div class=" block mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="total-discount">
                        Total Discount
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="invoice-number"
                        type="text"
                        placeholder="0"
                    />
                </div>
                <div class=" block mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="net-total">
                        Net Total
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="invoice-number"
                        type="text"
                        placeholder="0"

                    />
                </div>
            </div> */}

            <div className="pb-16 mt-16">

                <div>
                    <button onClick={handleGenerateInvoice} className="w-32 py-2 ml-5 text-white bg-green-500 focus:outline-none">
                        Save
                    </button>
                </div>

                <div className="float-right">
                    <div class="  mb-4">
                        <label class=" text-gray-700 font-bold mb-2" for="total-amount">
                            Paid Amount
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="paid"
                            type="text"
                            placeholder="0"
                            value={paid}
                            onChange={(e) => setPaid(e.target.value)}
                        />
                    </div>
                    <div class=" mb-4">
                        <label class=" text-gray-700 font-bold mb-2" for="total-discount">
                            Change
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="change"
                            type="text"
                            value={change}
                            onChange={(e) => setChange(e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>

            </div>


        </div>

    );
};

export default AddInvoice;