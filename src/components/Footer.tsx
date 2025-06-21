"use client";
import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="w-full bg-[#494C66] text-center h-10 py-2 flex justify-center cursor-pointer text-white text-sm hover:bg-[#42445e]"
        onClick={scrollToTop}
      >
        Back to top
      </div>
      <footer
        style={{ backgroundColor: "#25273A" }}
        className="text-gray-200 pt-8 pb-4"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 min-h-70">
          <div>
            <h2 className="font-semibold text-white mb-2">Get to Know Us</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.aboutamazon.in/?utm_source=gateway&amp;utm_medium=footer" className="hover:underline">
                  About Amazon
                </a>
              </li>
              <li>
                <a href="https://amazon.jobs/" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="https://press.aboutamazon.in/?utm_source=gateway&utm_medium=footer" className="hover:underline">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="https://www.amazon.science/" className="hover:underline">
                  Amazon Science
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-2">Connect with Us</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.amazon.in/gp/redirect.html/ref=footer_fb?location=http://www.facebook.com/AmazonIN&token=2075D5EAC7BB214089728E2183FD391706D41E94&6" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/redirect.html/ref=footer_twitter?location=http://twitter.com/AmazonIN&token=A309DFBFCB1E37A808FF531934855DC817F130B6&6" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/redirect.html?location=https://www.instagram.com/amazondotin&token=264882C912E9D005CB1D9B61F12E125D5DF9BFC7&source=standards" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-2">
              Make Money with Us
            </h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.amazon.in/b/?node=2838698031&ld=AZINSOANavDesktopFooter_C&ref_=nav_footer_sell_C" className="hover:underline">
                  Sell on Amazon
                </a>
              </li>
              <li>
                <a href="https://accelerator.amazon.in/?ref_=map_1_b2b_GW_FT" className="hover:underline">
                 Amazon Accelerator
                </a>
              </li>
              <li>
                <a href="https://brandservices.amazon.in/?ref=AOINABRLGNRFOOT&ld=AOINABRLGNRFOOT" className="hover:underline">
                  Build Your Brand
                </a>
              </li>
              <li>
                <a href="https://sell.amazon.in/grow-your-business/amazon-global-selling.html?ld=AZIN_Footer_V1&ref=AZIN_Footer_V1" className="hover:underline">
                  Amazon Global Selling
                </a>
              </li>
               <li>
                <a href="https://supply.amazon.com/?ref_=footer_sta&lang=en-IN" className="hover:underline">
                 Supply to Amazon
                </a>
              </li>
              <li>
                <a href="https://affiliate-program.amazon.in/?utm_campaign=assocshowcase&utm_medium=footer&utm_source=GW&ref_=footer_assoc" className="hover:underline">
                  Become an Affiliate
                </a>
              </li>
               <li>
                <a href="https://services.amazon.in/services/fulfilment-by-amazon/benefits.html/ref=az_footer_fba?ld=AWRGINFBAfooter" className="hover:underline">
                 Fullfillment by Amazon
                </a>
              </li>
              <li>
                <a href="https://advertising.amazon.in/?ref=Amz.in" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
               <li>
                <a href="https://www.amazonpay.in/merchant" className="hover:underline">
                 Amazon Pay on Merchants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-2">Let Us Help You</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="https://www.amazon.in/gp/css/homepage.html?ref_=footer_ya" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/css/returns/homepage.html?ref_=footer_hy_f_4" className="hover:underline">
                  Returns Centre
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/your-product-safety-alerts?ref_=footer_bsx_ypsa" className="hover:underline">
                  Product Safety Alerts
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=201083470&ref_=footer_swc" className="hover:underline">
                  100% Purchase Protection
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/browse.html?node=6967393031&ref_=footer_mobapp" className="hover:underline">
                  Amazon App Download
                </a>
              </li>
              <li>
                <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200507590&ref_=footer_gw_m_b_he" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-4 px-4 flex justify-center items-center space-y-4 gap-20 text-sm">
          <img src="/logo-light.png" alt="Logo" className="h-8 mt-5" />
          <div className="flex space-x-4">
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-100 hover:bg-gray-600">
              English
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-100 hover:bg-gray-600">
              India
            </button>
          </div>
        </div>
      </footer>
      <style jsx>{`
        footer li {
          padding-left: 0;
          font-size: 15;
          margin-top: 6;
        }
        footer ul {
          margin-top: 20;
        }
      `}</style>
    </>
  );
}
7;