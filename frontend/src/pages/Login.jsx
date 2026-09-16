import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Plus, AlertCircle } from 'lucide-react';
import axios from '../api/axiosConfig';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await axios.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || "Invalid Credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE] dark:bg-[#0b1437] p-6 transition-all duration-300">
            <div className="w-full max-w-md bg-white dark:bg-[#111c44] rounded-[30px] p-10 shadow-3xl shadow-shadow-500 border border-gray-100 dark:border-white/5 transition-all">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-xl shadow-blue-200 dark:shadow-none">
                        <Plus className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1B254B] dark:text-white tracking-tight uppercase">PharmaCare</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Modern Inventory Management</p>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 rounded-2xl text-red-600 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required 
                            className="w-full bg-gray-50 dark:bg-[#0b1437] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-5 text-[#1B254B] dark:text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-400" 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            className="w-full bg-gray-50 dark:bg-[#0b1437] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-5 text-[#1B254B] dark:text-white outline-none focus:border-blue-500 transition-all placeholder:text-gray-400" 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#1B254B] dark:bg-blue-600 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg active:scale-95">
                        {loading ? "Checking..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;