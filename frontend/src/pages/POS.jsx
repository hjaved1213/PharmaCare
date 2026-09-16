import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

const POS = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('/inventory/list');
      setMedicines(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const addToCart = (med) => {
    if (med.stock <= 0) return;
    const existing = cart.find(item => item._id === med._id);
    if (existing) {
      if (existing.quantity >= med.stock) return;
      setCart(cart.map(item => item._id === med._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...med, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      await axios.post('/sales/add', {
        items: cart,
        totalAmount: totalPrice
      });
      setCart([]);
      setShowSuccess(true);
      fetchMedicines();
    } catch (err) {
      setErrorMsg("Checkout Failed. Please check server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto transition-all duration-300">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#111c44] w-full max-w-sm rounded-[30px] p-8 shadow-2xl text-center">
            <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold dark:text-white mb-2">Sale Complete!</h2>
            <button onClick={() => setShowSuccess(false)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl mt-4">Continue</button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-2xl flex items-center gap-2">
          <AlertCircle size={20} /> {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-[#1B254B] dark:text-white">Pharmacy POS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicines.map((med) => (
              <div key={med._id} onClick={() => addToCart(med)} className="bg-white dark:bg-[#111c44] p-5 rounded-[25px] border border-gray-100 dark:border-white/5 cursor-pointer hover:border-blue-500 transition-all shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-[#1B254B] dark:text-white">{med.name}</h3>
                  <span className="text-blue-600 font-bold">Rs. {med.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{med.category}</p>
                <p className={`text-xs font-bold mt-2 ${med.stock < 15 ? 'text-red-500' : 'text-green-500'}`}>Stock: {med.stock}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111c44] rounded-[30px] p-6 shadow-sm border border-gray-100 dark:border-white/5 h-fit sticky top-28">
          <h2 className="text-xl font-bold mb-6 text-[#1B254B] dark:text-white">Order Summary</h2>
          {cart.length === 0 ? <p className="text-gray-400 text-center py-10">Cart is empty</p> : 
            cart.map(item => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold text-sm dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">Rs. {item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => setCart(cart.filter(c => c._id !== item._id))} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            ))
          }
          <div className="border-t border-gray-100 dark:border-white/5 pt-4 mt-6">
            <div className="flex justify-between mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-blue-600">Rs. {cart.reduce((s,i)=>s+(i.price*i.quantity),0).toLocaleString()}</span>
            </div>
            <button onClick={handleCheckout} disabled={cart.length === 0 || loading} className="w-full bg-[#1B254B] dark:bg-blue-600 text-white font-bold py-4 rounded-2xl disabled:opacity-30">
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;