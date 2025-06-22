'use client';
import React, { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const MOCK_SELLER_ID = "replace_with_real_seller_id";

const initialProductData = {
  materials: [{ type: "", weight: 0 }],
  manufacturing: { energyConsumption: 0, energyType: "grid" },
  transportation: [{ mode: "truck", distance: 0, weight: 0 }],
  packaging: { type: "cardboard", weight: 0.2 },
  disposal: { isRecyclable: false, isBiodegradable: false },
  productWeight: 1,
};

const initialSustainability = {
  isRecyclable: false,
  isReusable: false,
  isBiodegradable: false,
  renewableEnergy: false,
  fairTrade: false,
  locallySourced: false,
  organicMaterials: false,
  recycledContent: 0,
  packagingType: "cardboard",
};

export default function ProducerPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    originalPrice: "",
    images: [""],
    purchaseAmount: "",
    sellerId: MOCK_SELLER_ID,
    productData: initialProductData,
    sustainabilityFeatures: initialSustainability,
  });
  const [expanded, setExpanded] = useState({
    materials: false,
    manufacturing: false,
    transportation: false,
    packaging: false,
    disposal: false,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (idx: number, key: string, value: any, group: string) => {
    setForm((prev) => ({
      ...prev,
      productData: {
        ...prev.productData,
        [group as keyof typeof initialProductData]: (prev.productData[group as keyof typeof initialProductData] as any[]).map((item: any, i: number) =>
          i === idx ? { ...item, [key]: value } : item
        ),
      },
    }));
  };

  const handleProductDataChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      productData: { ...prev.productData, [key]: value },
    }));
  };

  const handleSustainabilityChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      sustainabilityFeatures: { ...prev.sustainabilityFeatures, [key]: value },
    }));
  };

  const handleAddMaterial = () => {
    setForm((prev) => ({
      ...prev,
      productData: {
        ...prev.productData,
        materials: [...prev.productData.materials, { type: "", weight: 0 }],
      },
    }));
  };

  const handleAddTransport = () => {
    setForm((prev) => ({
      ...prev,
      productData: {
        ...prev.productData,
        transportation: [
          ...prev.productData.transportation,
          { mode: "truck", distance: 0, weight: 0 },
        ],
      },
    }));
  };

  const handleImageChange = (idx: number, value: string) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[idx] = value;
      return { ...prev, images };
    });
  };

  const handleAddImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const toggleExpand = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const validate = () => {
    if (!form.name || !form.category || !form.brand || !form.price || !form.originalPrice || !form.images[0]) {
      setError("Please fill all required fields and provide at least one image.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/producer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice),
          purchaseAmount: Number(form.purchaseAmount),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to submit product.");
      }
    } catch (err: any) {
      setError("Network error or server unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E3E6E6]">
      <Nav />
      <main className="flex-1 flex flex-col items-center py-8 px-2">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 mt-4 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <input name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand *</label>
                <input name="brand" value={form.brand} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Original Price (₹) *</label>
                <input name="originalPrice" type="number" min="0" value={form.originalPrice} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Amount (₹)</label>
                <input name="purchaseAmount" type="number" min="0" value={form.purchaseAmount} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-1">Product Images (URLs) *</label>
              {form.images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={img}
                    onChange={e => handleImageChange(idx, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required={idx === 0}
                  />
                  {idx === form.images.length - 1 && (
                    <button type="button" onClick={handleAddImage} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded font-semibold">Add</button>
                  )}
                </div>
              ))}
            </div>
            {/* Seller ID (hidden for now) */}
            <input type="hidden" name="sellerId" value={form.sellerId} />
            {/* Product Data Sections */}
            <div className="space-y-2">
              {/* Materials */}
              <div>
                <button type="button" onClick={() => toggleExpand("materials")}
                  className="text-left w-full font-semibold text-gray-700 flex items-center gap-2">
                  <span>{expanded.materials ? "▼" : "►"}</span> Materials
                </button>
                {expanded.materials && (
                  <div className="pl-6 pt-2">
                    {form.productData.materials.map((mat, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Type (e.g. steel)"
                          value={mat.type}
                          onChange={e => handleArrayChange(idx, "type", e.target.value, "materials")}
                          className="border rounded px-2 py-1"
                        />
                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          value={mat.weight}
                          min="0"
                          onChange={e => handleArrayChange(idx, "weight", Number(e.target.value), "materials")}
                          className="border rounded px-2 py-1"
                        />
                        {idx === form.productData.materials.length - 1 && (
                          <button type="button" onClick={handleAddMaterial} className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded">Add</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Manufacturing */}
              <div>
                <button type="button" onClick={() => toggleExpand("manufacturing")}
                  className="text-left w-full font-semibold text-gray-700 flex items-center gap-2">
                  <span>{expanded.manufacturing ? "▼" : "►"}</span> Manufacturing
                </button>
                {expanded.manufacturing && (
                  <div className="pl-6 pt-2 flex gap-4">
                    <input
                      type="number"
                      placeholder="Energy Consumption (kWh)"
                      value={form.productData.manufacturing.energyConsumption}
                      min="0"
                      onChange={e => handleProductDataChange("manufacturing", { ...form.productData.manufacturing, energyConsumption: Number(e.target.value) })}
                      className="border rounded px-2 py-1"
                    />
                    <select
                      value={form.productData.manufacturing.energyType}
                      onChange={e => handleProductDataChange("manufacturing", { ...form.productData.manufacturing, energyType: e.target.value })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="grid">Grid</option>
                      <option value="renewable">Renewable</option>
                      <option value="coal">Coal</option>
                      <option value="naturalGas">Natural Gas</option>
                    </select>
                  </div>
                )}
              </div>
              {/* Transportation */}
              <div>
                <button type="button" onClick={() => toggleExpand("transportation")}
                  className="text-left w-full font-semibold text-gray-700 flex items-center gap-2">
                  <span>{expanded.transportation ? "▼" : "►"}</span> Transportation
                </button>
                {expanded.transportation && (
                  <div className="pl-6 pt-2">
                    {form.productData.transportation.map((tr, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <select
                          value={tr.mode}
                          onChange={e => handleArrayChange(idx, "mode", e.target.value, "transportation")}
                          className="border rounded px-2 py-1"
                        >
                          <option value="truck">Truck</option>
                          <option value="ship">Ship</option>
                          <option value="plane">Plane</option>
                          <option value="rail">Rail</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Distance (km)"
                          value={tr.distance}
                          min="0"
                          onChange={e => handleArrayChange(idx, "distance", Number(e.target.value), "transportation")}
                          className="border rounded px-2 py-1"
                        />
                        <input
                          type="number"
                          placeholder="Weight (kg)"
                          value={tr.weight}
                          min="0"
                          onChange={e => handleArrayChange(idx, "weight", Number(e.target.value), "transportation")}
                          className="border rounded px-2 py-1"
                        />
                        {idx === form.productData.transportation.length - 1 && (
                          <button type="button" onClick={handleAddTransport} className="bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded">Add</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Packaging */}
              <div>
                <button type="button" onClick={() => toggleExpand("packaging")}
                  className="text-left w-full font-semibold text-gray-700 flex items-center gap-2">
                  <span>{expanded.packaging ? "▼" : "►"}</span> Packaging
                </button>
                {expanded.packaging && (
                  <div className="pl-6 pt-2 flex gap-4">
                    <select
                      value={form.productData.packaging.type}
                      onChange={e => handleProductDataChange("packaging", { ...form.productData.packaging, type: e.target.value })}
                      className="border rounded px-2 py-1"
                    >
                      <option value="plastic">Plastic</option>
                      <option value="cardboard">Cardboard</option>
                      <option value="recycledCardboard">Recycled Cardboard</option>
                      <option value="biodegradable">Biodegradable</option>
                      <option value="minimal">Minimal</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Weight (kg)"
                      value={form.productData.packaging.weight}
                      min="0"
                      onChange={e => handleProductDataChange("packaging", { ...form.productData.packaging, weight: Number(e.target.value) })}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                )}
              </div>
              {/* Disposal */}
              <div>
                <button type="button" onClick={() => toggleExpand("disposal")}
                  className="text-left w-full font-semibold text-gray-700 flex items-center gap-2">
                  <span>{expanded.disposal ? "▼" : "►"}</span> Disposal
                </button>
                {expanded.disposal && (
                  <div className="pl-6 pt-2 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.productData.disposal.isRecyclable}
                        onChange={e => handleProductDataChange("disposal", { ...form.productData.disposal, isRecyclable: e.target.checked })}
                      />
                      Recyclable
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.productData.disposal.isBiodegradable}
                        onChange={e => handleProductDataChange("disposal", { ...form.productData.disposal, isBiodegradable: e.target.checked })}
                      />
                      Biodegradable
                    </label>
                  </div>
                )}
              </div>
              {/* Product Weight */}
              <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">Product Weight (kg):</label>
                <input
                  type="number"
                  min="0"
                  value={form.productData.productWeight}
                  onChange={e => handleProductDataChange("productWeight", Number(e.target.value))}
                  className="border rounded px-2 py-1"
                />
              </div>
            </div>
            {/* Sustainability Features */}
            <div className="bg-gray-50 rounded p-4">
              <div className="font-semibold mb-2">Sustainability Features</div>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.isRecyclable} onChange={e => handleSustainabilityChange("isRecyclable", e.target.checked)} />
                  Recyclable
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.isReusable} onChange={e => handleSustainabilityChange("isReusable", e.target.checked)} />
                  Reusable
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.isBiodegradable} onChange={e => handleSustainabilityChange("isBiodegradable", e.target.checked)} />
                  Biodegradable
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.renewableEnergy} onChange={e => handleSustainabilityChange("renewableEnergy", e.target.checked)} />
                  Renewable Energy
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.fairTrade} onChange={e => handleSustainabilityChange("fairTrade", e.target.checked)} />
                  Fair Trade
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.locallySourced} onChange={e => handleSustainabilityChange("locallySourced", e.target.checked)} />
                  Locally Sourced
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.sustainabilityFeatures.organicMaterials} onChange={e => handleSustainabilityChange("organicMaterials", e.target.checked)} />
                  Organic Materials
                </label>
                <label className="flex items-center gap-2">
                  <span>Recycled Content (%)</span>
                  <input type="number" min="0" max="100" value={form.sustainabilityFeatures.recycledContent} onChange={e => handleSustainabilityChange("recycledContent", Number(e.target.value))} className="border rounded px-2 py-1 w-16" />
                </label>
                <label className="flex items-center gap-2">
                  <span>Packaging Type</span>
                  <select value={form.sustainabilityFeatures.packagingType} onChange={e => handleSustainabilityChange("packagingType", e.target.value)} className="border rounded px-2 py-1">
                    <option value="cardboard">Cardboard</option>
                    <option value="plastic">Plastic</option>
                    <option value="minimal">Minimal</option>
                    <option value="biodegradable">Biodegradable</option>
                    <option value="recycled">Recycled</option>
                    <option value="sustainable-packaging">Sustainable Packaging</option>
                  </select>
                </label>
              </div>
            </div>
            {/* Error Message */}
            {error && <div className="text-red-600 text-sm font-semibold text-center">{error}</div>}
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-2 rounded shadow"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Submitting...</span>
                ) : "Submit Product"}
              </button>
            </div>
          </form>
          {/* Result Summary */}
          {result && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-green-700 mb-2">Product Submitted!</h2>
              <div className="text-sm text-gray-700 mb-2">Green Score: <span className="font-bold text-green-700">{result.greenScore}</span></div>
              <div className="text-sm text-gray-700 mb-2">Green Coins: <span className="font-bold text-yellow-700">{result.greenCoins}</span></div>
              <div className="text-sm text-gray-700 mb-2">Carbon Footprint (kg CO₂): <span className="font-bold text-blue-700">{typeof result.carbonFootprint === 'object' ? result.carbonFootprint.total : result.carbonFootprint}</span></div>
              <div className="text-sm text-gray-700">Product ID: <span className="font-mono">{result.product?._id}</span></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
