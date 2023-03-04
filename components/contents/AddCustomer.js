import { useState } from 'react';

const AddCustomer = () => {
    const [customer, setCustomer] = useState({});

    console.log(customer)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/admin/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });

        const data = await response.json();
        console.log(data);
    };



    const handleChange = (event) => {
        const { name, value } = event.target
        setCustomer({
            ...customer,
            [name]: value
        })
    }

    return (
        <div className="">
            <div className="flex items-center justify-between px-4 ">
                <h1 className="text-lg font-bold">Add Customer</h1>
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
                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium">Customer Name</label>
                        <input
                            type="text"
                            id="name" name="name"
                            value={customer.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 font-medium">Address</label>
                        <input
                            id="address"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="col-span-2 mt-8 ml-auto">
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Add Customer</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddCustomer;