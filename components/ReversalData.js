import React from 'react'

function ReversalData() {
    return (
        <div class="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 mt-6">
            <header class="px-5 py-4 border-b border-slate-100">
                <h2 class="font-semibold text-slate-800">Reason for Reversal</h2>
            </header>
            <div class="px-5 py-3">
                <div class="flex items-start">
                    <div class="text-3xl font-bold text-slate-800 mr-2">449</div>
                    <div class="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">-22%</div>
                </div>
            </div>
            <div class="grow">
                <div class="grow flex flex-col justify-center">
                    <div>
                        <canvas width="907" height="48" style={{ display: "block", boxSizing: "border-box", height: "48px", width: "907px" }}></canvas>
                    </div>
                    <div class="px-5 pt-2 pb-2">
                        <ul class="text-sm divide-y divide-slate-100">
                            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 0.625 + "rem", paddingBottom: 0.625 + "rem" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: 0.75 + "rem", height: 0.75 + "rem", borderRadius: 0.125 + "rem", marginRight: 0.75 + "rem", backgroundColor: "rgb(99, 102, 241)" }}></div>
                                    <div>Having difficulties using the product</div>
                                </div>
                                <div style={{ fontWeight: 500, marginLeft: 0.75 + "rem", color: "rgb(99, 102, 241)" }}>29%</div>
                            </li>

                            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 0.625 + "rem", paddingBottom: 0.625 + "rem" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: 0.75 + "rem", height: 0.75 + "rem", borderRadius: 0.125 + "rem", marginRight: 0.75 + "rem", backgroundColor: "rgb(99, 102, 241)" }}></div>
                                    <div>Missing features I need</div>
                                </div>
                                <div style={{ fontWeight: 500, marginLeft: 0.75 + "rem", color: "rgb(99, 102, 241)" }}>22%</div>
                            </li>

                            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 0.625 + "rem", paddingBottom: 0.625 + "rem" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: 0.75 + "rem", height: 0.75 + "rem", borderRadius: 0.125 + "rem", marginRight: 0.75 + "rem", backgroundColor: "rgb(99, 102, 241)" }}></div>
                                    <div>Not satisfied about the quality of the product</div>
                                </div>
                                <div style={{ fontWeight: 500, marginLeft: 0.75 + "rem", color: "rgb(99, 102, 241)" }}>18%</div>
                            </li>

                            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 0.625 + "rem", paddingBottom: 0.625 + "rem" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: 0.75 + "rem", height: 0.75 + "rem", borderRadius: 0.125 + "rem", marginRight: 0.75 + "rem", backgroundColor: "rgb(99, 102, 241)" }}></div>
                                    <div>The product doesn’t look as advertised</div>
                                </div>
                                <div style={{ fontWeight: 500, marginLeft: 0.75 + "rem", color: "rgb(99, 102, 241)" }}>14%</div>
                            </li>

                            <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 0.625 + "rem", paddingBottom: 0.625 + "rem" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ width: 0.75 + "rem", height: 0.75 + "rem", borderRadius: 0.125 + "rem", marginRight: 0.75 + "rem", backgroundColor: "rgb(99, 102, 241)" }}></div>
                                    <div>Other</div>
                                </div>
                                <div style={{ fontWeight: 500, marginLeft: 0.75 + "rem", color: "rgb(99, 102, 241)" }}>16%</div>
                            </li>
                        </ul>
                        <ul class="text-sm divide-y divide-slate-100"></ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReversalData
