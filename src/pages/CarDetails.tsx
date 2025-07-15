import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Phone, Mail, Star, Shield, Wrench, Fuel, Gauge, Palette, Settings, CheckCircle, AlertCircle, Clock, MapPin } from 'lucide-react';
import { cars } from '../data/cars';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    type: 'test-drive',
    notes: ''
  });

  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-brutal-pink flex items-center justify-center p-4">
        <Card className="p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">CAR NOT FOUND</h1>
          <Button onClick={() => navigate('/inventory')}>
            BACK TO INVENTORY
          </Button>
        </Card>
      </div>
    );
  }

  const carImages = [
    car.image,
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494976688153-018c804d2e12?w=800&h=600&fit=crop'
  ];

  const specifications = [
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} miles` },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Settings, label: 'Transmission', value: car.transmission },
    { icon: Palette, label: 'Color', value: car.color },
    { icon: Calendar, label: 'Year', value: car.year.toString() },
    { icon: Shield, label: 'Warranty', value: '3 Years / 36,000 miles' }
  ];

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }
    // Handle appointment booking
    console.log('Booking appointment:', appointmentData);
    setShowAppointmentForm(false);
    alert('Appointment request submitted! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-brutal-pink">
      {/* Header */}
      <div className="bg-white border-b-4 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="secondary" 
            icon={ArrowLeft}
            onClick={() => navigate('/inventory')}
          >
            BACK TO INVENTORY
          </Button>
          <div className="flex space-x-2">
            <Button
              variant={isWishlisted ? 'danger' : 'secondary'}
              icon={Heart}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
            </Button>
            <Button variant="secondary" icon={Share2}>
              SHARE
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Card className="p-0 overflow-hidden">
              <img
                src={carImages[selectedImage]}
                alt={`${car.make} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            </Card>
            <div className="grid grid-cols-4 gap-2">
              {carImages.map((image, index) => (
                <Card
                  key={index}
                  className={`p-0 overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'ring-4 ring-brutal-yellow' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${car.available ? 'bg-brutal-green' : 'bg-red-500'}`}></div>
                  <span className="font-bold">
                    {car.available ? 'AVAILABLE' : 'SOLD'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brutal-yellow text-brutal-yellow" />
                  ))}
                  <span className="ml-2 font-bold">4.9 (127 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                {car.year} {car.make} {car.model}
              </h1>
              
              <div className="text-4xl font-bold text-brutal-green mb-4">
                ${car.price.toLocaleString()}
              </div>
              
              <p className="text-lg mb-6">{car.description}</p>
              
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setShowAppointmentForm(true)}
                  disabled={!car.available}
                >
                  {car.available ? 'SCHEDULE TEST DRIVE' : 'UNAVAILABLE'}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" icon={Phone}>
                    CALL NOW
                  </Button>
                  <Button variant="secondary" icon={Mail}>
                    EMAIL US
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">QUICK STATS</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brutal-green">0-60</div>
                  <div className="text-sm">3.2 seconds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brutal-green">TOP SPEED</div>
                  <div className="text-sm">180 mph</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brutal-green">MPG</div>
                  <div className="text-sm">22 city / 28 hwy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brutal-green">HORSEPOWER</div>
                  <div className="text-sm">503 HP</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">SPECIFICATIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-3">
                <spec.icon className="h-6 w-6" />
                <div>
                  <div className="font-bold">{spec.label}</div>
                  <div className="text-gray-600">{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Features */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">FEATURES & OPTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Vehicle History */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">VEHICLE HISTORY</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-brutal-green" />
              <span>No accidents reported</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-brutal-green" />
              <span>Single owner vehicle</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-brutal-green" />
              <span>Full service history available</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-brutal-green" />
              <span>Clean title</span>
            </div>
          </div>
        </Card>

        {/* Financing Options */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">FINANCING OPTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-brutal-green">2.9%</div>
              <div className="text-sm">APR Financing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brutal-green">$1,299</div>
              <div className="text-sm">Monthly Payment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brutal-green">$15,000</div>
              <div className="text-sm">Trade-in Value</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Appointment Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">SCHEDULE APPOINTMENT</h3>
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">DATE</label>
                <input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                  className="w-full p-2 border-2 border-black"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">TIME</label>
                <select
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
                  className="w-full p-2 border-2 border-black"
                  required
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">TYPE</label>
                <select
                  value={appointmentData.type}
                  onChange={(e) => setAppointmentData({...appointmentData, type: e.target.value})}
                  className="w-full p-2 border-2 border-black"
                >
                  <option value="test-drive">Test Drive</option>
                  <option value="inspection">Vehicle Inspection</option>
                  <option value="consultation">Sales Consultation</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">NOTES</label>
                <textarea
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                  className="w-full p-2 border-2 border-black h-20"
                  placeholder="Any special requests or questions..."
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" variant="primary" className="flex-1">
                  BOOK APPOINTMENT
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowAppointmentForm(false)}
                >
                  CANCEL
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
