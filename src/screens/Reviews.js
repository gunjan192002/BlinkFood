import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaUserCircle } from 'react-icons/fa'; // Importing a user icon from react-icons

export default function Reviews() {
    const [data, setData] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await fetch("https://gofood-1-jhy3.onrender.com/api/viewreview", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div 
            className="min-h-screen bg-cover bg-center" 
            style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            }}
        >
            <Navbar />
            <div className="container mx-auto py-8 px-4 my-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "> {/* Increased gap between comments */}
                    {data.length > 0 ? (
                        data.map((dt, i) => (
                            <div 
                                key={i} 
                                className="bg-white my-2 p-4 rounded-lg shadow-md border border-gray-300 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                                style={{ maxWidth: '90%', borderRadius: '15px' }} // Rounded borders
                            >
                                <div className="flex items-center mb-4">
                                    <FaUserCircle className="text-black text-2xl mr-2" />
                                    <p className="text-black font-bold text-lg">
                                        {dt.name}
                                    </p>
                                </div>
                                <p className="text-black text-base">
                                    {dt.comment}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 col-span-full">No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
