import Link from 'next/link';

const ShopByPrice: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gg-white py-10 px-4 sm:px-6 md:px-8">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-custom-blue  mb-4">
        Shop by Price
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-8 text-center">
        Discover toys that fit every budget
      </p>

      {/* Price Range Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Under $700 */}
        <Link href="/shop/price/under-700">
          <div className="flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-800 rounded-lg h-32 w-full transition-transform transform hover:scale-105 shadow-lg cursor-pointer border-2 border-yellow-200">
            <span className="text-lg md:text-xl font-semibold">Under 700</span>
          </div>
        </Link>

        {/* Under $900 */}
        <Link href="/shop/price/under-900">
          <div className="flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 text-gray-800 rounded-lg h-32 w-full transition-transform transform hover:scale-105 shadow-lg cursor-pointer border-2 border-blue-200">
            <span className="text-lg md:text-xl font-semibold">Under 900</span>
          </div>
        </Link>

        {/* Under $1200 */}
        <Link href="/shop/price/under-1200">
          <div className="flex items-center justify-center bg-gradient-to-br from-green-300 to-green-500 text-gray-800 rounded-lg h-32 w-full transition-transform transform hover:scale-105 shadow-lg cursor-pointer border-2 border-green-200">
            <span className="text-lg md:text-xl font-semibold">Under 1200</span>
          </div>
        </Link>

        {/* Above $1200 */}
        <Link href="/shop/price/above-1200">
          <div className="flex items-center justify-center bg-gradient-to-br from-red-300 to-red-500 text-gray-800 rounded-lg h-32 w-full transition-transform transform hover:scale-105 shadow-lg cursor-pointer border-2 border-red-200">
            <span className="text-lg md:text-xl font-semibold">Above 1200</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopByPrice;
