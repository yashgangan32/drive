import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

        

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    navigate("/signin"); // Redirect to Sign In page
                } else {
                    alert(data.message || "Registration failed!");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong!");
            }
        };
        


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/authback.png')" }} // Setting background image from public folder
        >
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 animate-slideDown">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Create Account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-purple-700 font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-purple-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-purple-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
