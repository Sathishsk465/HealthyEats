import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminSidebar from '../components/AdminSidebar';
import FoodManager from '../components/FoodManager'; // Will create next
import OrderManager from '../components/OrderManager'; // Will create next
import DeliveryManager from '../components/DeliveryManager'; // Will create next

const AdminDashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

    // Simple query param parsing
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab') || 'foods';

    useEffect(() => {
        if (!userInfo) {
            navigate('/admin/login');
        }
    }, [userInfo, navigate]);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSidebar />
            <div className="ml-64 flex-1 p-8">
                {tab === 'foods' && <FoodManager />}
                {tab === 'orders' && <OrderManager />}
                {tab === 'delivery' && <DeliveryManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
