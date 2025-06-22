'use client';
import React, { useEffect, useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import GreenScore from "../../components/GreenScore";
import EcoBadge from "../../components/EcoBadge";
import GreenCoin from "../../components/GreenCoin";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { UserContext } from "@/context/UserContext";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  images: string[];
  greenScore: number;
  carbonFootprint: number | { total: number };
  isEcoFriendly: boolean;
  ecoBadges: string[];
  greenCoins: number;
  carbonSaved?: string;
}

interface OrderProduct {
  _id: string;
  quantity: number;
}

interface Order {
  _id: string;
  products: OrderProduct[];
  type: string;
  status: string;
  totalCost: number;
  ecoStats?: {
    totalGreenCoins: number;
    totalCarbonSaved: number;
  };
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentInfo?: {
    method: string;
  };
  createdAt: string;
  updatedAt: string;
  groupId?: string;
}

export default function ReturnsAndOrdersPage() {
  const updatedState = useContext(UserContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders for the user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!updatedState?.userData?._id) {
        setLoading(false);
        setOrders([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const resp = await axios.get(`/api/order?userId=${updatedState.userData._id}`);
        if (resp.data.status === 200) {
          setOrders(resp.data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err: any) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [updatedState?.userData?._id]);

  // Fetch product details for all products in all orders
  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = Array.from(new Set(orders.flatMap(order => order.products.map(p => p._id))));
      if (productIds.length === 0) return;
      const newProductsMap: Record<string, Product> = { ...productsMap };
      await Promise.all(productIds.map(async (id) => {
        if (!newProductsMap[id]) {
          try {
            const resp = await axios.get(`/api/products/${id}`);
            if (resp.data.status === 200) {
              newProductsMap[id] = resp.data.product;
            }
          } catch { }
        }
      }));
      setProductsMap(newProductsMap);
    };
    if (orders.length > 0) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  // Separate orders by type
  const groupOrders = orders.filter((order) => order.type === "group");
  const normalOrders = orders.filter((order) => order.type === "normal");

  // Button component
  const ActionButtons = () => (
    <div className="flex flex-col gap-2 min-w-[180px] ml-auto items-end">
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow-sm w-full transition">Return or Replace Item</button>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow-sm w-full transition">Write a Review</button>
      <button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg shadow-sm w-full transition" onClick={() => window.alert("Your box will be collected")}>Return the Box</button>
    </div>
  );

  // Card rendering
  const renderOrderCard = (order: Order) => (
    <Card key={order._id} className="bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch">
      <div className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
            <span>Order #{order._id.slice(-6)}</span>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-200 text-gray-700 capitalize">Delievered</span>
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
            <span>Type: <span className="font-semibold text-gray-700">{order.type}</span></span>
            <span>Placed: {new Date(order.createdAt).toLocaleString()}</span>
            <span>Total: <span className="font-semibold text-green-700">₹{order.totalCost.toLocaleString()}</span></span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products.map((prod) => {
              const product = productsMap[prod._id];
              return product ? (
                <div key={prod._id} className="flex gap-4 items-center border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0] || "/public/assests/file.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{product.name}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <GreenScore
                        score={product.greenScore}
                        carbonFootprint={typeof product.carbonFootprint === "number" ? product.carbonFootprint : product.carbonFootprint?.total || 0}
                        isEcoFriendly={product.isEcoFriendly}
                      />
                      {product.isEcoFriendly && <span className="text-xs text-green-600 font-medium">Eco-friendly</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {product.ecoBadges?.map((badge) => (
                        <EcoBadge key={badge} type={badge as any} showLabel={false} />
                      ))}
                    </div>
                    <div className="text-xs text-green-600 mb-1">{product.carbonSaved}</div>
                    <div className="text-xs text-gray-500">Qty: {prod.quantity}</div>
                  </div>
                  <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                    <span className="text-xs text-green-600 mt-1">+{product.greenCoins} coins</span>
                  </div>
                </div>
              ) : (
                <div key={prod._id} className="text-xs text-gray-400 italic">Loading product...</div>
              );
            })}
          </div>
          {/* Eco Stats */}
          {order.ecoStats && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4 mb-2">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-700">Total CO₂ Saved:</span>
                  <span className="font-semibold text-green-900">{order.ecoStats.totalCarbonSaved}kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-700">Green Coins:</span>
                  <GreenCoin coins={order.ecoStats.totalGreenCoins} showIcon={false} size="sm" />
                </div>
              </div>
            </div>
          )}
          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-xs text-gray-700">
            {order.shippingAddress && (
              <div>
                <div className="font-semibold mb-1">Shipping Address</div>
                <div>{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.address}, {order.shippingAddress.city}</div>
                <div>{order.shippingAddress.country} - {order.shippingAddress.phone}</div>
              </div>
            )}
            {order.paymentInfo && (
              <div>
                <div className="font-semibold mb-1">Payment Method</div>
                <div>{order.paymentInfo.method}</div>
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <ActionButtons />
      </div>
    </Card>
  );

  return (
    <div className="bg-[#E3E6E6] min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl  mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders & Returns</h1>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold py-10">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600 font-medium py-10">No orders found.</div>
        ) : (
          <>
            {groupOrders.length > 0 && (
              <section className="mb-10 min-w-4xl">
                <h2 className="text-xl font-bold text-green-800 mb-4">Group Orders</h2>
                <div className="flex flex-col gap-6">
                  {groupOrders.map(renderOrderCard)}
                </div>
              </section>
            )}
            {normalOrders.length > 0 && (
              <section className="min-w-4xl">
                <h2 className="text-xl font-bold text-blue-800 mb-4">Normal Orders</h2>
                <div className="flex flex-col gap-6">
                  {normalOrders.map(renderOrderCard)}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
