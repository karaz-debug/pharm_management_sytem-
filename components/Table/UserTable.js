import { Avatar } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const userTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [users, setusers] = useState([]);
    const [error, setError] = useState('')

    console.log(users)



    // console.log(users[0].active)


    useEffect(() => {
        const fetchusers = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/users');
                setusers(data.users);
            } catch (error) {
                console.error(error);
            }
        };

        fetchusers();
    }, []);
    const indexOfLastuser = currentPage * usersPerPage;
    const indexOfFirstuser = indexOfLastuser - usersPerPage;


    const searchUser = useSelector((state) => state.usersearch.searchUser);
    const searchUserResult = useSelector((state) => state.usersearch.searchCategoryResult);
    const currentusers = users.slice(indexOfFirstuser, indexOfLastuser);
    const userToRender = searchUser ? searchUserResult : currentusers;

    console.log(userToRender)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Activate user
    const handleActivate = (id) => {
        axios.put(`http://localhost:3001/admin/user/activate/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                    console.log('successfully activated')
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The user entry with the specified ID does not exist.');
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            });


    }


    // Suspend a user
    const handleSuspend = (id) => {
        console.log(id)
        axios.put(`http://localhost:3001/admin/user/deativate/${id}`, {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                    console.log('successfully de-activated')
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The user entry with the specified ID does not exist.');
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
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Avatar
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                email
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                role
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                active
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Registered At
                            </th>

                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Id
                            </th>



                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Activate
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Suspend
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {userToRender?.map((user) => (

                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    <Avatar src={'https://flowbite.com/docs/images/logo.svg'} />
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {user?.active ? '✔' : 'X'}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {moment(user.createdAt).format('YYYY-MM-DD')}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {user._id}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleActivate(user._id)} className="text-green-500 hover:text-green-700" href="#">
                                        Activate
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleSuspend(user._id)} className="text-red-500 hover:text-red-700" href="#">
                                        Suspend
                                    </a>
                                </td>
                            </tr>



                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => {
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

export default userTable;

