import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
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
            const res = await fetch('http://localhost:3001/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if (res.status === 201) {
                setUser({ email: '', password: '' });
                // Save the token in local storage
                localStorage.setItem('token', data.token);

                router.push('/admin')

            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form className="p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="mb-4 text-lg font-medium">Login</h2>
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
                <div className="flex items-center mb-4">
                    <input type="checkbox" className="mr-2 form-checkbox" />
                    <label>Remember me</label>
                </div>
                <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                    Login
                </button>
                <div className="mt-4 text-center">
                    Don't have an account? <Link href="/SignUp" className="text-indigo-500 hover:underline">Sign up</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;

