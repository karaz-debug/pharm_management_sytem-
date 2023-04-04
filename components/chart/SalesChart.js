// import 'chartjs-adapter-date-fns';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';


// const SalesChart = () => {
//     const [salesData, setSalesData] = useState({});

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const res = await axios.get('http://localhost:3001/admin/sales-by-date');
//             const formattedData = {};
//             for (const [key, value] of Object.entries(res.data)) {
//                 const date = new Date(key);
//                 const formattedDate = date.toISOString().split('T')[0];
//                 formattedData[formattedDate] = value;
//             }
//             Chart.register(Chart.controllers.line, Chart.scaleService.getScaleConstructor('time'));
//             setSalesData(formattedData);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     fetchData();
// }, []);




//     const chartData = {
//         labels: Object.keys(salesData),
//         datasets: [
//             {
//                 label: 'Total Sales',
//                 data: Object.values(salesData),
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             },
//         ],
//     };
//     const options = {
//         scales: {
//             x: {
//                 type: 'time',
//                 time: {
//                     unit: 'day',
//                     tooltipFormat: 'MMM DD, YYYY',
//                     displayFormats: {
//                         day: 'MMM DD',
//                     },
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     callback: function (value, index, values) {
//                         return '$' + value;
//                     },
//                 },
//             },
//         },
//     };


//     return (
//         <div>
//             <h2>Total Sales by Date</h2>
//             <Line data={chartData} options={options} />
//         </div>
//     );
// };

// export default SalesChart;



import React from "react";
import Chart from "chart.js";

function SalesChart() {
    React.useEffect(() => {
        var config = {
            type: "line",
            data: {
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                ],
                datasets: [
                    {
                        label: 'Total Sales',
                        backgroundColor: "#3182ce",
                        borderColor: "#3182ce",
                        data: [65, 78, 66, 44, 56, 67, 75],
                        fill: false,
                    },
                    {
                        label: 'Total Purchases',
                        fill: false,
                        backgroundColor: "#edf2f7",
                        borderColor: "#edf2f7",
                        data: [40, 68, 86, 74, 56, 60, 87],
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                title: {
                    display: false,
                    text: "Sales Charts",
                    fontColor: "white",
                },
                legend: {
                    labels: {
                        fontColor: "white",
                    },
                    align: "end",
                    position: "bottom",
                },
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                hover: {
                    mode: "nearest",
                    intersect: true,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Month",
                                fontColor: "white",
                            },
                            gridLines: {
                                display: false,
                                borderDash: [2],
                                borderDashOffset: [2],
                                color: "rgba(33, 37, 41, 0.3)",
                                zeroLineColor: "rgba(0, 0, 0, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "rgba(255,255,255,.7)",
                            },
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: "Value",
                                fontColor: "white",
                            },
                            gridLines: {
                                borderDash: [3],
                                borderDashOffset: [3],
                                drawBorder: false,
                                color: "rgba(255, 255, 255, 0.15)",
                                zeroLineColor: "rgba(33, 37, 41, 0)",
                                zeroLineBorderDash: [2],
                                zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
    }, []);
    return (
        <>
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded shadow-lg bg-blueGray-700">
                <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
                    <div className="flex flex-wrap items-center">
                        <div className="relative flex-1 flex-grow w-full max-w-full">
                            <h6 className="mb-1 text-xs font-semibold uppercase text-blueGray-100">
                                Overview
                            </h6>
                            <h2 className="text-xl font-semibold text-white">Sales value</h2>
                        </div>
                    </div>
                </div>
                <div className="flex-auto p-4">
                    {/* Chart */}
                    <div className="relative h-350-px">
                        <canvas id="line-chart"></canvas>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesChart;
