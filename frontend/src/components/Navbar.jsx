import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-primary font-serif">HealthyEats</span>
                    </Link>

                    <div className="flex space-x-8 items-center">
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">Home</Link>
                        <Link to="/menu" className="text-gray-700 hover:text-primary font-medium transition">Menu</Link>

                        <Link to="/cart" className="relative group">
                            <FaShoppingCart className="text-2xl text-gray-700 group-hover:text-primary transition" />
                            {cartItems.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                >
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </motion.span>
                            )}
                        </Link>

                        <Link to="/admin/login" className="text-gray-500 hover:text-gray-800" title="Admin Login">
                            <FaUserShield size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
