import React from 'react';
import Link from 'next/link';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Logout from './logout';
const AccountPage: React.FC = () => {
    return (
        <>
       <Navbar/>
       <div className="md:px-6 lg:px-12 xl:px-16 2xl:px-48 py-8 md:py-12  mt-10 lg:py-20 flex">
            <div className="md:px-4 xl:px-16 w-1/6  hidden md:flex flex-col border-r border-gray-300">
                <Link href="/account" className="text-blue-500 hover:text-blue-700 active">
                    Dashboard
                </Link>
                <Link href="/account/addresses" className="text-blue-500 hover:text-blue-700">
                    Addresses
                </Link>
                <Logout/>
            </div>

            <div className="px-4 md:px-8 xl:px-16 2xl:px-24 w-full md:w-5/6">
                {/* <div className="mb-10 text-gray-800">
                    Hi <span className="font-semibold">Arun</span>!
                    <Logout/>
                </div> */}

                <div className="mb-16">
                  {/* {childcontent} */}
                </div>

            

                
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AccountPage;
