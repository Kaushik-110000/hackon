"use client";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import GreenScore from "../../components/GreenScore";
import EcoBadge from "../../components/EcoBadge";
import GreenCoin from "../../components/GreenCoin";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartCountStore } from "@/context/cartCountStore";

const sponsored = {
  brandLogo: "/assets/greenStore.png",
  brandName: "Get the best Eco friendly products at our Green Store",
  storeLink: "/green-store",
  products: [
    {
      image: "/assests/mockProducts_images/personalCare.png",
      caption: "Personal Care Products",
    },
    {
      image: "/assests/mockProducts_images/gardening.png",
      caption: "Gardening Supplies",
    },
    {
      image: "/assests/mockProducts_images/recy.png",
      caption: "Best Recyclabale plastic products",
    },
  ],
};

const brands = ["MILTON", "CELLO", "SOLARA", "Boldfit", "Pigeon", "Borosil"];

const mockProducts = [
  {
    _id: 1,
    images: ["/assests/mockProducts_images/copper_bottle.webp"],
    name: "The Better Home Copper Water Bottle 950ml | BPA Free Leak Proof Bottle with .....",
    sponsored: true,
    bestSeller: false,
    deal: "Limited time deal",
    rating: 4.2,
    ratingCount: 690,
    price: 699,
    mrp: 1199,
    discount: 42,
    prime: true,
    delivery: "Mon, 23 Jun",
    colors: 13,
    // Eco-friendly features
    greenScore: 95,
    carbonFootprint: { total: 0.8 },
    isEcoFriendly: true,
    ecoBadges: ["recycled", "sustainable-packaging"] as const,
    greenCoins: 95,
    carbonSaved: "Saves 2.1kg CO₂",
  },
  {
    _id: 2,
    images: ["/assests/mockProducts_images/milton_super.webp"],
    name: "MILTON Super 500 Stainless Steel Water Bottle, 475 ml water bottles, Single walled, Leak-Proof, Rust-free Steel",
    sponsored: true,
    bestSeller: false,
    deal: "Limited time deal",
    rating: 4.3,
    ratingCount: 6573,
    price: 749,
    mrp: 1099,
    discount: 32,
    prime: true,
    delivery: "Thu, 19 Jun",
    colors: 0,
    // Eco-friendly features
    greenScore: 88,
    carbonFootprint: { total: 1.2 },
    isEcoFriendly: true,
    ecoBadges: ["recycled"] as const,
    greenCoins: 88,
    carbonSaved: "Saves 1.8kg CO₂",
  },
  {
    _id: 3,
    images: ["/assests/mockProducts_images/pigeon.webp"],
    name: "Pigeon by stovekraft Inox Hydra Duo, Dual Cap, Flipper and Fridge in one bottle,....",
    sponsored: true,
    bestSeller: false,
    deal: "Limited time deal",
    rating: 4.1,
    ratingCount: 463,
    price: 636,
    mrp: 975,
    discount: 35,
    prime: true,
    delivery: "Thu, 19 Jun",
    colors: 0,
    // Eco-friendly features
    greenScore: 82,
    carbonFootprint: { total: 1.5 },
    isEcoFriendly: true,
    ecoBadges: ["sustainable-packaging"] as const,
    greenCoins: 82,
    carbonSaved: "Saves 1.5kg CO₂",
  },
  {
    _id: 4,
    images: ["/assests/mockProducts_images/hyv.webp"],
    name: "HYV HydroFlow 1.2L Insulated Tumbler with Straw | Sipper Bottle for Adults and Kids",
    sponsored: true,
    bestSeller: true,
    deal: "",
    rating: 4.4,
    ratingCount: 4616,
    price: 329,
    mrp: 399,
    discount: 18,
    prime: true,
    delivery: "Thu, 19 Jun",
    colors: 51,
    // Eco-friendly features
    greenScore: 92,
    carbonFootprint: { total: 0.6 },
    isEcoFriendly: true,
    ecoBadges: ["recycled", "biodegradable"] as const,
    greenCoins: 92,
    carbonSaved: "Saves 2.5kg CO₂",
  },
  {
    _id: 5,
    images: ["/assests/mockProducts_images/borosil.jpg"],
    name: "BOROSIL Colour Copper bottle 1 Litre, Brown 100% Pure Copper, BPA Free &...",
    sponsored: false,
    bestSeller: false,
    deal: "",
    rating: 4.0,
    ratingCount: 82,
    price: 119,
    mrp: 599,
    discount: 80,
    prime: false,
    delivery: "Sun, 22 Jun",
    colors: 4,
    // Eco-friendly features
    greenScore: 78,
    carbonFootprint: { total: 1.8 },
    isEcoFriendly: true,
    ecoBadges: ["organic"] as const,
    greenCoins: 78,
    carbonSaved: "Saves 1.2kg CO₂",
  },
];

