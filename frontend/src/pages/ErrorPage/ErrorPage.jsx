import React from 'react';
import pageNotFound from '../../assets/page_not_found.jpg';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen mt-5 text-center">
            <img className="w-[500px] max-w-full" src={pageNotFound} alt="Page Not Found" />
            <div className="mt-5">
                <h1 className="text-3xl text-black-600 font-bold">404 - Page Not Found</h1>
                <p className=' mt-2 text-black'>Oops! The page you are looking for doesn't exist.</p>
            </div>
            <Link to="/">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-5 cursor-pointer">
                        Go Back Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;