import React, { useState, useEffect } from 'react';
import { Car, Users, Calendar, DollarSign, TrendingUp, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalUsers: 0,
    pendingAppointments: 0,
    totalValue: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch cars stats
        const { data: cars } = await supabase.from('cars').select('*');
        const totalCars = cars?.length || 0;
        const availableCars = cars?.filter(car => car.available).length || 0;
        const totalValue = cars?.reduce((sum, car) => sum + car.price, 0) || 0;

        // Fetch users count
        const { data: users } = await supabase.from('profiles').select('id');
        const totalUsers = users?.length || 0;

        // Fetch appointments
        const { data: appointments } = await supabase
          .from('appointments')
          .select('*')
          .eq('status', 'pending');
        const pendingAppointments = appointments?.length || 0;

        setStats({
          totalCars,
          availableCars,
          totalUsers,
          pendingAppointments,
          totalValue
        });

        // Mock recent activity for now
        setRecentActivity([
          { id: 1, type: 'car_added', message: 'New Ferrari 488 GTB added to inventory', time: '2 hours ago' },
          { id: 2, type: 'appointment', message: 'Test drive scheduled for McLaren 720S', time: '4 hours ago' },
          { id: 3, type: 'user_registered', message: 'New user registered: john@example.com', time: '6 hours ago' },
          { id: 4, type: 'car_sold', message: 'Lamborghini Huracán marked as sold', time: '1 day ago' },
        ]);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Cars',
      value: stats.totalCars,
      icon: Car,
      color: 'bg-blue-500',
      change: '+2 this week'
    },
    {
      title: 'Available Cars',
      value: stats.availableCars,
      icon: Eye,
      color: 'bg-green-500',
      change: `${stats.availableCars}/${stats.totalCars} available`
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+5 this month'
    },
    {
      title: 'Pending Appointments',
      value: stats.pendingAppointments,
      icon: Calendar,
      color: 'bg-yellow-500',
      change: 'Needs attention'
    },
    {
      title: 'Inventory Value',
      value: `$${(stats.totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'bg-red-500',
      change: '+12% this quarter'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Brutal Motors admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/cars/add"
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              <Car className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add New Car</span>
            </a>
            <a
              href="/admin/users"
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              <Users className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage Users</span>
            </a>
            <a
              href="/admin/appointments"
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">View Appointments</span>
            </a>
            <a
              href="/admin/settings"
              className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg text-center transition-colors"
            >
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Analytics</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
