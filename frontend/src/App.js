import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import POS from './pages/POS';
import About from './pages/About'; // <--- Yeh import missing tha, ab fix ho gaya
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      {/* Permanent Dark Theme Wrapper */}
      <div className="dark min-h-screen bg-[#0b1437] flex flex-col transition-all duration-300">
        <main className="relative flex flex-col flex-1 w-full">
          
          {/* Navbar sirf login ke baad nazar aayegi */}
          {user && <Navbar user={user} onLogout={handleLogout} />}
          
          {/* Main Content Area */}
          <div className="flex-1 w-full pb-10">
            <Routes>
              {/* Login Route */}
              <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
              
              {/* Protected Routes */}
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/inventory" element={user ? <Inventory /> : <Navigate to="/login" />} />
              <Route path="/pos" element={user ? <POS /> : <Navigate to="/login" />} />
              <Route path="/about" element={user ? <About /> : <Navigate to="/login" />} />

              {/* Redirect any unknown route to dashboard */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          {/* Footer hamesha niche rahega (Login ke ilawa) */}
          {user && <Footer />}
        </main>
      </div>
    </Router>
  );
}

export default App;