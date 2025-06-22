'use client';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";



const ImageCarousel = () => {

     const router = useRouter();
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
        <section className="w-[98%] flex flex-col items-center relative h-full mx-auto">
            <Slider {...settings} className="w-full">
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/af_pc_2x._CB792409181_.jpg" alt="" className="w-full" />
                </div>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Unrec/Shoes/1/30003._CB542120021_.jpg" alt="" className="w-full" />
                </div>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg" alt="" className="w-full" />
                </div>
                <div>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044814._CB551384116_.jpg" alt="" className="w-full" />
                </div>
            </Slider>
        
            <div className="relative -mt-[40vh] grid grid-cols-4 grid-rows-2 gap-4 p-2 w-full bg-gradient-to-b from-transparent via-[#E3E6E6] via-20% to-[#E3E6E6] to-100%">
                

                
                 
                <div  
                 onClick={() => router.push('/search/led%20tv')}
                   className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Get your desired TV screen size | Starting ₹6,999</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/xPC_QC_186x116_1._SY116_CB792574578_.jpg" alt="Budget TVs | Save extra with No Cost EMI" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Budget TVs | Save extra with No Cost EMI</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/xPC_QC_186x116_2._SY116_CB792574578_.jpg" alt="4K TVs | Up to 24 months No Cost EMI" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">4K TVs | Up to 24 months No Cost EMI</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/big_screens.jpg" alt="Big Screens | Free installation" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Big Screens | Free installation</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ultra_premium_tvs.jpg" alt="Ultra Premium TVs | Up to 50% off" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Ultra Premium TVs | Up to 50% off</span>
                        
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                       
                     
                    </div>
                </div>

                
                
                <div   onClick={() => router.push('/search/appliances')}
                className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Appliances for your home | Up to 55% off</h2>
                    </div>

                     
                    <div className="flex flex-col items-center">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg" alt="Air conditioners" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Air conditioners</span>
                    </div> 
                 

                    <div className="flex flex-col items-center">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08345R1ZW._SY116_CB667322346_.jpg" alt="Refrigerators" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Refrigerators</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B07G5J5FYP._SY116_CB667322346_.jpg" alt="Microwaves" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Microwaves</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg" alt="Washing machines" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Washing machines</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div 
                 onClick={() => router.push('/search/home')}
                
                className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Revamp your home in style</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/cushion_cover.jpg" alt="Cushion covers, bedsheets & more" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Cushion covers, bedsheets & more</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/vases.jpg" alt="Figurines, vases & more" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Figurines, vases & more</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/home storage.jpg" alt="Home storage" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Home storage</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/lighting_solutions.jpg" alt="Lighting solutions" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Lighting solutions</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div  onClick={() => router.push('/search/games')}
                 className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">PlayStation 5 Slim & Accessories | No Cost EMI*</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ps5.jpg" alt="PS5 Slim digital edition" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">PS5 Slim digital edition</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ps5_disc.jpg" alt="PS5 Slim disc edition" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">PS5 Slim disc edition</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ps5_fortnite.jpg" alt="PS5 Slim Fortnite digital edition" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">PS5 Slim Fortnite digital edition</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ps5_dualsense.jpg" alt="PS5 DualSense Wireless Controller" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">PS5 DualSense Wireless Controller</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div   onClick={() => router.push('/search/bathroom%20accessories')}
                className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Under ₹499 | Deals on home improvement essentials</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/cleaning_supplies.jpg" alt="Cleaning" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Under ₹199 | Cleaning supplies</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/bathroom_accessories.jpg" alt="Bathroom accessories" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Under ₹399 | Bathroom accessories</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/home_tools.jpg" alt="Home tools" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Under ₹499 | Home tools</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/wallpapers.jpg" alt="Wallpapers" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Under ₹299 | Wallpapers</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div  onClick={() => router.push('/search/earbuds')}
                 className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Starting ₹149 | Headphones</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/boat.jpg" alt="boAt" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹249 | boAt</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/boult.jpg" alt="boult" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹349 | boult</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/noise.jpg" alt="Noise" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹649 | Noise</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/zebronics.jpg" alt="Zebronics" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹149 | Zebronics</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div 
                 onClick={() => router.push('/search/automotive')}
                className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Automotive essentials | Up to 60% off</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/cleaning_accessories.jpg" alt="Cleaning accessories" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Cleaning accessories</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/tyre.jpg" alt="Tyre & rim care" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Tyre & rim care</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/helmets.jpg" alt="Helmets" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Helmets</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/vaccum_cleaner.jpg" alt="Vacuum cleaner" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Vacuum cleaner</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xl font-bold leading-tight text-black">Starting ₹199 | Amazon Brands & more</h2>
                    </div>
                    <div  
                     onClick={() => router.push('/search/homedecor')}
                     className="flex flex-col items-center">
                        <img src="/assests/bedsheets.jpg" alt="Starting ₹199 | Bedsheets" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹199 | Bedsheets</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/curtains.jpg" alt="Starting ₹199 | Curtains" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Starting ₹199 | Curtains</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/ironing_board.jpg" alt="Minimum 40% off | Ironing board & more" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Minimum 40% off | Ironing board & more</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src="/assests/homw_decor.jpg" alt="Up to 60% off | Home decor" className="w-32 h-20 object-cover rounded mb-1" />
                        <span className="text-xs text-gray-800 text-left w-32">Up to 60% off | Home decor</span>
                    </div>
                    <div className="col-span-2 mt-2">
                        <a href="#" className="text-blue-600 text-sm hover:underline">See more</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

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

export default ImageCarousel; 