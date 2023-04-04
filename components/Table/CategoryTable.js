import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const CategoryTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryPerPage] = useState(5);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data } = await axios.get('http://localhost:3001/admin/category');
                setCategory(data.categories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
    }, []);
    const indexOfLastStock = currentPage * categoryPerPage;
    const indexOfFirstStock = indexOfLastStock - categoryPerPage;


    const searchCategory = useSelector((state) => state.categorysearch.searchCategory);
    const searchCategoryResult = useSelector((state) => state.categorysearch.searchCategoryResult);
    const currentCategory = category.slice(indexOfFirstStock, indexOfLastStock);
    const categoryToRender = searchCategory ? searchCategoryResult : currentCategory;

    // console.log("serach category", searchCategory, "result", searchCategoryResult)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Edit Stock
    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowModal(true);

    }


    // Delete a stock
    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3001/admin/category/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // success, show a message or redirect to a success page
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    setError('Unauthorized: You are not logged in or do not have the admin role.');
                } else if (err.response.status === 404) {
                    setError('Not Found: The stock entry with the specified ID does not exist.');
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
                                Name
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Edit
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {categoryToRender.map((category) => (
                            <tr>

                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {category.Name}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {category.Description}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleEdit(category)} className="text-green-500 hover:text-green-700" >
                                        Edit
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <a onClick={() => handleDelete(category._id)} className="text-red-500 hover:text-red-700" >
                                        Delete
                                    </a>
                                </td>
                            </tr>



                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(category.length / categoryPerPage) }, (_, index) => {
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

export default CategoryTable;

