import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Car, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Home,
  Plus,
  List
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Cars', href: '/admin/cars', icon: Car },
    { name: 'Add Car', href: '/admin/cars/add', icon: Plus },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Car className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Back to Site</span>
              </Link>

              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
