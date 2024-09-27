import Image from 'next/image';

const AwardWinning: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-10 px-4  sm:px-6 md:px-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-custom-blue mb-4 text-center">
      Award-Winning Toys Heart-Winning Games 
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 text-center">
        Sustainability | 21st-century skills | Infinite hours of screen-free time
      </p>

      {/* Award Logos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/logo1.webp"
            alt="Award Logo 1"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/logo2.webp"
            alt="Award Logo 2"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/logo3.webp"
            alt="Award Logo 3"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/logo4.webp"
            alt="Award Logo 4"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/logo5.webp"
            alt="Award Logo 5"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
        <div className="w-20 sm:w-28 md:w-32 lg:w-36 xl:w-40">
          <Image
            src="/award_logo/time_1.webp"
            alt="Award Logo 6"
            width={150}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AwardWinning;
