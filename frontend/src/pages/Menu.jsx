import { useState } from 'react';
import { useGetFoodsQuery } from '../redux/slices/foodsApiSlice';
import FoodCard from '../components/FoodCard';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
    const { data: foods, isLoading } = useGetFoodsQuery();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner'];

    const filteredFoods = foods?.filter(food => {
        const matchesCategory = filter === 'All' || food.category === filter;
        const matchesSearch = food.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 font-serif text-gray-800">Our Menu</h1>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${filter === cat
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-orange-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {isLoading ? (
                    <div className="text-center py-20">Loading tasty foods...</div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredFoods?.map((food) => (
                                <FoodCard key={food._id} food={food} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!isLoading && filteredFoods?.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No food found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
