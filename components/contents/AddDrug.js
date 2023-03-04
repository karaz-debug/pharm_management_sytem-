import { useState } from 'react';

const AddDrug = () => {
    const [medicine, setMedicine] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setMedicine({
            ...medicine,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/admin/drugs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicine),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between px-4 ">
                <h1 className="text-lg font-bold">Add Medicine</h1>
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
                <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
                    <div class="block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="Medicine-name">
                            Medicine name
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={medicine.name}
                            placeholder=" Medicine name"
                        />
                    </div>
                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="Packaging">
                            Packaging
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="Packaging"
                            name="packaging"
                            onChange={handleChange}
                            value={medicine.packaging}
                            placeholder="Enter Packaging"
                        />
                    </div>

                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="Batch-ID">
                            Batch ID
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="BatchID"
                            name="BatchID"
                            onChange={handleChange}
                            value={medicine.BatchID}
                            placeholder="Enter Batch ID"
                        />
                    </div>

                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for=" Ex date">
                            Ex date
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id=" Exdate"
                            type="date"
                            name="Exdate"
                            onChange={handleChange}
                            value={medicine.Exdate}
                            placeholder="Enter  Ex date"
                        />
                    </div>
                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="invoice-number">
                            Supplier
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="supplier"
                            name="supplier"
                            type="text"
                            onChange={handleChange}
                            value={medicine.Supplier}
                            placeholder="Enter Supplier"
                        />
                    </div>
                    <div class=" block mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="invoice-number">
                            Quantity
                        </label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="Quantity"
                            name="Quantity"
                            type="number"
                            onChange={handleChange}
                            value={medicine.Quantity}
                            placeholder="Enter Quantity"
                        />
                    </div>
                    <div className="flex justify-center pt-7">
                        <button
                            type='submit'
                            className="w-24 py-2 text-white bg-blue-500 focus:outline-none">
                            Add
                        </button>
                    </div>
                </form>
            </div>

            <hr className="my-4 border-green-500" />







        </div>

    );
};

export default AddDrug;