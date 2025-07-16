import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminRoute from './components/Admin/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Inventory from './pages/Inventory';
import CarDetails from './pages/CarDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Admin/Dashboard';
import CarManagement from './pages/Admin/CarManagement';
import AddCar from './pages/Admin/AddCar';
import UserManagement from './pages/Admin/UserManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="cars" element={<CarManagement />} />
            <Route path="cars/add" element={<AddCar />} />
            <Route path="users" element={<UserManagement />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/car/:id" element={<CarDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
