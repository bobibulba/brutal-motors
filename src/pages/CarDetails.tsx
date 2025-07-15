import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Fuel, Gauge, Palette, Settings, Check, ArrowLeft } from 'lucide-react';
import { useCarById } from '../hooks/useCars';
import { useAppointments } from '../hooks/useAppointments';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { car, isLoading, error } = useCarById(id || '');
  const { createAppointment, isLoading: appointmentLoading } = useAppointments();
  const { user } = useAuth();

  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAppointmentData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !car) {
      navigate('/auth');
      return;
    }

    const success = await createAppointment({
      carId: car.id,
      date: appointmentData.date,
      time: appointmentData.time,
      notes: appointmentData.notes,
    });

    if (success) {
      setAppointmentSuccess(true);
      setAppointmentData({ date: '', time: '', notes: '' });
      setTimeout(() => setAppointmentSuccess(false), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center font-mono font-black text-4xl">LOADING CAR DETAILS...</div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-mono font-black text-4xl mb-8 text-red-600">CAR NOT FOUND</div>
            <Button onClick={() => navigate('/inventory')} icon={ArrowLeft}>
              BACK TO INVENTORY
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button onClick={() => navigate('/inventory')} variant="secondary" icon={ArrowLeft}>
            BACK TO INVENTORY
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Image and Basic Info */}
          <div>
            <Card className="mb-8">
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            </Card>

            <Card className="p-8">
              <div className="mb-6">
                <h1 className="font-mono font-black text-4xl mb-2">
                  {car.make} {car.model}
                </h1>
                <p className="font-mono text-5xl font-black text-brutal-yellow">
                  ${car.price.toLocaleString()}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6" />
                  <div>
                    <p className="font-mono font-bold">YEAR</p>
                    <p className="font-mono text-lg">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Gauge className="h-6 w-6" />
                  <div>
                    <p className="font-mono font-bold">MILEAGE</p>
                    <p className="font-mono text-lg">{car.mileage.toLocaleString()} MI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-6 w-6" />
                  <div>
                    <p className="font-mono font-bold">FUEL TYPE</p>
                    <p className="font-mono text-lg">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6" />
                  <div>
                    <p className="font-mono font-bold">TRANSMISSION</p>
                    <p className="font-mono text-lg">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6" />
                  <div>
                    <p className="font-mono font-bold">COLOR</p>
                    <p className="font-mono text-lg">{car.color}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="font-mono font-bold text-xl mb-4">DESCRIPTION</h3>
                <p className="font-mono text-gray-700 leading-relaxed">{car.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-mono font-bold text-xl mb-4">FEATURES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="font-mono text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Appointment Form */}
          <div>
            <Card className="p-8" id="appointment">
              <h2 className="font-mono font-black text-3xl mb-6">SCHEDULE TEST DRIVE</h2>

              {appointmentSuccess && (
                <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-3 mb-6 font-mono font-bold">
                  APPOINTMENT SCHEDULED SUCCESSFULLY!
                </div>
              )}

              {!user ? (
                <div className="text-center py-8">
                  <p className="font-mono text-xl mb-6">LOGIN TO SCHEDULE A TEST DRIVE</p>
                  <Button onClick={() => navigate('/auth')} variant="primary">
                    LOGIN / REGISTER
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleAppointmentSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <Input
                      label="Preferred Date"
                      type="date"
                      value={appointmentData.date}
                      onChange={handleInputChange('date')}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                    <Input
                      label="Preferred Time"
                      type="time"
                      value={appointmentData.time}
                      onChange={handleInputChange('time')}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-mono font-bold text-sm mb-2">
                      ADDITIONAL NOTES
                    </label>
                    <textarea
                      value={appointmentData.notes}
                      onChange={handleInputChange('notes')}
                      placeholder="ANY SPECIFIC REQUESTS OR QUESTIONS..."
                      className="w-full px-4 py-3 border-2 border-black font-mono placeholder-gray-500 focus:outline-none focus:border-brutal-yellow transition-colors duration-200"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={appointmentLoading}
                    icon={Calendar}
                  >
                    {appointmentLoading ? 'SCHEDULING...' : 'SCHEDULE TEST DRIVE'}
                  </Button>
                </form>
              )}

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="font-mono font-bold text-xl mb-4">CONTACT US</h3>
                <div className="space-y-2 font-mono">
                  <p>📞 (555) 123-BRUTAL</p>
                  <p>📧 sales@brutalmotors.com</p>
                  <p>📍 123 Speed Street, Motor City</p>
                  <p>🕒 Mon-Sat: 9AM-8PM, Sun: 11AM-6PM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
