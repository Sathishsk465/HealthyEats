import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaLeaf, FaShippingFast, FaStar } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[600px] overflow-hidden flex items-center justify-center bg-gray-900 text-white">
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1500&q=80')" }}
                ></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 font-serif"
                    >
                        Authentic <span className="text-primary">South Indian</span> Flavors
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl mb-8 text-gray-200"
                    >
                        From steaming Idlis to spicy Chettinad curries, delivered to your doorstep.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link to="/menu" className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Order Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                            <FaLeaf className="text-green-600 text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Fresh & Healthy</h3>
                        <p className="text-gray-600">We use only fresh ingredients and traditional recipes without any artificial preservatives.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
                        <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                            <FaShippingFast className="text-primary text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                        <p className="text-gray-600">Hot and fresh food delivered to you within 30-45 minutes of placing your order.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
                        <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition duration-300">
                            <FaStar className="text-yellow-600 text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Top Rated</h3>
                        <p className="text-gray-600">Loved by thousands of happy customers for our authentic taste and quality.</p>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Our Favorites</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Breakfast Specials', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&h=500' },
                            { name: 'Lunch Thalis', img: 'https://images.unsplash.com/photo-1626082929543-5bab0f006c66?auto=format&fit=crop&w=500&h=500' },
                            { name: 'Dinner Delights', img: 'https://images.unsplash.com/photo-1594975586617-646a771b953d?auto=format&fit=crop&w=500&h=500' },
                            { name: 'Biryani Love', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=500&h=500' }
                        ].map((cat, idx) => (
                            <Link to="/menu" key={idx} className="relative group overflow-hidden rounded-xl h-64 shadow-md cursor-pointer">
                                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition">
                                    <h3 className="text-white text-2xl font-bold shadow-lg">{cat.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
