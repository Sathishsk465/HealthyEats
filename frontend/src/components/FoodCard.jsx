import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { FaShoppingCart, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FoodCard = ({ food }) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...food, qty: 1 }));
        // Could add a toast notification here
        alert(`${food.title} added to cart!`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-48 overflow-hidden">
                <img src={food.image} alt={food.title} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-sm ${food.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {food.isVeg ? 'VEG' : 'NON-VEG'}
                    </span>
                    {!food.availability && <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-500 text-white shadow-sm">Sold Out</span>}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{food.title}</h3>
                    <span className="text-lg font-bold text-primary">₹{food.price}</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{food.description}</p>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                    <FaClock className="mr-1" /> {food.deliveryTime} delivery
                </div>

                <button
                    onClick={addToCartHandler}
                    disabled={!food.availability}
                    className={`w-full flex items-center justify-center py-2 rounded-lg font-bold transition duration-300 ${food.availability
                            ? 'bg-primary text-white hover:bg-orange-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <FaShoppingCart className="mr-2" />
                    {food.availability ? 'Add to Cart' : 'Unavailable'}
                </button>
            </div>
        </motion.div>
    );
};

export default FoodCard;
