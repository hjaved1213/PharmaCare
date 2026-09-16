import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const Inventory = () => {
    const [medicines, setMedicines] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        expiryDate: '',
        supplier: ''
    });

    // Page load hote hi database se medicines lana
    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('/inventory/list');
            setMedicines(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/inventory/add', formData);
            alert('Medicine Added Successfully!');
            setFormData({ name: '', category: '', price: '', stock: '', expiryDate: '', supplier: '' });
            fetchMedicines();
        } catch (error) {
            console.error("Error adding medicine:", error);
            alert('Failed to add medicine');
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto transition-all duration-300">
            
            {/* Professional Add Medicine Form - White/Black Theme */}
            <div className="bg-white dark:bg-[#111c44] p-8 rounded-[30px] mb-10 border border-gray-100 dark:border-white/5 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-navy-700 dark:text-white uppercase tracking-tight">
                    Add New Medicine
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Medicine Name</label>
                        <input type="text" name="name" placeholder="E.g. Augmentin" value={formData.name} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Category</label>
                        <input type="text" name="category" placeholder="E.g. Antibiotic" value={formData.category} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Price (Rs.)</label>
                        <input type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Stock Quantity</label>
                        <input type="number" name="stock" placeholder="0" value={formData.stock} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Expiry Date</label>
                        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Supplier</label>
                        <input type="text" name="supplier" placeholder="E.g. GSK" value={formData.supplier} onChange={handleChange} required className="p-4 bg-gray-50 dark:bg-[#0b1437] text-navy-700 dark:text-white rounded-2xl border border-gray-100 dark:border-white/10 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <button type="submit" className="lg:col-span-3 bg-black dark:bg-blue-600 hover:opacity-90 text-white font-bold py-4 rounded-2xl mt-2 transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                        Add to Inventory
                    </button>
                </form>
            </div>

            {/* Current Stock List - Clean White/Black Contrast */}
            <div className="bg-white dark:bg-[#111c44] p-8 rounded-[30px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                <h2 className="text-xl font-bold mb-8 text-navy-700 dark:text-white uppercase tracking-tight">
                    Current Inventory Stock
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 border-b border-gray-50 dark:border-white/5 uppercase text-[10px] tracking-widest font-black">
                                <th className="pb-4 px-4">Medicine</th>
                                <th className="pb-4 px-4">Category</th>
                                <th className="pb-4 px-4">Price</th>
                                <th className="pb-4 px-4">Stock</th>
                                <th className="pb-4 px-4 text-right">Expiry Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {medicines.length > 0 ? medicines.map((med) => (
                                <tr key={med._id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all">
                                    <td className="py-5 px-4 font-bold text-navy-700 dark:text-white">{med.name}</td>
                                    <td className="py-5 px-4 text-gray-500 dark:text-gray-400 text-sm">{med.category}</td>
                                    <td className="py-5 px-4 font-semibold text-navy-700 dark:text-gray-300">Rs. {med.price}</td>
                                    <td className="py-5 px-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${med.stock < 15 ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400'}`}>
                                            {med.stock} in stock
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 text-right text-gray-400 text-xs font-medium">
                                        {new Date(med.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">Inventory is currently empty.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;