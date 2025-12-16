import { useState } from 'react';
import { useGetFoodsQuery, useCreateFoodMutation, useUpdateFoodMutation, useDeleteFoodMutation } from '../redux/slices/foodsApiSlice';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FoodManager = () => {
    const { data: foods, isLoading, refetch } = useGetFoodsQuery();
    const [createFood] = useCreateFoodMutation();
    const [updateFood] = useUpdateFoodMutation();
    const [deleteFood] = useDeleteFoodMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentFood, setCurrentFood] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        category: '',
        deliveryTime: '',
        availability: true,
        isVeg: true,
    });

    const openModal = (food = null) => {
        if (food) {
            setCurrentFood(food);
            setIsEditMode(true);
        } else {
            setCurrentFood({
                title: '',
                description: '',
                price: '',
                image: '',
                category: '',
                deliveryTime: '',
                availability: true,
                isVeg: true,
            });
            setIsEditMode(false);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateFood({ id: currentFood._id, ...currentFood }).unwrap();
            } else {
                await createFood(currentFood).unwrap();
            }
            refetch();
            closeModal();
        } catch (err) {
            console.error(err);
            alert('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteFood(id).unwrap();
                refetch();
            } catch (err) {
                console.error(err);
                alert('Delete failed');
            }
        }
    };

    if (isLoading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Food Menu</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition"
                >
                    <FaPlus className="mr-2" />
                    Add Food
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods?.map((food) => (
                    <motion.div
                        key={food._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <img src={food.image} alt={food.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">{food.title}</h3>
                                <div className="flex space-x-2">
                                    <button onClick={() => openModal(food)} className="text-blue-500 hover:text-blue-700">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(food._id)} className="text-red-500 hover:text-red-700">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-bold text-primary">₹{food.price}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${food.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {food.isVeg ? 'Veg' : 'Non-Veg'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">{isEditMode ? 'Edit Food' : 'Add New Food'}</h3>
                                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                    <input type="text" value={currentFood.title} onChange={(e) => setCurrentFood({ ...currentFood, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                    <textarea value={currentFood.description} onChange={(e) => setCurrentFood({ ...currentFood, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required rows="3"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                    <input type="number" value={currentFood.price} onChange={(e) => setCurrentFood({ ...currentFood, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Time</label>
                                    <input type="text" value={currentFood.deliveryTime} onChange={(e) => setCurrentFood({ ...currentFood, deliveryTime: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select value={currentFood.category} onChange={(e) => setCurrentFood({ ...currentFood, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required>
                                        <option value="">Select Category</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                                    <select value={currentFood.isVeg} onChange={(e) => setCurrentFood({ ...currentFood, isVeg: e.target.value === 'true' })} className="w-full px-3 py-2 border rounded-lg">
                                        <option value={true}>Veg</option>
                                        <option value={false}>Non-Veg</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                                    <input type="text" value={currentFood.image} onChange={(e) => setCurrentFood({ ...currentFood, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                                </div>
                                <div className="md:col-span-2 flex justify-end mt-4">
                                    <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg mr-2 hover:bg-gray-200">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600">{isEditMode ? 'Update' : 'Create'}</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FoodManager;
