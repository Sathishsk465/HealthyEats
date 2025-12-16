import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUtensils, FaTruck, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/usersApiSlice';

const AdminSidebar = () => {
    const styles = {
        active: "bg-primary text-white",
        inactive: "text-gray-600 hover:bg-orange-100 hover:text-primary",
    };

    const location = useLocation();
    const dispatch = useDispatch();
    const [logoutApi] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
        } catch (err) {
            console.error(err);
        }
    };

    const NavItem = ({ to, icon, label, id }) => (
        <Link to={`/admin/dashboard?tab=${id}`}>
            <div
                className={`flex items-center px-6 py-3 transition-colors duration-200 cursor-pointer ${location.search.includes(id) || (location.search === '' && id === 'foods') ? styles.active : styles.inactive
                    }`}
            >
                <span className="text-xl mr-3">{icon}</span>
                <span className="font-medium">{label}</span>
            </div>
        </Link>
    );

    return (
        <div className="w-64 bg-white shadow-lg flex flex-col h-screen fixed left-0 top-0 z-10">
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-primary">HealthyEats</h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
            <nav className="flex-1 mt-6">
                <NavItem to="/admin/dashboard?tab=foods" icon={<FaUtensils />} label="Foods" id="foods" />
                <NavItem to="/admin/dashboard?tab=orders" icon={<FaClipboardList />} label="Orders" id="orders" />
                <NavItem to="/admin/dashboard?tab=delivery" icon={<FaTruck />} label="Delivery" id="delivery" />
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
