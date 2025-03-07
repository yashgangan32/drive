import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UploadMediaForm from '../components/UploadMediaForm'; // Adjust the path if needed

const Home = () => {
    const location = useLocation();
    const user = location.state?.user || { name: 'User Name' };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [uploadFormOpen, setUploadFormOpen] = useState(false);

    // Helper to capitalize each word in a string
    const capitalizeWords = (str) =>
        str
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Fetch users from the backend on mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/list/userlist?userId=${user._id}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users);
                } else {
                    console.error('Failed to fetch users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [user._id]);

    const handleUploadMedia = () => {
        setUploadFormOpen(true);
    };

    const handleCloseUploadForm = () => {
        setUploadFormOpen(false);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Desktop Sidebar */}
            <aside
                className={`bg-purple-800 text-white transition-all duration-300 hidden md:flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'
                    }`}
            >
                {/* Profile Section */}
                <div className="p-4 flex items-center justify-center border-b border-purple-700">
                    <img className="w-12 h-12 rounded-full" src="/user.png" alt="Profile" />
                    {sidebarOpen && (
                        <span className="ml-4 font-semibold">{capitalizeWords(user.name)}</span>
                    )}
                </div>

                {/* Navigation List */}
                <nav className="flex-1 mt-4">
                    <ul>
                        {['Dashboard', 'Profile', 'Messages', 'Settings', 'Logout'].map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-purple-700 transition cursor-pointer"
                            >
                                {sidebarOpen ? item : item.charAt(0)}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sidebar Toggle */}
                <div className="p-4 border-t border-purple-700">
                    <button
                        onClick={toggleSidebar}
                        className="w-full py-2 bg-purple-700 rounded hover:bg-purple-600 transition"
                    >
                        {sidebarOpen ? 'Hide' : 'Show'}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
            <aside
                className={`md:hidden fixed top-0 left-0 w-64 h-full bg-purple-800 text-white p-4 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="w-12 h-12 rounded-full" src="/user.png" alt="Profile" />
                        <span className="ml-4 font-semibold">{capitalizeWords(user.name)}</span>
                    </div>
                    <button onClick={toggleSidebar} className="text-white text-xl">
                        &times;
                    </button>
                </div>
                <nav className="mt-6">
                    <ul>
                        {['Dashboard', 'Profile', 'Messages', 'Settings', 'Logout'].map((item, index) => (
                            <li
                                key={index}
                                className="py-2 px-2 hover:bg-purple-700 rounded transition cursor-pointer"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-grow">
                {/* Header */}
                <header className="bg-white shadow p-4 flex items-center justify-between md:justify-start">
                    {/* Mobile Sidebar Toggle */}
                    <button onClick={toggleSidebar} className="md:hidden mr-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-purple-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-extrabold">
                        <span className="text-gray-800">Hello</span>
                        <span className="ml-2 text-purple-600">{capitalizeWords(user.name)}</span>
                    </h1>
                </header>

                {/* Users List */}
                <main className="flex-grow p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Users</h2>
                        <button
                            onClick={handleUploadMedia}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                        >
                            Upload Media
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {users.map((userItem) => (
                            <div
                                key={userItem._id}
                                className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300"
                            >
                                <img
                                    src="/user.png"
                                    alt={userItem.name}
                                    className="w-16 h-16 rounded-full mx-auto"
                                />
                                <h3 className="text-center mt-4 font-semibold text-gray-800">
                                    {userItem.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Upload Media Form Modal */}
            {uploadFormOpen && (
                <UploadMediaForm
                    userId={user._id}
                    onClose={handleCloseUploadForm}
                    
                />
            )}
        </div>
    );
};

export default Home;
