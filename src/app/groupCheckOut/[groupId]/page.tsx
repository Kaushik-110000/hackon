'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Order from '@/models/orderModel';
import mongoose from 'mongoose';
import { UserContext } from "@/context/UserContext";

// TypeScript interfaces
interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
}

interface PaymentInfo {
    method: string;
}

interface EcoStats {
    totalGreenCoins: number;
    totalCarbonSaved: number;
}

interface Product {
    _id: {
        _id: string;
        name: string;
        category: string;
        brand: string;
        description: string;
        price: number;
        originalPrice: number;
        images: string[];
        rating: number;
        ratingCount: number;
        stock: number;
        seller: string;
        greenScore: number;
        carbonFootprint: {
            rawMaterials: number;
            manufacturing: number;
            transportation: number;
            packaging: number;
            disposal: number;
            total: number;
        };
        isEcoFriendly: boolean;
        ecoBadges: string[];
        greenCoins: number;
        carbonSaved: string;
        sustainabilityFeatures: string[];
        materials: Array<{
            _id: string;
            type: string;
            weight: number;
        }>;
        transportation: Array<{
            _id: string;
            mode: string;
            distance: number;
            weight: number;
        }>;
        recycledContent: number;
        organicMaterials: boolean;
        renewableEnergy: boolean;
        fairTrade: boolean;
        locallySourced: boolean;
        isReusable: boolean;
        colors: string[];
        sizes: string[];
        deal: string;
        bestSeller: boolean;
        sponsored: boolean;
        prime: boolean;
        delivery: string;
    };
    quantity: number;
}

interface OrderItem {
    _id: string;
    user: string;
    products: Product[];
    type: string;
    status: string;
    totalCost: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    groupId: string;
    shippingAddress?: ShippingAddress;
    paymentInfo?: PaymentInfo;
    ecoStats?: EcoStats;
}

interface Admin {
    _id: string;
    mobile: number;
    userName: string;
}

interface Collaborator {
    _id: {
        _id: string;
        mobile: number;
        userName: string;
    };
    name: string;
}

