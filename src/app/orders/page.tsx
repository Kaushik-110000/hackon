'use client';
import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { FaSearch, FaFilter, FaDownload, FaEye } from "react-icons/fa";

interface Order {
  _id: string;
  orderNumber: string;
  orderDate: string;
  deliveryDate?: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  rating?: number;
  reviewStatus: 'not-reviewed' | 'reviewed';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shipped' | 'delivered'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Mock data for demonstration
  const mockOrders: Order[] = [
    {
      _id: "1",
      orderNumber: "112-3456789-1234567",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-18",
      status: "delivered",
      totalAmount: 2499,
      items: [
        {
          _id: "item1",
          name: "Bamboo Water Bottle - 1L",
          price: 899,
          quantity: 2,
          image: "/assests/mockProducts_images/copper_bottle.webp",
          rating: 4,
          reviewStatus: "reviewed"
        },
        {
          _id: "item2",
          name: "Organic Cotton T-Shirt",
          price: 599,
          quantity: 1,
          image: "/assests/mockProducts_images/hyv.webp",
          rating: undefined,
          reviewStatus: "not-reviewed"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "Mumbai",
        country: "India",
        phone: "+91 9876543210"
      },
      paymentMethod: "Credit Card",
      trackingNumber: "1Z999AA1234567890"
    },
    {
      _id: "2",
      orderNumber: "112-3456789-1234568",
      orderDate: "2024-01-20",
      status: "shipped",
      totalAmount: 1499,
      items: [
        {
          _id: "item3",
          name: "Solar Power Bank 10000mAh",
          price: 1499,
          quantity: 1,
          image: "/assests/mockProducts_images/milton_super.webp",
          rating: undefined,
          reviewStatus: "not-reviewed"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "Mumbai",
        country: "India",
        phone: "+91 9876543210"
      },
      paymentMethod: "UPI",
      trackingNumber: "1Z999AA1234567891"
    },
    {
      _id: "3",
      orderNumber: "112-3456789-1234569",
      orderDate: "2024-01-25",
      status: "pending",
      totalAmount: 899,
      items: [
        {
          _id: "item4",
          name: "Bamboo Toothbrush Set (4 pcs)",
          price: 299,
          quantity: 3,
          image: "/assests/mockProducts_images/pigeon.webp",
          rating: undefined,
          reviewStatus: "not-reviewed"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "Mumbai",
        country: "India",
        phone: "+91 9876543210"
      },
      paymentMethod: "Net Banking"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'shipped': return 'text-blue-600';
      case 'pending': return 'text-orange-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'pending': return 'Order Placed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-[#E3E6E6] min-h-screen">
        <Nav />
        <div className="flex justify-center items-center min-h-[400px]">
          <FaSpinner className="animate-spin text-yellow-500 text-3xl mr-3" />
          <span className="text-lg font-medium">Loading your orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#E3E6E6] min-h-screen">
      <Nav />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-sm text-gray-600">
            Track, return, or buy things again
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaFilter className="text-gray-600" />
              <span className="text-sm font-medium">Filter</span>
            </button>

            {/* Download Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FaDownload className="text-gray-600" />
              <span className="text-sm font-medium">Download</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { key: 'all', label: 'All Orders', count: orders.length },
              { key: 'pending', label: 'Not Yet Shipped', count: orders.filter(o => o.status === 'pending').length },
              { key: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
              { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-sm text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'You haven\'t placed any orders yet.'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-gray-600">Order placed</span>
                        <span className="text-sm font-medium">{formatDate(order.orderDate)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="text-lg font-bold">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Order #{order.orderNumber}</div>
                        <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Order details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />

                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <div className="text-sm text-gray-600 mb-2">
                          Qty: {item.quantity} • ₹{item.price.toLocaleString()}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Buy it again
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Get product support
                          </button>
                          {order.status === 'delivered' && item.reviewStatus === 'not-reviewed' && (
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Write a product review
                            </button>
                          )}
                          {order.status === 'delivered' && item.reviewStatus === 'reviewed' && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <span>★</span>
                              <span>You reviewed this item</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <FaEye />
                          Track package
                        </button>
                        {order.status === 'delivered' && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Return or replace items
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="p-4 bg-gray-50 rounded-b-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      <div>Shipped to: {order.shippingAddress.name}</div>
                      <div>{order.shippingAddress.address}, {order.shippingAddress.city}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Archive order
                      </button>
                      <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg text-sm font-medium">
                        Track package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
