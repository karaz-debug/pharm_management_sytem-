import Link from 'next/link';
import React, { useState } from 'react';
const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if (res.status === 201) {
                console.log(data.message);
                // Clear the form fields
                setUser({ name: '', email: '', role: '', password: '', confirmPassword: '' });
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form className="p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="mb-4 text-lg font-medium">Sign Up</h2>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">
                        Name:
                        <input
                            className="w-full p-2 border border-gray-400"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">
                        Email:
                        <input
                            className="w-full p-2 border border-gray-400"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <select className="w-full p-2 border border-gray-400" name="role" value={user.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="monitor">Monitor</option>
                </select>

                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">
                        Password:
                        <input
                            className="w-full p-2 border border-gray-400"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">
                        Confirm Password:
                        <input
                            className="w-full p-2 border border-gray-400"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                    Sign Up
                </button>
                <div className="mt-4 text-center">
                    If you have an account? <Link href="/Login" className="text-indigo-500 hover:underline">Login</Link>
                </div>

            </form>
        </div>
    );
}

export default SignUp;

