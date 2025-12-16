import { useGetDeliveryPartnersQuery, useAddDeliveryPartnerMutation } from '../redux/slices/deliveryApiSlice';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const DeliveryManager = () => {
    const { data: partners, isLoading, refetch } = useGetDeliveryPartnersQuery();
    const [addPartner] = useAddDeliveryPartnerMutation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicle, setVehicle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPartner({ name, phone, vehicleNumber: vehicle }).unwrap();
            setName('');
            setPhone('');
            setVehicle('');
            refetch();
        } catch (err) {
            console.error(err);
            alert('Failed to add partner');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Partners</h2>
                <div className="grid gap-4">
                    {partners?.map((partner) => (
                        <div key={partner._id} className="bg-white p-4 rounded-xl shadow border-l-4 border-primary flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{partner.name}</h3>
                                <p className="text-gray-600 text-sm">Ph: {partner.phone}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded mb-1">{partner.vehicleNumber}</div>
                                <span className={`text-xs px-2 py-1 rounded-full ${partner.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {partner.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {partners?.length === 0 && <p className="text-gray-500">No delivery partners added yet.</p>}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow h-fit">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FaPlus className="mr-2 text-primary" /> Add New Partner
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                        <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border" required />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition">
                        Add Partner
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryManager;
