import Link from 'next/link';

const ShopByAge: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold bg-custom-blue text-transparent bg-clip-text mb-6">
        Shop by Age
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-10 text-center">
        STEAM-filled boxes of joy for 3-14 years
      </p>

      {/* Age groups */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Age 3-6 */}
        <Link href="/shop/age/3-6">
          <div className="flex items-center justify-center bg-gradient-to-br from-green-400 to-yellow-400 text-white rounded-3xl h-32 w-52 shadow-xl cursor-pointer border-4 border-green-200 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-green-400">
            <span className="text-2xl font-bold hover:text-gray-800 transition-colors duration-300">3-6 Years</span>
          </div>
        </Link>

        {/* Age 6-8 */}
        <Link href="/shop/age/6-8">
          <div className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-400 text-white rounded-3xl h-32 w-52 shadow-xl cursor-pointer border-4 border-blue-200 hover:bg-gradient-to-br hover:from-purple-400 hover:to-blue-400">
            <span className="text-2xl font-bold hover:text-gray-800 transition-colors duration-300">6-8 Years</span>
          </div>
        </Link>

        {/* Age 8-10 */}
        <Link href="/shop/age/8-10">
          <div className="flex items-center justify-center bg-gradient-to-br from-red-400 to-orange-400 text-white rounded-3xl h-32 w-52 shadow-xl cursor-pointer border-4 border-red-200 hover:bg-gradient-to-br hover:from-orange-400 hover:to-red-400">
            <span className="text-2xl font-bold hover:text-gray-800 transition-colors duration-300">8-10 Years</span>
          </div>
        </Link>

        {/* Age 10+ */}
        <Link href="/shop/age/10-plus">
          <div className="flex items-center justify-center bg-gradient-to-br from-teal-400 to-blue-500 text-white rounded-3xl h-32 w-52 shadow-xl cursor-pointer border-4 border-teal-200 hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-400">
            <span className="text-2xl font-bold hover:text-gray-800 transition-colors duration-300">10+ Years</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopByAge;
