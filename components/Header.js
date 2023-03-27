import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

const Header = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const [notifications, setNotification] = useState([])
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [admistrator, setAdmistrator] = useState(false);

    const handleClickOutside = (e) => {
        if (searchOpen && e.target.id !== "modal") {
            setSearchOpen(true)
        } else {
            setSearchOpen(false)
        }

    }

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch('http://localhost:3001/admin//out-of-stock');
                const data = await response.json();
                setNotification(data.drugsOutOfStock);

            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        }
        fetchNotifications();
    }, []);


    const router = useRouter()
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchOpen]);


    let token;
    if (typeof window !== 'undefined' && window.localStorage) {
        token = window.localStorage.getItem('token');
    }


    const handleSignOut = () => {
        localStorage.removeItem('token');
        // router.push('/');
    };
    return (
        <div className="w-full py-4 bg-gray-800" style={{ position: 'sticky', height: '70px', top: '0', width: '100%' }}>
            <div className="mx-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-100 hover:text-gray-800"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                        <Link href="/" legacyBehavior>
                            <a className="ml-4 text-lg font-bold text-white">
                                ABC Pharm
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center justify-between gap-4 ">
                        <button
                            class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 bg-slate-200"
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-controls="search-modal"
                        >
                            <span class="sr-only">Search</span>
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    class="fill-current text-slate-500"
                                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                                ></path>
                                <path
                                    class="fill-current text-slate-400"
                                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                                ></path>
                            </svg>
                        </button>

                        {/* {searchOpen && (
                            <div id="modal">
                                <div class="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg " style={{ zIndex: 1, }}>
                                    <form class="border-b border-slate-200">
                                        <div class="relative">
                                            <label for="search" class="sr-only">
                                                Search
                                            </label>
                                            <input
                                                id="search"
                                                class="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4"
                                                type="search"
                                                placeholder="Search Anything…"
                                            />
                                            <button
                                                class="absolute inset-0 right-auto group"
                                                type="submit"
                                                aria-label="Search"
                                            >
                                                <svg
                                                    class="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-4 mr-2"
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
                                                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                    <div class="py-4 px-2">
                                        <div class="mb-3 last:mb-0">
                                            <div class="text-xs font-semibold text-slate-400 uppercase px-2 mb-2">
                                                Recent searches
                                            </div>
                                            <ul class="text-sm">
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>Form Builder - 23 hours on-demand video</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>Access Mosaic on mobile and TV</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>Product Update - Q4 2021</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>
                                                            Master Digital Marketing Strategy course
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>Dedicated forms for products</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                                                        </svg>
                                                        <span>Product Update - Q4 2021</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="mb-3 last:mb-0">
                                            <div class="text-xs font-semibold text-slate-400 uppercase px-2 mb-2">
                                                Recent pages
                                            </div>
                                            <ul class="text-sm">
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z"></path>
                                                        </svg>
                                                        <span>
                                                            <span class="font-medium text-slate-800 group-hover:text-white">
                                                                Messages
                                                            </span>{" "}
                                                            - Conversation / … / Mike Mills
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        class="flex items-center p-2 text-slate-800 hover:text-white hover:bg-indigo-500 rounded group"
                                                        href="/#0"
                                                    >
                                                        <svg
                                                            class="w-4 h-4 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 shrink-0 mr-3"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z"></path>
                                                        </svg>
                                                        <span>
                                                            <span class="font-medium text-slate-800 group-hover:text-white">
                                                                Messages
                                                            </span>{" "}
                                                            - Conversation / … / Eva Patrick
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        {/* <button
                            onClick={() => setNotificationOpen(!notificationOpen)}
                            className="ml-3 text-gray-100 hover:text-gray-800"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </button> */}
                        {/* <button
                            onClick={() => setNotificationOpen(!notificationOpen)}
                            class="flex items-center justify-center relative rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            type="button"
                        >
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12v-1a8 8 0 0 0-7-7H8a8 8 0 0 0-7 7v1"></path>
                                <path d="M3.51 9a15.91 15.91 0 0 1 8.49-6"></path>
                                <path d="M12 2L12 12"></path>
                            </svg>
                            <span class="animate-bounce absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                <span>3</span>
                            </span>
                        </button>

                        {notificationOpen && (
                            <div className="absolute w-48 mt-2 bg-white rounded-lg shadow-xl notification">
                                <div className="py-2">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                                    >
                                        Notification 1
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                                    >
                                        Notification 2
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                                    >
                                        Notification 3
                                    </a>
                                </div>
                            </div>
                        )} */}

                        <div class="relative">
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                className="relative flex items-center justify-center text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                type="button"
                            >
                                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 12v-1a8 8 0 0 0-7-7H8a8 8 0 0 0-7 7v1"></path>
                                    <path d="M3.51 9a15.91 15.91 0 0 1 8.49-6"></path>
                                    <path d="M12 2L12 12"></path>
                                </svg>
                                <span class="{{ notifications.length > 0 ? 'animate-bounce' : '' }} absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                                    <span>{notifications.length}</span>
                                </span>
                            </button>

                            {notificationOpen ? (
                                <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                                    <div class="py-2">
                                        {
                                            notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <a href="#" key={index} className="block px-4 py-2 text-gray-800 hover:bg-gray-300">

                                                        <span class="font-bold">{notification.medicineName}</span>
                                                    </a>
                                                ))
                                            ) : (
                                                <p class="px-4 py-2 text-gray-800">No notifications</p>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                        </div>


                        <div className="flex items-center ml-4" >
                            <div class="relative inline-flex">
                                <button
                                    class="inline-flex justify-center items-center group"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onClick={() => setAdmistrator(!admistrator)}
                                >
                                    <img
                                        class="w-8 h-8 rounded-full"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAD/ElEQVR4Ae2axXorRxCFq+by3VyT2NkENTecrC4zMz5A3sIw3mUXfoLQNsywCTOzMSiIhWZ7ZrpSU25NmGFGX/p8UneV8Pzq023E63edg3aWBVHIABgAA2AADIABMAAGwAAYAANw9VU39HTbbQzgurNbNvdv2zKQ6LHbEqBYfAsBerrz27b0b98mGO0FUG+MLi42AJFrdr9je//OHYPJhN1Om7hQehuImCEYAZOJ/M4dA7t2DqaSdnsAFEtvE0+BeQwmaVLJ/O5dA3v2CEbMASqVjzxvQawHEAKCXLJSCXvvnoF9+5x0yo4vgFJe+dv3CMQ4sAQkkCwIYipx2b59gwcOCEYMAeQselPME0tAQNTaGNJzqA4eHDx4yMmk7dgBlMvvKd+TJcBl51oUVrpIJ/OHDg0ePuxkMnaMAFxvfrL6MZBsgnA/i3QlM2kezKTzR444R486WcGIGkBUKLzV8qgllUzCxQPKLuFeWuJFOHp08NhxJ5u1owcold5CvY918kH6oAmF4UCo78dcxj5xwuFLLmdHCTC/0KjVRmUF9L5FSZNuxDFJp4VIROHj2f3Jk0OnTju9ghEBAKtQfDtcAVG4CsGgG11ryp88PpfdyAxnzg719m6MAqDwpvgKP2nkWawShkAo+QlZfunxuWz+7Fnn7PmhC/4Yxkr4h6SIFmZ5EPlKEciVS1KuxyVXvk++y6PyPd/3lL64ynU9Hj3X95Y8d8lnGG/F1wsrp8H6DwHSqesBqJVsZCJEUhRwoGUBIykgkHv0GMzyYFkTIrmbrX+zsPJFz/oKRP8dQCp5HeiDkidFSodFWEhnXbWSREIgt+IyE+IifDFjPb+04ssINvHaNR2dnRcF7nTukaVDjhZpKtAi7Tx8+IL/RWXprpq6dwm/d/+frkA6dR0p0oenUmISpBNJQlQAoS+Ss4Bj1p2oTD87701AqIgArkcLKYi5nJhIIsGAAAmxFSENB7OL46Xa07NL4yCKEmDVynXdnbYEwyImQFRilIH0kW9ZchgBWgA+TM+PFSaf4BFE0QMkE1ezRUAdaH2qy74Ux0ra4NqcHv2q9PjU7Gi8vp1OZ663GACAlAq//xEICb5lcd+YHvlo5PaPxu7Q7uMDYFkrE91XinVAxiC9AgIRDI2p4Xc+vvm9T29tzIzAzxV5hHq6L1+1ar18/CTBRzn1iYHqzeHRiYfqzc8gVOwA5ADFIOcKEclXgMCqNYdHxh6sNbT1WANkUtcSkYW4nKdK7dOR0Qeq9U9BFHeAjo6LV6/pANFk9dOR4ftD620BIN/AIVYqnwyP3F+taevtBLB69fpXXrmxItajkvl/IQNgAAyAATAABsAAGAADYAD+vwDfAQSHHlNp5b1mAAAAAElFTkSuQmCC"
                                        width="32"
                                        height="32"
                                        alt="User"
                                    />
                                    <div class="flex items-center truncate">
                                        <span class="font-medium  ml-2 text-sm text-white truncate"
                                        >ABC Pharm </span>

                                        <svg
                                            class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                        </svg>
                                    </div>
                                </button>

                                {/* administrator modal */}
                                {admistrator && (
                                    <div
                                        class="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 exit-done"
                                        id="admistrator"
                                    >
                                        <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                                            <div class="font-medium text-slate-800">ABC Pharm.</div>
                                            <div class="text-xs text-slate-500 italic">Administrator</div>
                                            <ul>
                                                <li style={{ display: token ? 'none' : 'block' }}>
                                                    <Link href="/Login" className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600">
                                                        Sign in
                                                    </Link>
                                                </li>

                                                <Link href="/" onClick={() => handleSignOut()} className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600">
                                                    Sign Out
                                                </Link>
                                            </ul>

                                        </div>
                                    </div>

                                )}

                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;