interface GroupOrder {
    _id: string;
    shippingAddress: ShippingAddress;
    orders: OrderItem[];
    admin: Admin;
    collaborators: Collaborator[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function OrderPage() {
    const params = useParams();
    const groupId = params.groupId as string;
    const [shareLink, setShareLink] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [groupOrder, setGroupOrder] = useState<GroupOrder | null>(null)
    const updatedState = useContext(UserContext);
    const currentUserId = updatedState?.userData?._id;
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const generateShareLink = async () => {
        setShareLink(groupId);
        setShowShareModal(true);
    };

    const updateAddress = async () => {
        try {
            const form = document.getElementById('group-address-form') as HTMLFormElement;
            const data = new FormData(form);

            const shippingAddress = {
                name: data.get('name') as string,
                address: data.get('address') as string,
                city: data.get('city') as string,
                country: data.get('country') as string,
                phone: data.get('phone') as string
            };

            const res = await axios.put(
                `/api/group/${encodeURIComponent(groupId)}`,
                { shippingAddress }
            );

            setGroupOrder((prev) => {
                if (!prev) return null;  // or initialize it however you want
                return {
                    ...prev,
                    shippingAddress,
                };
            });

            window.alert("Address successfully updated")
        } catch (error) {
            console.error('Failed to update address:', error);
        }

    };

    useEffect(() => {
        const load = async () => {
            try {
                const res = await axios.get(`/api/group/${groupId}`);
                setGroupOrder(res.data.data)
                // console.log(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        load();
    }, [])
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold mx-auto">Secure Group checkout</h1>
            </header>

            <div className="max-w-6xl mx-auto flex gap-6 py-8">
                {/* giving the feature to again invite */}
                <div className="w-2/3 space-y-6">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold mb-4">Share the group with more friends</h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-medium text-blue-900 mb-1">Reduce packaging together</h3>
                                    <p className="text-sm text-blue-700">Share this order with friends to combine shipping and reduce environmental impact</p>
                                </div>
                                <div className="text-2xl">📦</div>
                            </div>
                            <div className="space-y-2 text-xs text-blue-700">
                                <div className="flex items-center gap-2">
                                    <span>•</span>
                                    <span>Friends can join your order within 24 hours</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>•</span>
                                    <span>Combined shipping reduces packaging waste by 60%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>•</span>
                                    <span>Everyone saves on shipping costs</span>
                                </div>
                            </div>
                            <button
                                onClick={generateShareLink}
                                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm"
                            >
                                Share Order
                            </button>
                        </div>
                    </div>

                    {/* Group Admin Section */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Group Information</h2>
                        <div className="space-y-4">
                            {/* Admin Info */}
                            <div className="border-b pb-4">
                                <h3 className="font-medium text-gray-700 mb-2">Group Admin</h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-medium">
                                            {groupOrder?.admin?.userName?.charAt(0)?.toUpperCase() || 'A'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">{groupOrder?.admin?.userName}</p>
                                        <p className="text-sm text-gray-500">+91 {groupOrder?.admin?.mobile}</p>
                                    </div>
                                    {groupOrder?.admin?._id === currentUserId && (
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            You
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Collaborators */}
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Group Members ({groupOrder?.collaborators?.length || 0})</h3>
                                <div className="space-y-2">
                                    {groupOrder?.collaborators?.map((collaborator, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 font-medium text-sm">
                                                    {collaborator.name?.charAt(0)?.toUpperCase() || 'G'}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{collaborator.name}</p>
                                                <p className="text-xs text-gray-500">+91 {collaborator._id?.mobile}</p>
                                            </div>
                                            {collaborator._id?._id === currentUserId && (
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                    You
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Delivering to :</h2>
                        {groupOrder?.admin?._id === currentUserId ? (
                            <>
                                <form id="group-address-form" className="grid grid-cols-2 gap-4">
                                    {['name', 'address', 'city', 'country', 'phone'].map(field => (
                                        <input
                                            key={field}
                                            name={field}
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                            className="border p-2 rounded w-full"
                                            defaultValue={(groupOrder?.shippingAddress as any)?.[field] || ''}
                                        />
                                    ))}
                                </form>
                                <button onClick={updateAddress} className="mt-4 bg-yellow-400 w-full py-2 rounded text-black font-medium">
                                    Update address
                                </button>
                            </>
                        ) : (
                            <div className="text-gray-600">
                                <p>Only the group admin can update the delivery address.</p>
                                {groupOrder?.shippingAddress && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded">
                                        <p><strong>Current address:</strong></p>
                                        <p>{groupOrder.shippingAddress.name}</p>
                                        <p>{groupOrder.shippingAddress.address}</p>
                                        <p>{groupOrder.shippingAddress.city}, {groupOrder.shippingAddress.country}</p>
                                        <p>Phone: {groupOrder.shippingAddress.phone}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Products Section */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Group Products</h2>

                        {/* Products added by current user */}
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Products added by you
                            </h3>
                            <div className="space-y-3">
                                {groupOrder?.orders?.filter(order => order.user === currentUserId).map((order, orderIndex) => (
                                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                                        {order.products.map((product, productIndex) => (
                                            <div key={product._id._id} className="flex items-center gap-4 py-2">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={product._id.images[0]}
                                                        alt={product._id.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Product';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{product._id.name}</h4>
                                                    <p className="text-sm text-gray-500">{product._id.brand}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-sm font-medium">₹{product._id.price}</span>
                                                        <span className="text-xs text-gray-500">x{product.quantity}</span>
                                                        {product._id.isEcoFriendly && (
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                🌱 Eco
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">₹{product._id.price * product.quantity}</p>
                                                    {product._id.greenCoins > 0 && (
                                                        <p className="text-xs text-green-600">+{product._id.greenCoins} coins</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Products added by others */}
                        <div>
                            <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Products added by others
                            </h3>
                            <div className="space-y-3">
                                {groupOrder?.orders?.filter(order => order.user !== currentUserId).map((order, orderIndex) => (
                                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="mb-2 text-sm text-gray-500">
                                            Added by: {groupOrder?.collaborators?.find(c => c._id._id === order.user)?.name || 'Unknown'}
                                        </div>
                                        {order.products.map((product, productIndex) => (
                                            <div key={product._id._id} className="flex items-center gap-4 py-2">
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={product._id.images[0]}
                                                        alt={product._id.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/64x64?text=Product';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{product._id.name}</h4>
                                                    <p className="text-sm text-gray-500">{product._id.brand}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-sm font-medium">₹{product._id.price}</span>
                                                        <span className="text-xs text-gray-500">x{product.quantity}</span>
                                                        {product._id.isEcoFriendly && (
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                🌱 Eco
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">₹{product._id.price * product.quantity}</p>
                                                    {product._id.greenCoins > 0 && (
                                                        <p className="text-xs text-green-600">+{product._id.greenCoins} coins</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Total Products</p>
                                    <p className="font-medium">
                                        {groupOrder?.orders?.reduce((total, order) =>
                                            total + order.products.length, 0
                                        ) || 0} items
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Value</p>
                                    <p className="font-medium text-lg">
                                        ₹{groupOrder?.orders?.reduce((total, order) => total + order.totalCost, 0) || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Group Stats */}
                <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 shadow-lg max-h-[650px] overflow-auto">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
                            <span className="text-lg">🌱</span>
                            <span>Group Order Summary</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Eco-Friendly Group Purchase</h3>
                        <p className="text-gray-600 text-sm mt-1">Combined shipping for better environment</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Orders */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">📦</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Orders</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{groupOrder?.orders?.length || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">Group Orders</p>
                        </div>

                        {/* Total Items */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">🛍️</span>
                                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Items</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">
                                {groupOrder?.orders?.reduce((total, order) =>
                                    total + order.products.reduce((sum, product) => sum + product.quantity, 0), 0
                                ) || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Total Items</p>
                        </div>

                        {/* Total Cost */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">💰</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Cost</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">
                                ₹{groupOrder?.orders?.reduce((total, order) => total + order.totalCost, 0) || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Total Value</p>
                        </div>

                        {/* Green Coins */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl">🌿</span>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Coins</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">
                                {groupOrder?.orders?.reduce((total, order) =>
                                    total + (Number(order.ecoStats?.totalGreenCoins) || 0), 0
                                ) || 0}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Green Coins Earned</p>
                        </div>
                    </div>

                    {/* Additional Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {/* Carbon Saved */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-600 text-lg">🌍</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Carbon Saved</p>
                                    <p className="text-lg font-bold text-emerald-600">
                                        {groupOrder?.orders?.reduce((total, order) =>
                                            total + ((order.ecoStats?.totalCarbonSaved) || 0), 0
                                        ) || 0} kg CO₂
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Group Created */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-lg">📅</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Created</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {groupOrder?.createdAt ? new Date(groupOrder.createdAt).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Members Count */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 text-lg">👥</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Members</p>
                                    <p className="text-lg font-bold text-purple-600">
                                        {groupOrder?.collaborators?.length || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Environmental Impact Banner */}
                    <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-lg">Environmental Impact</h4>
                                <p className="text-sm opacity-90">Combined shipping reduces packaging waste by 60%</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">🌱</div>
                                <div className="text-xs opacity-90">Eco-Friendly</div>
                            </div>
                        </div>
                    </div>
                    <button
                    className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow"
                    onClick={() => {
                        alert('Your order successfully placed');
                        window.location.href = '/returnsAndOrders';
                    }}
                >
                    Place Order
                </button>
                </div>
             
            </div>

            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Share order with friends</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-3">
                                Share this link with friends to combine orders and reduce packaging waste:
                            </p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-600">⏰</span>
                                <span className="text-sm font-medium text-yellow-800">Link expires in 24 hours</span>
                            </div>
                            <p className="text-xs text-yellow-700">
                                Friends must join and pay within 24 hours for combined shipping
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded text-sm"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    // Share via WhatsApp
                                    const text = `Hey! I'm ordering some eco-friendly products. Want to join and save on shipping? ${shareLink}`;
                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
                                }}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-sm"
                            >
                                Share via WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}