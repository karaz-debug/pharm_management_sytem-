import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
    const [stocks, setStock] = useState([]);
    const [outStock, setOutStock] = useState([]);

    console.log("this is out of stock drugs", outStock)

    useEffect(() => {
        fetch("http://localhost:3001/admin/stock")
            .then(res => res.json())
            .then(data => setStock(data.stocks))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/admin/drugOutofStock")
            .then(res => res.json())
            .then(data => setOutStock(data))
            .catch(err => console.log(err));
    }, []);




    const [dailySales, setDailySales] = useState([]);
    const [dailyPurchases, setDailyPurchases] = useState([]);

    const [Orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [patients, setPatients] = useState([]);



    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [dailySalesResponse, dailyPurchasesResponse, Invoice, Customer, patient] = await Promise.all([
                    fetch('http://localhost:3001/admin/dailySales'),
                    fetch('http://localhost:3001/admin/dailyPurchases'),
                    fetch('http://localhost:3001/admin/invoices'),
                    fetch('http://localhost:3001/admin/customer'),
                    fetch('http://localhost:3001/monitor/patient'),
                ]);

                const dailySalesData = await dailySalesResponse.json();
                const dailyPurchasesData = await dailyPurchasesResponse.json();
                const outOfStockMedicinesData = await outOfStockMedicinesResponse.json();
                const ToatlOrders = await Invoice.json();
                const TotalCustomers = await Customer.json();
                const TotalPateints = await patient.json();

                setDailySales(dailySalesData);
                setDailyPurchases(dailyPurchasesData);
                setOutOfStockMedicines(outOfStockMedicinesData);
                setOrders(ToatlOrders)
                setCustomers(TotalCustomers)
                setPatients(TotalPateints)
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllData();
    }, []);

    const truePatients = patients.patients?.filter(patient => patient.status === true);
    const falsePatients = patients.patients?.filter(patient => patient.status === false);

    // let amount = stocks.reduce((acc, stock) => acc + stock.amount, 0)

    // console.log(stocks.reduce((n, { amount }) => n + amount, 0));

    // console.log("this amout", amount);
    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex-grow">
                <div className="grid grid-cols-4 gap-4 px-4 py-8">
                    {/* Top cards */}
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div >
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Total Customers</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">{customers?.customers?.length}</span>
                                <span className="text-gray-600">customers registered</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Total Orders</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">{Orders?.invoices?.length}</span>
                                <span className="text-gray-600">orders placed</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Total Revenue</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">${dailySales.totalSales - dailyPurchases.totalPurchases}</span>
                                <span className="text-gray-600">total revenue earned</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Daily Summary</h2 >
                            <div className="flex items-center justify-center">
                                <div className="p-4 mr-2 text-white bg-gray-800 rounded-lg">
                                    <h3 className="mb-2 text-xl font-semibold">Sales</h3>
                                    <p className="text-3xl font-bold">{dailySales.dailySales}</p>
                                </div>
                                <div className="p-4 text-white bg-gray-800 rounded-lg">
                                    <h3 className="mb-2 text-xl font-semibold">Purchases</h3>
                                    <p className="text-3xl font-bold">${dailyPurchases.totalPurchases}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Today's Sales</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">${dailySales.totalSales}</span>
                                <span className="text-gray-600">sales made monthly</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800 ">Total Purchases</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500 ">${dailyPurchases.totalPurchases}</span>
                                <span className="text-gray-600">total purchases monthly</span>
                            </div>
                        </div>
                    </div>


                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Total Patients Attended</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">{truePatients?.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md h-[300px] flex justify-center items-center">
                        <div>
                            <h2 className="mb-2 text-lg font-semibold text-gray-800">Total Patients NOT Attended</h2>
                            <div className="flex items-center justify-center">
                                <span className="mr-2 text-3xl font-bold text-red-500">{falsePatients?.length}</span>
                            </div>
                        </div>
                    </div>




                </div>
                {/* Red line /}
<hr className="border-gray-400" />
</div>
<div className="flex flex-col items-center justify-center py-8">
{/ Bottom cards */}
                <div className="grid grid-cols-4 gap-8 px-8 ">
                    <Link href="/admin/Invoice" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.39 4.44l2.18-1.3c.29-.17.63-.06.8.22.17.29.06.63-.22.8l-2.18 1.3c-.87-.52-1.83-.78-2.8-.78-.97 0-1.93.26-2.8.78l-2.18-1.3c-.29-.17-.63-.06-.8.22-.17.29-.06.63.22.8l2.18 1.3c-1.01.91-1.72 2.1-1.99 3.44h-2.3c.3-1.72 1.33-3.22 2.84-4.16l-1.5-2.6c-.17-.29-.06-.63.22-.8.29-.17.63-.06.8.22l1.5 2.6c.96-.44 1.99-.68 3.04-.68s2.08.24 3.04.68l1.5-2.6c.17-.29.51-.39.8-.22.29.17.39.51.22.8l-1.5 2.6c1.51.94 2.54 2.44 2.84 4.16h-2.3c-.27-1.34-.98-2.53-1.99-3.44zM10 12.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Create New Invoice</p>
                    </Link>
                    <Link href="/admin/Customer" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow -md"><svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.5 5.5a2 2 0 012-2h4a2 2 0 012 2v1h1a1 1 0 010 2H16v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8h-1a1 1 0 110-2h1v-1a2 2 0 012-2h4zM5 8v8a1 1 0 001 1h8a1 1 0 001-1V8H5z" />
                        </svg>

                        </div>
                        <p className="mt-2 text-lg text-gray-700">Add New Customer</p>
                    </Link>
                    <Link href="/admin/Drug" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 4a2 2 0 00-1.29.47 1 1 0 00-.21 1.41l.62.94H5a3 3 0 00-3 3v5a3 3 0 003 3h10a3 3 0 003-3v-5a3 3 0 00-3-3h-4.12l.62-.94a1 1 0 00-.21-1.41A2 2 0 0010 4zm2 6a1 1 0 11-2 0 1 1 0 012 0zm-4 0a1 1 0 11-2 0 1 1 0 012 0zm6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Add New Medicine</p>
                    </Link>
                    <Link href="/admin/Supplier" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 3H3v14a2 2 0 002 2h8v-3H5V5h9v7h3V5a2 2 0 00-2-2H6z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Add New Supplier</p>
                    </Link>
                    <Link href="/admin/Stock" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 3H3v14a2 2 0 002 2h8v-3H5V5h9v7h3V5a2 2 0 00-2-2H6z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Add Purchase</p>
                    </Link>
                </div>



                <div className="grid grid-cols-4 gap-8 px-8 mt-8">
                    <Link href="/admin/ManageInvoices" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">
                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17 9a1 1 0 0 0-1 1v7H4V3h7a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Sales Report</p>
                    </Link>
                    <Link href="/admin/StockManagement" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">

                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17 9a1 1 0 0 0-1 1v7H4V3h7a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Purchase Report</p>
                    </Link>
                    <Link href="/doctor/Appointment" className="bg-white flex flex-col h-[300px] items-center justify-center p-4 rounded-lg shadow-md">

                        <div className="p-4 bg-white rounded-full shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17 9a1 1 0 0 0-1 1v7H4V3h7a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1z" />
                            </svg>
                        </div>
                        <p className="mt-2 text-lg text-gray-700">Doctor Report</p>
                    </Link>
                </div>

            </div>
        </div >

    );
}
export default DashboardPage;