import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import HomeCarousel from "./components/HomeCarousel";
import ShopByAge from "./components/ShopByAge";
import AwardWinningComponent from "./components/AwardWinningComponent";
import ShopByPrice from "./components/ShopByPrice";
import LatestArrivals from "./components/LatestArrivals";
const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
       <HomeCarousel/>
       <ShopByAge/>
       <LatestArrivals/>
       <ShopByPrice/>
       <AwardWinningComponent/>
      </main>
      <Footer />
    </>
  );
};

export default Home;
