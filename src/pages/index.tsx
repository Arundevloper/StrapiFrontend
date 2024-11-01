import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import HomeCarousel from "./components/HomeCarousel";
import ShopByAge from "./components/ShopByAge";
import AwardWinningComponent from "./components/AwardWinningComponent";
import ShopByPrice from "./components/ShopByPrice";
import LatestArrivals from "./components/LatestArrivals";
import { Helmet } from "react-helmet"; // Ensure you're importing Helmet for SEO

const Home: React.FC = () => {
  const productData = {
    meta_title: "Home - LabnBox",
    meta_desc: [{ children: [{ text: "Welcome to LabnBox - Explore our educational kits for all ages!" }] }],
    slug: "home-page",
  };

  const mainImage = "/path/to/default-image.jpg"; // Replace with your homepage image

  return (
    <>
      <Helmet>
        <title>{productData.meta_title}</title>
        <meta name="description" content={productData.meta_desc[0].children[0].text} />
        <meta property="og:title" content={productData.meta_title} />
        <meta property="og:description" content={productData.meta_desc[0].children[0].text} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={mainImage} />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SITE_URL}/products/${productData.slug}`}
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        <HomeCarousel />
        <ShopByAge />
        <LatestArrivals />
        <ShopByPrice />
        <AwardWinningComponent />
      </main>
      <Footer />
    </>
  );
};

export default Home;
