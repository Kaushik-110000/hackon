'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Order from '@/models/orderModel';
import mongoose from 'mongoose';
import { useRouter } from 'next/navigation';
interface OrderProduct { _id: string; quantity: number; }

interface Order {
    _id: string;
    products: OrderProduct[];
    type: 'normal' | 'group';
    shippingAddress?: { name: string; address: string; city: string; country: string; phone: string };
    paymentInfo?: { method: string };
    totalCost: number;
    ecoStats?: { totalGreenCoins: number; totalCarbonSaved: number };
    createdAt: string;
    groupId: string;
}


export default function OrderPage() {
    const router = useRouter();
    const params = useParams();
    const orderId = params.orderId as string;

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const [joinId, setJoinId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [generatedGid, setGeneratedId] = useState('');
    const [shareLink, setShareLink] = useState("");
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isAutoFilled, setIsAutoFilled] = useState(false);

    // Check for pending group ID from session storage
    useEffect(() => {
        const pendingGroupId = sessionStorage.getItem('pendingGroupId');
        if (pendingGroupId) {
            setJoinId(pendingGroupId);
            setIsAutoFilled(true);
            // Clear from session storage after auto-filling
            sessionStorage.removeItem('pendingGroupId');
            console.log('Auto-filled group ID from session storage:', pendingGroupId);
        }
    }, []);

    //basically generated a group and add my order to the group
    const generateShareLink = async () => {

        if (!order?.shippingAddress) {
            window.alert("Fill shipping adderss first");
            return;
        }

        if (shareLink == "") {
            try {
                const res = await axios.post("/api/group", { orderId, shippingAddress: order.shippingAddress });
                const groupId = res.data.newGroup._id;
                setGeneratedId(groupId)
                // Generate full shareable URL with current domain and query parameter
                const currentUrl = window.location.origin;
                const shareableUrl = `${currentUrl}?grp_id=${groupId}`;
                setShareLink(shareableUrl);
                setShowShareModal(true);
            } catch (error) {
                console.log(error)
            }
        }

        setShowShareModal(true);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const copyCodeAndLink = async () => {
        try {
            const codeAndLink = `Group ID: ${shareLink.split('=')[1]}\nShare Link: ${shareLink}`;
            await navigator.clipboard.writeText(codeAndLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    //simple fetching of order
    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true);
                const { data } = await axios.get<{ order: Order }>(`/api/order/${encodeURIComponent(orderId)}`);
                setOrder(data.order);
                setPaymentMethod(data.order.paymentInfo?.method || '');
            } catch (err: any) {
                setError(err.response?.data?.error || 'Failed to fetch order');
            } finally {
                setLoading(false);
            }
        }
        if (orderId) fetchOrder();
    }, [orderId]);

    if (loading) return <div className="h-64 flex items-center justify-center">Loading…</div>;
    if (error) return <div className="h-64 flex items-center justify-center text-red-600">{error}</div>;
    if (!order) return <div className="h-64 flex items-center justify-center">Order not found</div>;

    const itemCount = order.products.reduce((sum, p) => sum + p.quantity, 0);
    const deliveryCost = 49;
    const finalCost = order.type === 'group' ? order.totalCost : order.totalCost + deliveryCost;



    const handleJoinGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/group/${joinId}`, { orderId })
            console.log(res.data);
            router.push(`/groupCheckOut/${joinId}`)
        } catch (error) {
            console.log(error);
            window.alert("Failed joining the group");
        }

    };

    //simple working
    const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value);
    const savePaymentMethod = async () => {
        try {
            const form = document.getElementById('payment-form') as HTMLFormElement;
            const data = new FormData(form);

            const method = data.get('method') as string;

            if (!method) {
                alert('Please select a payment method');
                return;
            }

            const res = await axios.put(
                `/api/order/${encodeURIComponent(orderId)}`,
                { paymentInfo: { method } }
            );

            window.alert('Payment method saved');
            setOrder(res.data.order);
        } catch (err) {
            console.error('Failed to save payment method', err);
        }
    };
    const updateAddress = async () => {
        try {
            const form = document.getElementById('address-form') as HTMLFormElement;
            const data = new FormData(form);

            const shippingAddress = {
                name: data.get('name') as string,
                address: data.get('address') as string,
                city: data.get('city') as string,
                country: data.get('country') as string,
                phone: data.get('phone') as string
            };

            const res = await axios.put(
                `/api/order/${encodeURIComponent(orderId)}`,
                { shippingAddress }
            );

            // console.log('Address updated:', res.data.order);
            setOrder(res.data.order);
            window.alert("Address successfully updated")
        } catch (error) {
            console.error('Failed to update address:', error);
        }

    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold mx-auto">Secure checkout</h1>
            </header>

            <div className="max-w-6xl mx-auto flex gap-6 py-8">
                {/* Left column */}

                <div className="w-2/3 space-y-6">
                    {/* Shipping Address Form */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Delivering to :</h2>
                        <form id="address-form" className="grid grid-cols-2 gap-4">
                            {['name', 'address', 'city', 'country', 'phone'].map(field => (
                                <input
                                    key={field}
                                    name={field}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    className="border p-2 rounded w-full"
                                    defaultValue={(order.shippingAddress as any)?.[field] || ''}
                                />
                            ))}
                        </form>
                        <button onClick={updateAddress} className="mt-4 bg-yellow-400 w-full py-2 rounded text-black font-medium">
                            Update address
                        </button>
                    </div>


                    {/* Payment Method Form */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Payment method :</h2>
                        <form id="payment-form" className="mb-4">
                            <select
                                name="method"
                                value={paymentMethod}
                                onChange={handlePaymentChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select payment method</option>
                                <option value="card">Credit / Debit Card</option>
                                <option value="netbanking">Net Banking</option>
                                <option value="upi">UPI</option>
                            </select>
                        </form>
                        <button
                            onClick={savePaymentMethod}
                            className="bg-yellow-400 w-full py-2 rounded text-black font-medium"
                        >
                            Use this payment method
                        </button>
                    </div>


                    {/* Create / Join Group */}
                    {order.type === 'normal' && (

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold mb-4">Create a group with your friends</h2>
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

                            <h2 className="text-lg font-semibold mb-4 mt-7">Join your friend's group</h2>
                            {isAutoFilled && (
                                <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                                    ✅ Group ID auto-filled from shared link
                                </div>
                            )}
                            <form onSubmit={handleJoinGroup} className="flex gap-2">
                                <input
                                    value={joinId} onChange={e => setJoinId(e.target.value)}
                                    placeholder="Enter group ID"
                                    className={`flex-1 border p-2 rounded ${isAutoFilled ? 'border-green-300 bg-green-50' : ''}`}
                                />
                                <button type="submit" className="bg-green-600 text-white px-4 rounded">
                                    Join group
                                </button>
                            </form>
                        </div>
                    )}

                    {order.type === 'group' && (
                        <div className="bg-green-50 rounded-lg shadow-sm border border-green-200 p-6 mb-8">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-green-700">👥</span>
                                Grouped with
                            </h2>
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div className="w-1/3 space-y-6">
                    <div className="bg-white p-6 rounded shadow sticky top-24">
                        <h2 className="text-lg mb-4 font-extrabold">Your order summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Items ({itemCount})</span>
                                <span>₹{order.totalCost}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery</span>
                                {order.type === 'group'
                                    ? <span className="text-gray-400 line-through">₹{deliveryCost}</span>
                                    : <span>₹{deliveryCost}</span>
                                }
                            </div>
                            <div className="border-t my-2" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>₹{finalCost}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Group Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Share order with friends</h3>
                            <button
                                onClick={() => {
                                    setShowShareModal(false)
                                    router.push(`/groupCheckOut/${generatedGid}`)
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-3">
                                Share this link with friends to combine orders and reduce packaging waste:
                            </p>
                            <div className="flex items-center gap-2 mb-3">
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
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={`Group ID: ${shareLink.split('=')[1]}`}
                                    readOnly
                                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <button
                                    onClick={copyCodeAndLink}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
                                >
                                    {copied ? 'Copied!' : 'Copy Both'}
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
                                    const groupId = shareLink.split('=')[1];
                                    let addressText = '';
                                    if (order && order.shippingAddress) {
                                        const addr = order.shippingAddress;
                                        addressText = `Delivery Address:\nName: ${addr.name}\nAddress: ${addr.address}\nCity: ${addr.city}\nCountry: ${addr.country}\nPhone: ${addr.phone}`;
                                    }
                                    const text = `Hey! I'm ordering some eco-friendly products. Want to join and save on shipping?\n\nGroup ID: ${groupId}\nShare Link: ${shareLink}\n\n${addressText}`;
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
    );
}

