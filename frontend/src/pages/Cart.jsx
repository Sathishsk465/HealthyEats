import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { useCreateOrderMutation } from '../redux/slices/ordersApiSlice';
import Navbar from '../components/Navbar';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const deliveryCharge = subtotal > 500 ? 0 : 40;
    const total = subtotal + deliveryCharge;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        try {
            await createOrder({
                orderItems: cartItems.map((item) => ({
                    title: item.title,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                user: { name, address, phone },
                deliveryCharge,
                totalPrice: total,
            }).unwrap();

            dispatch(clearCart());
            alert('Order Placed Successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Order failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link to="/menu" className="flex items-center text-gray-600 hover:text-primary mb-6">
                    <FaArrowLeft className="mr-2" /> Back to Menu
                </Link>

                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
                        <Link to="/menu" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-orange-600 transition">
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-primary font-bold">₹{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <span className="font-bold text-gray-700">x{item.qty}</span>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary & Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
                                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                                <div className="space-y-2 mb-4 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery</span>
                                        <span>₹{deliveryCharge}</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-gray-900">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>

                                <h3 className="font-bold mb-3 mt-6 border-t pt-4">Delivery Details</h3>
                                <form onSubmit={handlePlaceOrder} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        required
                                    />
                                    <textarea
                                        placeholder="Delivery Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        rows="3"
                                        required
                                    ></textarea>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg mt-4 disabled:bg-gray-400"
                                    >
                                        {isLoading ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
