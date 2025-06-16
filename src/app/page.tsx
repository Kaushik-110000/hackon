import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "./components/ImageCarousel";
import Nav from "./components/Nav";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="bg-[#E3E6E6] bg-cover bg-center bg-no-repeat">
      <Nav/>
      {/* Main Banner */}
      <ImageCarousel />

      {/* Banner and Cards Section */}
      {/* <section className="relative w-full min-h-[420px] bg-gradient-to-b from-[#f7d7d0] to-[#f7f7f7] flex flex-col justify-end pb-8 overflow-visible">

        <div className="absolute inset-0 flex flex-row items-start justify-between px-8 pt-8 pointer-events-none">

          <button className="pointer-events-auto bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md mt-32 ml-[-20px] border border-gray-200"><svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#131921] mt-4">Under ₹1,499</h1>
            <p className="text-2xl text-[#131921] font-normal mt-2">Budget friendly headphones</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-3xl font-serif text-[#d52b1e]">boat</span>
              <span className="text-3xl font-serif text-[#131921] tracking-widest">BOULT</span>
            </div>
          </div>
          <div className="flex items-end h-full pr-8">
            <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=180&q=80" alt="Earbuds" className="w-32 h-32 object-contain -mb-8" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Headphones" className="w-28 h-28 object-contain -mb-4 ml-[-30px]" />
          </div>
          <button className="pointer-events-auto bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md mt-32 mr-[-20px] border border-gray-200"><svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg></button>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-56">
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Appliances for your home | Up to 55% off</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80" alt="Air conditioners" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Air conditioners</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=120&q=80" alt="Refrigerators" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Refrigerators</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=120&q=80" alt="Microwaves" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Microwaves</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=120&q=80" alt="Washing machines" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Washing machines</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See more</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">Revamp your home in style</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=120&q=80" alt="Cushion covers, bedsheets" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Cushion covers, bedsheets & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=120&q=80" alt="Figurines, vases" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Figurines, vases & more</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=120&q=80" alt="Home storage" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Home storage</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=120&q=80" alt="Lighting solutions" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">Lighting solutions</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">Explore all</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold mb-3">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim disc edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim disc edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=120&q=80" alt="PS5 Slim Fortnite digital edition" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 Slim Fortnite digital edition</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80" alt="PS5 DualSense Wireless Controller" className="w-24 h-16 object-cover rounded mb-1" />
                <span className="text-xs text-gray-700">PS5 DualSense Wireless Controller</span>
              </div>
            </div>
            <a href="#" className="text-blue-600 text-sm mt-auto hover:underline">See all deals</a>
          </div>
          <div className="bg-white rounded shadow-md p-4 flex flex-col min-h-[300px] justify-center items-center">
            <h2 className="text-lg font-bold mb-3 text-left w-full">Sign in for your best experience</h2>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded w-full mt-2 mb-4">Sign in securely</button>
          </div>
        </div>
      </section> */}

      {/* Product Grids */}
      {/* <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-4">
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-3">Appliances for your home | Up to 55% off</h2>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&q=80" alt="Air conditioner" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Air conditioners</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=100&q=80" alt="Refrigerator" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Refrigerators</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=100&q=80" alt="Microwave" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Microwaves</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&q=80" alt="Washing machine" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Washing machines</span>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-3">Revamp your home in style</h2>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1503389152951-9c3d0c6b7a5a?auto=format&fit=crop&w=100&q=80" alt="Cushion covers, bedsheets" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Cushion covers, bedsheets & more</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=100&q=80" alt="Figurines, vases" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Figurines, vases & more</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=100&q=80" alt="Home storage" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Home storage</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=100&q=80" alt="Lighting solutions" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Lighting solutions</span>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-3">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=100&q=80" alt="PS5 Slim digital edition" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">PS5 Slim digital edition</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=100&q=80" alt="PS5 Slim disc edition" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">PS5 Slim disc edition</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1606813909355-684e1bdc1b47?auto=format&fit=crop&w=100&q=80" alt="PS5 Slim Fortnite digital edition" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">PS5 Slim Fortnite digital edition</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=100&q=80" alt="PS5 DualSense Wireless Controller" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">PS5 DualSense Wireless Controller</span>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="text-lg font-bold mb-3">Under ₹499 | Deals on home improvement essentials</h2>
          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=100&q=80" alt="Cleaning supplies" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Under ₹199 | Cleaning supplies</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=100&q=80" alt="Bathroom accessories" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Under ₹399 | Bathroom accessories</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=100&q=80" alt="Home tools" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Under ₹499 | Home tools</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=100&q=80" alt="Wallpapers" className="w-20 h-16 object-cover rounded mb-1" />
              <span className="text-center">Under ₹299 | Wallpapers</span>
            </div>
          </div>
        </section>
      </main> */}
    </div>
  );
}

// Custom arrow components
function CustomNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function CustomPrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-opacity-100 transition-all duration-200"
      onClick={onClick}
    >
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
