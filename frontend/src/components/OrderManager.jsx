import { useGetOrdersQuery, useDeliverOrderMutation } from '../redux/slices/ordersApiSlice';
import { useGetDeliveryPartnersQuery } from '../redux/slices/deliveryApiSlice';
import { useState } from 'react';

const OrderManager = () => {
    const { data: orders, isLoading, refetch } = useGetOrdersQuery();
    const { data: partners } = useGetDeliveryPartnersQuery();
    const [deliverOrder] = useDeliverOrderMutation();

    const handleStatusUpdate = async (id, status) => {
        // Implementation for general status update can be added here
        // For now focusing on marking as delivered
        if (status === 'Delivered') {
            try {
                await deliverOrder(id).unwrap();
                refetch();
            } catch (err) {
                console.error(err);
                alert('Update failed');
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-4 font-bold text-gray-600">Order ID</th>
                            <th className="p-4 font-bold text-gray-600">Customer</th>
                            <th className="p-4 font-bold text-gray-600">Items</th>
                            <th className="p-4 font-bold text-gray-600">Total</th>
                            <th className="p-4 font-bold text-gray-600">Status</th>
                            <th className="p-4 font-bold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-sm font-mono text-blue-600">#{order._id.substring(20)}</td>
                                <td className="p-4">
                                    <div className="font-bold">{order.user.name}</div>
                                    <div className="text-sm text-gray-500">{order.user.address}</div>
                                </td>
                                <td className="p-4">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="text-sm">
                                            {item.qty}x {item.title}
                                        </div>
                                    ))}
                                </td>
                                <td className="p-4 font-bold">₹{order.totalPrice}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.isDelivered ? 'Delivered' : order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {!order.isDelivered && (
                                        <button
                                            onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                        >
                                            Mark Delivered
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {orders?.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManager;
