import React from 'react';
import Link from 'next/link';
import Logout from '../logout';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
       
            <div className="md:px-6 lg:px-12 xl:px-16 2xl:px-48 py-8 md:py-12 mt-10 lg:py-20 flex">
                <div className="md:px-4 xl:px-16 w-1/6 hidden md:flex flex-col border-r border-gray-300">
                    <Link href="/account" className="text-blue-500 hover:text-blue-700 active">
                        Dashboard
                    </Link>
                    <Link href="/account/addresses" className="text-blue-500 hover:text-blue-700">
                        Addresses
                    </Link>
                    <Logout />
                </div>

                <div className="  w-full ">
                     {/* <div className="text-gray-800 ">
                        Hi <span className="font-semibold text-lg">Arun</span>!
                    </div>  */}

                        {children} {/* Render the child component here */}
                    </div>
               
            </div>
        </>
    );
};

export default UserLayout;
