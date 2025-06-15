'use client';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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
                <div className="w-full bg-white p-5 grid grid-cols-2 gap-4">
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