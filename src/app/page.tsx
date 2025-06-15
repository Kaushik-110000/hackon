import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "./components/ImageCarousel";

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
      {/* Header - Pixel-perfect Amazon style */}
      <header className="w-full bg-[#131921] flex items-center px-4 py-3">
        {/* Logo and Location */}
        <div className="flex items-center min-w-[270px]">
          <Image src="/logo-light.png" alt="logo" width={98} height={30} className="object-contain" />
          <div className="ml-2 flex flex-col justify-center">
            <span className="flex items-center text-xs text-gray-200">
              <svg className="w-4 h-4 mr-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Delivering to Jaunpur 222001
            </span>
            <span className="text-xs text-white font-bold leading-tight cursor-pointer hover:underline">Update location</span>
          </div>
        </div>
        {/* Search Bar */}
        <form className="flex flex-1 mx-4 w-full">
          <div className="flex w-full">
            <select className="rounded-l-md bg-gray-100 text-gray-700 text-sm px-2 border-r border-gray-300 focus:outline-none min-w-[60px]">
              <option>All</option>
            </select>
            <input type="text" placeholder="Search Amazon.in" className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none bg-white" />
            <button type="submit" className="bg-[#febd69] rounded-r-md px-4 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>
          </div>
        </form>
        {/* Right Side: Language, Account, Orders, Cart */}
        <div className="flex items-center space-x-6 min-w-[420px] justify-end">
          {/* Language */}
          <div className="flex items-center cursor-pointer">
            <Image src="https://flagcdn.com/in.svg" alt="IN" width={20} height={14} className="mr-1 rounded-sm" />
            <span className="text-xs font-bold">EN</span>
            <svg className="w-3 h-3 ml-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
          </div>
          {/* Account & Lists */}
          <div className="flex flex-col cursor-pointer">
            <span className="text-xs">Hello, sign in</span>
            <span className="font-bold text-sm leading-tight">Account & Lists <svg className="inline w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg></span>
          </div>
          {/* Orders */}
          <div className="flex flex-col cursor-pointer">
            <span className="text-xs">Returns</span>
            <span className="font-bold text-sm leading-tight">& Orders</span>
          </div>
          {/* Cart */}
          <div className="flex items-center cursor-pointer relative">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" /><circle cx="7" cy="21" r="1" /><circle cx="17" cy="21" r="1" /></svg>
            <span className="absolute left-5 top-0 bg-orange-400 text-xs font-bold rounded-full px-1 text-black">0</span>
            <span className="ml-1 text-xs font-bold">Cart</span>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="w-full bg-[#232f3e] text-white text-sm opacity-80">
        <ul className="flex flex-wrap items-center px-6 py-2 space-x-4 overflow-x-auto">
          <li className="font-semibold">☰ All</li>
          <li>MX Player</li>
          <li>Sell</li>
          <li>Bestsellers</li>
          <li>Mobiles</li>
          <li>Today's Deals</li>
          <li>Prime</li>
          <li>Customer Service</li>
          <li>Fashion</li>
          <li>New Releases</li>
          <li>Amazon Pay</li>
          <li>Electronics</li>
          <li>Home & Kitchen</li>
          <li>Computers</li>
          <li>Car & Motorbike</li>
          <li>Books</li>
        </ul>
      </nav>

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
