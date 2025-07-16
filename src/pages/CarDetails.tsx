import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Phone, Mail } from 'lucide-react';

const CarDetails: React.FC = () => {
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock car data - in a real app, this would come from an API
  const car = {
    id: parseInt(id || '1'),
    make: 'Ferrari',
    model: '488 GTB',
    year: 2023,
    price: 299000,
    images: [
      'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    mileage: 1200,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    horsepower: 661,
    engine: '3.9L Twin-Turbo V8',
    drivetrain: 'RWD',
    color: 'Rosso Corsa Red',
    interior: 'Black Leather',
    vin: 'ZFF79ALA5N0123456',
    features: [
      'Carbon Fiber Interior Package',
      'Premium Sound System',
      'Navigation System',
      'Backup Camera',
      'Heated Seats',
      'Adaptive Suspension',
      'Carbon Ceramic Brakes',
      'LED Headlights'
    ],
    description: 'This stunning Ferrari 488 GTB represents the pinnacle of Italian automotive engineering. With its twin-turbocharged V8 engine producing 661 horsepower, this vehicle delivers breathtaking performance while maintaining the elegance and sophistication Ferrari is renowned for.'
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/inventory"
          className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Inventory
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={car.images[currentImageIndex]}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex space-x-2 mt-4">
              {car.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-red-600' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {car.year} {car.make} {car.model}
            </h1>
            
            <p className="text-3xl font-bold text-red-600 mb-6">
              ${car.price.toLocaleString()}
            </p>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Year: {car.year}</span>
              </div>
              <div className="flex items-center">
                <Gauge className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Mileage: {car.mileage.toLocaleString()} mi</span>
              </div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Engine: {car.engine}</span>
              </div>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Transmission: {car.transmission}</span>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Horsepower:</strong> {car.horsepower} HP</div>
                <div><strong>Drivetrain:</strong> {car.drivetrain}</div>
                <div><strong>Exterior Color:</strong> {car.color}</div>
                <div><strong>Interior:</strong> {car.interior}</div>
                <div><strong>Fuel Type:</strong> {car.fuelType}</div>
                <div><strong>VIN:</strong> {car.vin}</div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed">{car.description}</p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Schedule Test Drive
              </button>
              <a
                href="tel:+15551234567"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Test Drive</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any specific questions or requirements?"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
