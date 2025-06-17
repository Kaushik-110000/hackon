import React from 'react'
import Nav from '../../components/Nav'

export default function page() {
    return (
        <div>
            <Nav />
            {/* Amazon Home Categories Bar Section */}
            <div className="w-full bg-white border-b border-gray-200">
                <div className="flex items-center px-8 py-3 space-x-8 overflow-x-auto text-xs text-gray-700">
                    <span className="font-bold text-sm text-gray-800 mr-4">Amazon Home</span>
                    <a href="#" className="hover:text-[#2162A1]">Kitchen & Home Appliances</a>
                    <a href="#" className="hover:text-[#2162A1]">Large Appliances</a>
                    <a href="#" className="hover:text-[#2162A1]">Kitchen & Dining</a>
                    <a href="#" className="hover:text-[#2162A1]">Furniture</a>
                    <a href="#" className="hover:text-[#2162A1]">Home Furnishing</a>
                    <a href="#" className="hover:text-[#2162A1]">Home Decor</a>
                    <a href="#" className="hover:text-[#2162A1]">Home Improvement</a>
                    <a href="#" className="hover:text-[#2162A1]">Garden & Outdoor</a>
                    <a href="#" className="hover:text-[#2162A1]">Storage & Organisation</a>
                    <a href="#" className="hover:text-[#2162A1]">Lighting</a>
                </div>
            </div>

            <img src="/procuct_sponser.png" alt="" />

            {/* Amazon Product Details Section */}
            <div className="w-full bg-white flex flex-col lg:flex-row gap-8 px-8 py-8">
                {/* Product Gallery */}
                <div className="flex flex-col items-center w-full lg:w-2/5">
                    <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" alt="Product" className="w-full object-contain border p-2 bg-gray-50" />
                    <div className="flex mt-4 gap-2">
                        <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" alt="thumb1" className="w-12 h-12 object-contain border p-1 cursor-pointer" />
                        <img src="https://m.media-amazon.com/images/I/71XRyhfa1RL._SL1500_.jpg" alt="thumb2" className="w-12 h-12 object-contain border p-1 cursor-pointer" />
                        <img src="https://m.media-amazon.com/images/I/71Bc6GW3fUL._SL1500_.jpg" alt="thumb3" className="w-12 h-12 object-contain border p-1 cursor-pointer" />
                    </div>
                    <span className="text-xs text-[#2162A1] mt-2 cursor-pointer">Click to see full view</span>
                </div>

                {/* Product Info */}
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-2xl font-medium mb-2 text-black">Pexpo Bravo 1000 ISI Certified Stainless Steel Water Bottle 1 LTR, 24 Hr Hot & Cold, Leak Proof, Vacuum Insulated Flask Bottle, Ideal for Home, Office, Gym, Outings, and School- Military Green</h1>
                    <div className='-mb-1 text-[#2162A1]'>Visit the PEXPO Store</div>
                    <div className="flex items-center gap-2 -mb-1">
                        <span className="text-yellow-500">★★★★☆</span>
                        <span className="text-[#2162A1] text-sm">694 ratings</span>
                    </div>
                    <span className="text-xs text-gray-500">1K+ bought in past month</span>
                    <hr className='my-2' />
                    <div className="mb-2">
                        <span className="bg-[#CC0C39] text-white px-2 py-2 rounded text-xs font-semibold mr-2">Limited time deal</span>
                    </div>
                    <div className="">
                        <span className="text-red-600 text-lg">-42%</span>
                        <span className="text-gray-800 font-bold text-2xl ml-2">₹699</span>
                    </div>
                    <span className="text-gray-400 text-xs">M.R.P.: <span className='line-through'>₹1,199</span></span>
                    <div className="text-xs text-black mb-2">Inclusive of all taxes</div>
                    <img src="/offers.png" alt="" />
                    <div className="flex gap-2 mb-4 text-black">
                        <span className="px-2 py-1 rounded text-sm shadow-[0_0_4px_rgba(0,0,0,0.2)]">
                            <span className='font-bold'>Cashback</span><br />
                            Upto ₹20.00 cashback as Amazon Pay Balance when ...
                        </span>
                        <span className="px-2 py-1 rounded text-sm shadow-[0_0_4px_rgba(0,0,0,0.2)]">
                            <span className='font-bold'>Cashback</span><br />
                            Upto ₹20.00 cashback as Amazon Pay Balance when ...
                        </span>
                        <span className="px-2 py-1 rounded text-sm shadow-[0_0_4px_rgba(0,0,0,0.2)]">
                            <span className='font-bold'>Cashback</span><br />
                            Upto ₹20.00 cashback as Amazon Pay Balance when ...
                        </span>
                    </div>
                    <div className="flex gap-4 mb-4 text-[#2162A1]">
                        <span className="flex flex-col items-center text-xs"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png" className="w-8 h-8 mb-1" />Pay on Delivery</span>
                        <span className="flex flex-col items-center text-xs"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png" className="w-8 h-8 mb-1" />10 days Returnable</span>
                        <span className="flex flex-col items-center text-xs"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png" className="w-8 h-8 mb-1" />Amazon Delivered</span>
                        <span className="flex flex-col items-center text-xs"><img src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png" className="w-8 h-8 mb-1" />1 Year Warranty</span>
                    </div>
                    {/* Size Section */}
                    <div className="mb-4">
                        <div className="font-semibold text-sm mb-1 text-black">Size:</div>
                        <div className="flex gap-2 mb-2">
                            <button className="border px-4 py-2 rounded flex flex-col items-center font-bold bg-white shadow-sm border-blue-700 text-blue-700">500 ml
                                <span className="text-xs font-normal text-black">₹599.00<br /><span className='line-through text-gray-400'>₹879.00</span></span>
                            </button>
                            <button className="border px-4 py-2 rounded flex flex-col items-center bg-white shadow-sm text-black">700 ml
                                <span className="text-xs font-normal text-black">See available options</span>
                            </button>
                            <button className="border px-4 py-2 rounded flex flex-col items-center bg-white shadow-sm text-black">740 ml
                                <span className="text-xs font-normal text-black">See available options</span>
                            </button>
                            <button className="border px-4 py-2 rounded flex flex-col items-center bg-white shadow-sm text-black">940 ml
                                <span className="text-xs font-normal text-black">See available options</span>
                            </button>
                            <button className="border-2 border-blue-700 px-4 py-2 rounded flex flex-col items-center font-bold bg-blue-50 text-blue-700">1000 ml
                                <span className="text-xs font-normal text-black">₹699.00<br /><span className='line-through text-gray-400'>₹1,199.00</span></span>
                            </button>
                        </div>
                    </div>

                    {/* Style Name Section */}
                    <div className="mb-4">
                        <div className="font-semibold text-sm mb-1 text-black">Style Name:</div>
                        <div className="flex gap-2 mb-2">
                            <button className="border px-4 py-1 rounded bg-white text-black">Atlas</button>
                            <button className="border-2 border-blue-700 px-4 py-1 rounded bg-blue-50 text-blue-700 font-bold">Bravo</button>
                        </div>
                    </div>

                    {/* Colour Section */}
                    <div className="mb-4">
                        <div className="font-semibold text-sm mb-1 text-black">Colour:</div>
                        <div className="grid grid-cols-6 gap-2 mb-2">
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color1" />
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color2" />
                            <img src="https://m.media-amazon.com/images/I/71XRyhfa1RL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color3" />
                            <img src="https://m.media-amazon.com/images/I/71Bc6GW3fUL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color4" />
                            <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" className="border-2 border-[#2162A1] rounded p-1 w-14 h-14 cursor-pointer" alt="color5" />
                            <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color6" />
                            <img src="https://m.media-amazon.com/images/I/71XRyhfa1RL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color7" />
                            <img src="https://m.media-amazon.com/images/I/71Bc6GW3fUL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color8" />
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color9" />
                            <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color10" />
                            <img src="https://m.media-amazon.com/images/I/71Bc6GW3fUL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color11" />
                            <img src="https://m.media-amazon.com/images/I/71XRyhfa1RL._SL1500_.jpg" className="border rounded p-1 w-14 h-14 cursor-pointer" alt="color12" />
                        </div>
                    </div>

                    {/* Product Details Table Section */}
                    <div className="mb-4">
                        <table className="w-full text-sm text-black">
                            <tbody>
                                <tr>
                                    <td className="font-bold w-32 align-top text-black">Brand</td>
                                    <td className="text-black">PEXPO</td>
                                </tr>
                                <tr>
                                    <td className="font-bold align-top text-black">Capacity</td>
                                    <td className="text-black">1000 Milliliters</td>
                                </tr>
                                <tr>
                                    <td className="font-bold align-top text-black">Colour</td>
                                    <td className="text-black">Military Green</td>
                                </tr>
                                <tr>
                                    <td className="font-bold align-top text-black">Special Feature</td>
                                    <td className="text-black">Hot/Cold, Bpa Free, Leakproof, Dishwasher Safe, Double Wall</td>
                                </tr>
                                <tr>
                                    <td className="font-bold align-top text-black">Age Range (Description)</td>
                                    <td className="text-black">Any Age Group People can Use this</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* About this item Section */}
                    <div className="mb-4">
                        <h2 className="font-bold text-lg mb-2 text-black">About this item</h2>
                        <ul className="list-disc pl-6 space-y-2 text-black text-sm">
                            <li>Tri-Ply Vacuum Technology (TPVT): Between two steel layers, a thicker aluminum sheet is sandwiched instead of just a thin copper coat, ensuring superior temperature control in the flask</li>
                            <li>ISI Certified: Bottles undergo rigorous testing for durability, corrosion resistance, QC & material composition, which ensures that, the highest quality product is delivered with "trusted made in India" craftsmanship & 1-year warranty.</li>
                            <li>Portable and Convenient : Easy carry silicon strap and soft base pad makes Bravo a travel-friendly versatile companion for daily activities. Easy to fit in school and office bags, Travel backpacks or car cup holders due to its lightweight and portable design</li>
                            <li>High Quality 304 Steel: Food grade steel is easy to clean and resistant to bacteria growth, keeping your beverages safe our flask features a smooth, shiny surface that's highly durable, ensuring it won't crack over time.</li>
                            <li>Versatile & Eco Friendly : Suitable for keeping water, coffee, tea, and other drinks hot or cold for long hours, making it a versatile companion for home, workouts, gym sessions, picnics, and other indoor and outdoor activities. Choose an eco-conscious lifestyle with our BPA-free and reusable flask, and reduce single-use plastic waste.</li>
                        </ul>
                    </div>
                </div>

                {/* Purchase Panel */}
                <div className="w-full lg:w-1/6 border rounded p-4 flex flex-col gap-3 bg-gray-50 h-fit">
                    <div className="text-2xl font-bold text-gray-800">₹699<sup className="text-xs font-normal">00</sup></div>
                    <div className="text-xs text-blue-700">FREE delivery Wednesday, 25 June. <span className="underline cursor-pointer">Details</span></div>
                    <div className="text-xs text-gray-700">Delivering to Varanasi 221011 - <span className="underline cursor-pointer">Update location</span></div>
                    <div className="text-green-600 font-semibold text-sm">In stock</div>
                    <div className="text-xs text-gray-700">Ships from <span className="font-bold">Amazon</span></div>
                    <div className="text-xs text-gray-700">Sold by <span className="font-bold">PLACERO INTERNATIONAL PRIVATE LIMITED</span></div>
                    <div className="text-xs text-blue-700 underline cursor-pointer">Secure transaction</div>
                    <div className="text-xs text-gray-700">Ships in product packaging</div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="quantity" className="text-xs">Quantity:</label>
                        <select id="quantity" className="border rounded px-2 py-1 text-xs">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded mt-2">Add to Cart</button>
                    <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded">Buy Now</button>
                    <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="gift" className="accent-yellow-500" />
                        <label htmlFor="gift" className="text-xs">Add gift options</label>
                    </div>
                    <button className="border border-gray-300 text-xs py-1 rounded mt-2">Add to Wish List</button>
                </div>
            </div>

            {/* Frequently bought together Section */}
            <div className="w-full bg-white border-t border-gray-200 mt-8 py-6 px-8">
                <h2 className="font-bold text-xl mb-4 text-black">Frequently bought together</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Product List */}
                    <div className="flex flex-row gap-6 flex-1">
                        {/* Product 1 */}
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center w-48 relative">
                            <img src="https://m.media-amazon.com/images/I/71i--IbCPdL._SL1500_.jpg" alt="Pexpo Bravo" className="w-28 h-44 object-contain mb-2" />
                            <input type="checkbox" checked readOnly className="absolute top-3 right-3 w-5 h-5 accent-blue-600" />
                            <div className="font-bold text-xs text-black mb-1">This item:</div>
                            <div className="text-xs text-black mb-1">Pexpo Bravo 1000 ISI Certified Stainless Steel Water Bottle 1 LTR, 24 Hr Hot & Cold,...</div>
                            <div className="font-bold text-base text-black">₹699<sup className="text-xs font-normal">00</sup></div>
                        </div>
                        {/* Plus sign */}
                        <div className="flex items-center justify-center text-3xl font-bold text-gray-400">+</div>
                        {/* Product 2 */}
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center w-48 relative">
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" alt="Milton Aura" className="w-28 h-44 object-contain mb-2" />
                            <input type="checkbox" checked readOnly className="absolute top-3 right-3 w-5 h-5 accent-blue-600" />
                            <div className="font-bold text-xs text-black mb-1">Milton Aura 1000 Thermosteel Water Bottle 1050 ml, 24 Hr Hot and Cold | Leak Proof Lid, ISI...</div>
                            <div className="font-bold text-base text-black">₹956<sup className="text-xs font-normal">00</sup></div>
                        </div>
                    </div>
                    {/* Total and Add to Cart */}
                    <div className="flex flex-col items-center md:items-start gap-3 min-w-[260px]">
                        <div className="text-lg text-black">Total price: <span className="font-bold">₹1,655.00</span></div>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-8 rounded-full text-base">Add both to Cart</button>
                        <div className="flex items-center gap-2 mt-2">
                            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" /></svg>
                            <span className="text-xs text-gray-700">These items are dispatched from and sold by different sellers.</span>
                            <span className="text-xs text-blue-700 underline cursor-pointer ml-1">Show details</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Brand in this category on Amazon Section */}
            <div className="w-full bg-white border-t border-gray-200 py-8 px-8">
                <h2 className="font-bold text-2xl mb-4 text-black">Brand in this category on Amazon</h2>
                <div className="flex items-center gap-4 mb-4">
                    <img src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/2ef4aa5b-3db7-421a-8c44-47c37e058f80._CR0,0,500,500_AC_SX260_SY120_QL70_.png" alt="The Better Home Logo" className="h-10 w-auto" />
                    <div className="flex flex-col">
                        <span className="text-lg font-medium text-black">Steel Bottles by Better Home</span>
                        <a href="#" className="text-[#2162A1] text-sm hover:underline">Shop The Better Home &gt;</a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Banner Image */}
                    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                        <img src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/342491ae-bd67-4853-bece-ee10f77e2493._CR0,0,1200,628_SX507_QL70_.png" alt="Better Home Banner" className="rounded-xl w-full h-56 object-cover" />
                    </div>
                    {/* Product Cards */}
                    <div className="flex flex-row gap-4 flex-1">
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center w-56">
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" alt="Better Home Blue" className="w-28 h-44 object-contain mb-2" />
                            <div className="text-sm font-medium text-black text-center mb-1">The Better Home Stainless Steel Bottle 1...</div>
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-yellow-500">★★★★☆</span>
                                <span className="text-xs text-black">569</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Amazon_Prime_Logo.png" alt="Prime" className="h-4 w-auto" />
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center w-56">
                            <img src="https://m.media-amazon.com/images/I/61Q5l+8Q+GL._SL1500_.jpg" alt="Better Home Black" className="w-28 h-44 object-contain mb-2" />
                            <div className="text-sm font-medium text-black text-center mb-1">The Better Home 1000 Stainless Steel Water Bo...</div>
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-yellow-500">★★★☆☆</span>
                                <span className="text-xs text-black">21</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Amazon_Prime_Logo.png" alt="Prime" className="h-4 w-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
