import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const router = useRouter();

    return (
        // Top Menu and close content
        <aside
            className={`bg-gray-800 shadow-md w-1/4 fixed  ${sidebarOpen ? "block h-[100vh] z-10" : "hidden"
                }`}
        >
            <div className="flex justify-between px-6 py-4 pr-3 mt-2 mb-10 sm:px-4">
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <a aria-current="page" class="block active" href="/">
                    <svg width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                            <linearGradient
                                x1="28.538%"
                                y1="20.229%"
                                x2="100%"
                                y2="108.156%"
                                id="logo-a"
                            >
                                <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%"></stop>
                                <stop stop-color="#A5B4FC" offset="100%"></stop>
                            </linearGradient>
                            <linearGradient
                                x1="88.638%"
                                y1="29.267%"
                                x2="22.42%"
                                y2="100%"
                                id="logo-b"
                            >
                                <stop stop-color="#38BDF8" stop-opacity="0" offset="0%"></stop>
                                <stop stop-color="#38BDF8" offset="100%"></stop>
                            </linearGradient>
                        </defs>
                        <rect fill="#6366F1" width="32" height="32" rx="16"></rect>
                        <path
                            d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                            fill="#4F46E5"
                        ></path>
                        <path
                            d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                            fill="url(#logo-a)"
                        ></path>
                        <path
                            d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                            fill="url(#logo-b)"
                        ></path>
                    </svg>
                </a>
            </div>
            {/* side middle content */}
            <div className="px-6 py-4">
                <ul class="mt-3">
                    <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0 bg-slate-900">
                        <Link href="/admin" class="block text-slate-200  truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                        <path class="fill-current  !text-indigo-500" d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"></path>
                                        <path class="fill-current  text-indigo-600" d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"></path>
                                        <path class="fill-current  text-indigo-200" d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"></path>
                                    </svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                                </div>

                            </div>
                        </Link>

                    </li>
                    <li class="px-3 my-2 py-2 rounded-sm mb-0.5 last:mb-0 ">
                        <Link href="/admin/DrugManagement" class="block text-slate-200  truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"><path class="fill-current text-slate-400 false" d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"></path><path class="fill-current text-slate-700 false" d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"></path><path class="fill-current text-slate-600 false" d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"></path></svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Drugs</span>
                                </div>

                            </div>
                        </Link>

                    </li>

                    <li class="px-3 py-2 my-2 rounded-sm mb-0.5 last:mb-0 ">
                        <Link href="/admin/CategoryManagement" class="block text-slate-200 truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"><path class="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z"></path><path class="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z"></path></svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Category</span>
                                </div>

                            </div>
                        </Link>

                    </li>
                    <li class="px-3 py-2 my-2 rounded-sm mb-0.5 last:mb-0 ">
                        <Link href="/admin/StockManagement" class="block text-slate-200 truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"><path class="fill-current text-slate-600" d="M19 5h1v14h-2V7.414L5.707 19.707 5 19H4V5h2v11.586L18.293 4.293 19 5Z"></path><path class="fill-current text-slate-400" d="M5 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM5 23a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm14 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"></path></svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Stock</span>
                                </div>

                            </div>
                        </Link>

                    </li>

                    <li class="px-3 py-2 my-2 rounded-sm mb-0.5 last:mb-0 ">
                        <Link href="/admin/UserManagement" class="block text-slate-200  truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"><circle class="fill-current text-slate-600 false" cx="16" cy="8" r="8"></circle><circle class="fill-current text-slate-400 false" cx="8" cy="16" r="8"></circle></svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">User</span>
                                </div>

                            </div>
                        </Link>

                    </li>
                    <li class="px-3 py-2 my-2 rounded-sm mb-0.5 last:mb-0 ">
                        <Link href="/admin/ReversalNotifications" class="block text-slate-200  truncate transition duration-150 hover:text-slate-200">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24"><path class="fill-current text-slate-400 false" d="M13 6.068a6.035 6.035 0 0 1 4.932 4.933H24c-.486-5.846-5.154-10.515-11-11v6.067Z"></path><path class="fill-current text-slate-700 false" d="M18.007 13c-.474 2.833-2.919 5-5.864 5a5.888 5.888 0 0 1-3.694-1.304L4 20.731C6.131 22.752 8.992 24 12.143 24c6.232 0 11.35-4.851 11.857-11h-5.993Z"></path><path class="fill-current text-slate-600 false" d="M6.939 15.007A5.861 5.861 0 0 1 6 11.829c0-2.937 2.167-5.376 5-5.85V0C4.85.507 0 5.614 0 11.83c0 2.695.922 5.174 2.456 7.17l4.483-3.993Z"></path></svg>
                                    <span class="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Reports</span>
                                </div>

                            </div>
                        </Link>

                    </li>

                </ul>

            </div>
        </aside>
    );
};

export default Sidebar;
