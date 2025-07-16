import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Gauge, Fuel } from 'lucide-react';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const cars = [
    {
      id: 1,
      make: 'Ferrari',
      model: '488 GTB',
      year: 2023,
      price: 299000,
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 1200,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 661
    },
    {
      id: 2,
      make: 'Lamborghini',
      model: 'Huracán',
      year: 2023,
      price: 259000,
      image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 800,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 630
    },
    {
      id: 3,
      make: 'McLaren',
      model: '720S',
      year: 2022,
      price: 315000,
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 2100,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 710
    },
    {
      id: 4,
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2023,
      price: 230000,
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 500,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 640
    },
    {
      id: 5,
      make: 'Aston Martin',
      model: 'DB11',
      year: 2022,
      price: 275000,
      image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 1800,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 630
    },
    {
      id: 6,
      make: 'Bentley',
      model: 'Continental GT',
      year: 2023,
      price: 245000,
      image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
      mileage: 900,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      horsepower: 626
    }
  ];

  const makes = [...new Set(cars.map(car => car.make))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMake = selectedMake === '' || car.make === selectedMake;
    const matchesPrice = priceRange === '' || 
                        (priceRange === 'under-200k' && car.price < 200000) ||
                        (priceRange === '200k-300k' && car.price >= 200000 && car.price < 300000) ||
                        (priceRange === 'over-300k' && car.price >= 300000);
    
    return matchesSearch && matchesMake && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Inventory</h1>
          <p className="text-xl text-gray-600">Discover our collection of premium vehicles</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Make Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
              >
                <option value="">All Makes</option>
                {makes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Prices</option>
                <option value="under-200k">Under $200k</option>
                <option value="200k-300k">$200k - $300k</option>
                <option value="over-300k">Over $300k</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-gray-600">
                {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {car.year} {car.make} {car.model}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {car.year}
                  </div>
                  <div className="flex items-center">
                    <Gauge className="h-4 w-4 mr-1" />
                    {car.mileage.toLocaleString()} mi
                  </div>
                  <div className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    {car.horsepower} HP
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{car.transmission}</span>
                  <span className="text-sm text-gray-600">{car.fuelType}</span>
                </div>

                <p className="text-2xl font-bold text-red-600 mb-4">
                  ${car.price.toLocaleString()}
                </p>

                <Link
                  to={`/car/${car.id}`}
                  className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors inline-block text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No vehicles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedMake('');
                setPriceRange('');
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