const materials = [
  "Plastic",
  "Aluminium",
  "Stainless Steel",
  "Borosilicate Glass",
  "Copper",
  "Glass",
  "Acrylonitrile Butadiene Styrene",
];
const discounts = [
  "10% Off or more",
  "25% Off or more",
  "35% Off or more",
  "50% Off or more",
  "60% Off or more",
  "70% Off or more",
];
const colors = [
  "#1a4d2e",
  "#2e8b57",
  "#b0c4de",
  "#fff",
  "#a0522d",
  "#8b0000",
  "#ff6347",
  "#ffa500",
  "#ffff00",
  "#00ff00",
  "#008080",
  "#4682b4",
  "#800080",
  "#f5f5dc",
  "#bdb76b",
  "#808000",
];

type Props = {};

export default function page({}: Props) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [deliveryDay, setDeliveryDay] = useState(false);
  const [price, setPrice] = useState([125, 8400]);
  const [greenScoreFilter, setGreenScoreFilter] = useState<number>(0);

  const [searchResult, setSearchResult] = useState(mockProducts);
  const [ecosearchResult, setecoSearchResult] = useState(mockProducts);

  const increment = useCartCountStore((state) => state.increment);

  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";
  const router = useRouter();

  useEffect(() => {
    if (!q) {
      setSearchResult([]);
      return;
    }
    fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setSearchResult(data.products);
        } else {
          window.alert("Failed to fetch results");
        }
      })
      .catch((err) => console.log(err));
  }, [q]);

  useEffect(() => {
    if (!q) {
      setSearchResult([]);
      return;
    }
    fetch(`/api/products/ecosearch?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setecoSearchResult(data.products);
        } else {
          window.alert("Failed to fetch results");
        }
      })
      .catch((err) => console.log(err));
  }, [q]);

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      <div className="p-2 border-b-1 border-b-gray-300 text-black bg-white">
        1-48 of over 3,000 results for "bottel"
      </div>
      <div className="mx-auto flex pt-5 bg-white">
        {/* Left Panel Filters */}
        <aside className="bg-white p-4 h-fit w-[20vw] text-black">
          <div className="mb-6">
            <h3 className="font-semibold mb-2">🌱 Eco-Friendly Options</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={greenScoreFilter >= 80}
                  onChange={() =>
                    setGreenScoreFilter(greenScoreFilter >= 80 ? 0 : 80)
                  }
                />
                High Green Score (80+)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={greenScoreFilter >= 60}
                  onChange={() =>
                    setGreenScoreFilter(greenScoreFilter >= 60 ? 0 : 60)
                  }
                />
                Good Green Score (60+)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={greenScoreFilter >= 40}
                  onChange={() =>
                    setGreenScoreFilter(greenScoreFilter >= 40 ? 0 : 40)
                  }
                />
                Fair Green Score (40+)
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">♻️ Sustainability</h3>
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Recycled Materials
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Biodegradable
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Organic
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Energy Efficient
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Sustainable Packaging
              </label>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Delivery Day</h3>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={deliveryDay}
                onChange={() => setDeliveryDay(!deliveryDay)}
              />
              Get It in 2 Days
            </label>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Brands</h3>
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 text-sm mb-1"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    setSelectedBrands((prev) =>
                      prev.includes(brand)
                        ? prev.filter((b) => b !== brand)
                        : [...prev, brand]
                    )
                  }
                />
                {brand}
              </label>
            ))}
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={125}
                max={price[1]}
                value={price[0]}
                onChange={(e) => setPrice([+e.target.value, price[1]])}
                className="w-16 border rounded px-1 py-0.5 text-sm"
              />
              <span>–</span>
              <input
                type="number"
                min={price[0]}
                max={8400}
                value={price[1]}
                onChange={(e) => setPrice([price[0], +e.target.value])}
                className="w-16 border rounded px-1 py-0.5 text-sm"
              />
            </div>
            <div className="text-xs mt-1">₹125 – ₹8,400+</div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Deals & Discounts</h3>
            <div className="flex flex-col gap-1 text-blue-700 text-sm cursor-pointer">
              <span className="hover:underline">All Discounts</span>
              <span className="hover:underline">Today's Deals</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star, i) => (
                <span
                  key={i}
                  className={star <= 4 ? "text-orange-400" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-sm text-gray-700">& Up</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Material</h3>
            {materials.map((mat) => (
              <label key={mat} className="flex items-center gap-2 text-sm mb-1">
                <input type="checkbox" />
                {mat}
              </label>
            ))}
            <span className="text-blue-700 text-xs cursor-pointer hover:underline">
              &darr; See more
            </span>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Discount</h3>
            <div className="flex flex-col gap-1">
              {discounts.map((d) => (
                <span
                  key={d}
                  className="text-sm cursor-pointer hover:underline"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Colour</h3>
            <div className="grid grid-cols-6 gap-1">
              {colors.map((color, i) => (
                <button
                  key={i}
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        </aside>
        <main className="flex flex-col w-full">
          {/* Sponsored Section */}
          <section className="relative mb-4 w-full flex  text-black">
            <div className="bg-green-100 rounded-lg p-8  w-full flex flex-col items-center">
              <div className="flex items-center w-full mb-6">
                <img
                  src={"/assests/greenStore.png"}
                  alt="brand logo"
                  className="w-16 h-16 object-contain rounded mr-6"
                />
                <div>
                  <div className="text-lg font-semibold mb-1">
                    {sponsored.brandName}
                  </div>
                  <p
                    className="text-blue-600 text-sm hover:underline hover:cursor-pointer"
                    onClick={() => {
                      router.push("green-store");
                    }}
                  >
                    Shop {q}'s best eco-friendly alternatives from our Green
                    Store &gt;
                  </p>
                </div>
              </div>
              <div className="flex max-w-3xl mr-auto w-full gap-8">
                {sponsored.products.map((prod, idx) => (
                  <div key={idx} className="flex flex-col flex-1">
                    <img
                      src={prod.image}
                      alt={prod.caption}
                      className="w-40 h-40 object-contain bg-gray-50 rounded"
                    />
                    <span className="text-sm mt-2">{prod.caption}</span>
                  </div>
                ))}
              </div>
              <span className="absolute bottom-2 right-4 text-xs flex items-center gap-1">
                Sponsored
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#888"
                    strokeWidth="2"
                  />
                  <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#888"
                  >
                    i
                  </text>
                </svg>
              </span>
            </div>
          </section>
          {/* Product Feed */}
          <div className="mt-8">
            <h2 className="text-xl text-black font-bold mb-2">
              Search results
            </h2>
            <div className="text-sm text-gray-600 mb-4">
              Check each product page for other buying options. Price and other
              details may vary based on product size and colour.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {searchResult.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-4 flex flex-col h-full relative border-1 border-gray-100"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.bestSeller && (
                      <span className="bg-[#D14900] text-white text-xs px-2 py-0.5 rounded font-semibold">
                        Best seller
                      </span>
                    )}
                    {product.sponsored && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        Sponsored{" "}
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#888"
                            strokeWidth="2"
                          />
                          <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#888"
                          >
                            i
                          </text>
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Green Score Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <GreenScore
                      score={product.greenScore}
                      carbonFootprint={product.carbonFootprint.total}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                  </div>

                  {/* Product Image */}
                  <Link href={`/product/${product._id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-32 h-32 object-contain cursor-pointer mx-auto mb-2"
                    />

                    {/* Colors */}
                    {product.colors > 0 && (
                      <span className="text-xs text-blue-700 mb-1 cursor-pointer hover:underline">
                        +{product.colors} other colors/patterns
                      </span>
                    )}

                    {/* name */}
                    <div className="font-medium text-sm mb-1 line-clamp-2 min-h-[2.5em] text-black">
                      {product.name}
                    </div>

                    {/* Eco Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.ecoBadges.map((badge) => (
                        <EcoBadge key={badge} type={badge} showLabel={false} />
                      ))}
                    </div>

                    {/* Carbon Savings */}
                    <div className="bg-green-50 p-2 rounded mb-2">
                      <p className="text-xs text-green-700 font-medium">
                        {product.carbonSaved}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                      <span className="text-gray-500">
                        ({product.ratingCount})
                      </span>
                    </div>

                    {/* Bought info */}
                    <div className="text-xs text-gray-500 mb-1">
                      {(Number(product.rating) + 2).toFixed(1)}k+ bought in past
                      month
                    </div>

                    {/* Deal */}
                    {product.deal && (
                      <span className="bg-[#CC0C39] text-white text-xs px-2 py-0.5 rounded mb-1 w-fit">
                        {product.deal}
                      </span>
                    )}

                    {/* Price and Green Coins */}
                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          M.R.P: ₹{product.mrp}
                        </span>
                        <span className="text-xs text-green-700 font-semibold">
                          ({product.discount}% off)
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        +{product.greenCoins} 🪙
                      </div>
                    </div>

                    {/* Prime & Delivery */}
                    <div className="text-xs text-gray-700 mt-1">
                      {product.prime && (
                        <span className="text-blue-600 font-bold mr-1">
                          prime
                        </span>
                      )}
                      FREE delivery{" "}
                      <span className="font-semibold">{product.delivery}</span>
                    </div>
                  </Link>
                  {/* Add to cart */}

                  <button
                    className="mt-3 bg-[#FFCE12] hover:bg-yellow-500 text-black font-semibold py-1 w-fit text-sm rounded-full p-2"
                    onClick={() => {
                      const cart = JSON.parse(
                        localStorage.getItem("cart") || "[]"
                      );
                      cart.push(product);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      increment();
                      alert("Product added to cart! 🛒");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl text-black font-bold mb-2">
              Eco Friendly Picks for you
            </h2>
            <div className="text-sm text-gray-600 mb-4">
              Check each product page for other buying options. Price and other
              details may vary based on product size and colour.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {ecosearchResult.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-4 flex flex-col h-full relative border-1 border-gray-100"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.bestSeller && (
                      <span className="bg-[#D14900] text-white text-xs px-2 py-0.5 rounded font-semibold">
                        Best seller
                      </span>
                    )}
                    {product.sponsored && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        Sponsored{" "}
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#888"
                            strokeWidth="2"
                          />
                          <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#888"
                          >
                            i
                          </text>
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Green Score Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <GreenScore
                      score={product.greenScore}
                      carbonFootprint={product.carbonFootprint.total}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                  </div>
                  <Link href={`/product/${product._id}`}>
                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-32 h-32 object-contain mx-auto mb-2"
                    />

                    {/* Colors */}
                    {product.colors > 0 && (
                      <span className="text-xs text-blue-700 mb-1 cursor-pointer hover:underline">
                        +{product.colors} other colors/patterns
                      </span>
                    )}

                    {/* name */}
                    <div className="font-medium text-sm mb-1 line-clamp-2 min-h-[2.5em] text-black">
                      {product.name}
                    </div>

                    {/* Eco Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.ecoBadges.map((badge) => (
                        <EcoBadge key={badge} type={badge} showLabel={false} />
                      ))}
                    </div>

                    {/* Carbon Savings */}
                    <div className="bg-green-50 p-2 rounded mb-2">
                      <p className="text-xs text-green-700 font-medium">
                        {product.carbonSaved}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                      <span className="text-gray-500">
                        ({product.ratingCount})
                      </span>
                    </div>

                    {/* Bought info */}
                    <div className="text-xs text-gray-500 mb-1">
                      {(Number(product.rating) + 2).toFixed(1)}k+ bought in past
                      month
                    </div>

                    {/* Deal */}
                    {product.deal && (
                      <span className="bg-[#CC0C39] text-white text-xs px-2 py-0.5 rounded mb-1 w-fit">
                        {product.deal}
                      </span>
                    )}

                    {/* Price and Green Coins */}
                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          M.R.P: ₹{product.mrp}
                        </span>
                        <span className="text-xs text-green-700 font-semibold">
                          ({product.discount}% off)
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        +{product.greenCoins} 🪙
                      </div>
                    </div>

                    {/* Prime & Delivery */}
                    <div className="text-xs text-gray-700 mt-1">
                      {product.prime && (
                        <span className="text-blue-600 font-bold mr-1">
                          prime
                        </span>
                      )}
                      FREE delivery{" "}
                      <span className="font-semibold">{product.delivery}</span>
                    </div>
                  </Link>
                  {/* Add to cart */}
                  <button
                    className="mt-3 bg-[#FFCE12] hover:bg-yellow-500 text-black font-semibold py-1 w-fit text-sm rounded-full p-2"
                    onClick={() => {
                      const cart = JSON.parse(
                        localStorage.getItem("cart") || "[]"
                      );
                      cart.push(product);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      increment();
                      alert("Product added to cart! 🛒");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl text-black font-bold mb-2">More Results</h2>
            <div className="text-sm text-gray-600 mb-4">
              Check each product page for other buying options. Price and other
              details may vary based on product size and colour.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {searchResult.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg p-4 flex flex-col h-full relative border-1 border-gray-100"
                >
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.bestSeller && (
                      <span className="bg-[#D14900] text-white text-xs px-2 py-0.5 rounded font-semibold">
                        Best seller
                      </span>
                    )}
                    {product.sponsored && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        Sponsored{" "}
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#888"
                            strokeWidth="2"
                          />
                          <text
                            x="12"
                            y="16"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#888"
                          >
                            i
                          </text>
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Green Score Badge */}
                  <div className="absolute top-2 right-2 z-10">
                    <GreenScore
                      score={product.greenScore}
                      carbonFootprint={product.carbonFootprint.total}
                      isEcoFriendly={product.isEcoFriendly}
                    />
                  </div>
                  <Link href={`/product/${product._id}`}>
                    {/* Product Image */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-32 h-32 object-contain mx-auto mb-2"
                    />

                    {/* Colors */}
                    {product.colors > 0 && (
                      <span className="text-xs text-blue-700 mb-1 cursor-pointer hover:underline">
                        +{product.colors} other colors/patterns
                      </span>
                    )}

                    {/* name */}
                    <div className="font-medium text-sm mb-1 line-clamp-2 min-h-[2.5em] text-black">
                      {product.name}
                    </div>

                    {/* Eco Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.ecoBadges.map((badge) => (
                        <EcoBadge key={badge} type={badge} showLabel={false} />
                      ))}
                    </div>

                    {/* Carbon Savings */}
                    <div className="bg-green-50 p-2 rounded mb-2">
                      <p className="text-xs text-green-700 font-medium">
                        {product.carbonSaved}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <span className="text-yellow-500">★</span>
                      <span>{product.rating}</span>
                      <span className="text-gray-500">
                        ({product.ratingCount})
                      </span>
                    </div>

                    {/* Bought info */}
                    <div className="text-xs text-gray-500 mb-1">
                      {(Number(product.rating) + 2).toFixed(1)}k+ bought in past
                      month
                    </div>

                    {/* Deal */}
                    {product.deal && (
                      <span className="bg-[#CC0C39] text-white text-xs px-2 py-0.5 rounded mb-1 w-fit">
                        {product.deal}
                      </span>
                    )}

                    {/* Price and Green Coins */}
                    <div className="flex items-end justify-between gap-2 mt-1">
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-medium text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          M.R.P: ₹{product.mrp}
                        </span>
                        <span className="text-xs text-green-700 font-semibold">
                          ({product.discount}% off)
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        +{product.greenCoins} 🪙
                      </div>
                    </div>

                    {/* Prime & Delivery */}
                    <div className="text-xs text-gray-700 mt-1">
                      {product.prime && (
                        <span className="text-blue-600 font-bold mr-1">
                          prime
                        </span>
                      )}
                      FREE delivery{" "}
                      <span className="font-semibold">{product.delivery}</span>
                    </div>
                  </Link>
                  {/* Add to cart */}
                  <button
                    className="mt-3 bg-[#FFCE12] hover:bg-yellow-500 text-black font-semibold py-1 w-fit text-sm rounded-full p-2"
                    onClick={() => {
                      const cart = JSON.parse(
                        localStorage.getItem("cart") || "[]"
                      );
                      cart.push(product);
                      localStorage.setItem("cart", JSON.stringify(cart));
                      increment();
                      alert("Product added to cart! 🛒");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
