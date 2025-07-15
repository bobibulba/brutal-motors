import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { cars } from '../data/cars';
import { Car } from '../types';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    fuelType: '',
    priceRange: '',
    year: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm);

      const matchesMake = !filters.make || car.make === filters.make;
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;
      
      const matchesPriceRange = !filters.priceRange || (() => {
        const [min, max] = filters.priceRange.split('-').map(Number);
        return car.price >= min && (max ? car.price <= max : true);
      })();

      const matchesYear = !filters.year || car.year.toString() === filters.year;

      return matchesSearch && matchesMake && matchesFuelType && matchesPriceRange && matchesYear;
    });
  }, [searchTerm, filters]);

  const makes = [...new Set(cars.map(car => car.make))];
  const fuelTypes = [...new Set(cars.map(car => car.fuelType))];
  const years = [...new Set(cars.map(car => car.year))].sort((a, b) => b - a);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      make: '',
      fuelType: '',
      priceRange: '',
      year: '',
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-mono font-black text-4xl md:text-5xl mb-4 tracking-wider">
            VEHICLE <span className="text-brutal-yellow">INVENTORY</span>
          </h1>
          <p className="font-mono text-gray-600 text-lg">
            BROWSE OUR BRUTAL COLLECTION OF PREMIUM VEHICLES
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="SEARCH BY MAKE, MODEL, OR YEAR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black font-mono bg-white text-black placeholder-gray-500 focus:outline-none focus:bg-brutal-yellow focus:shadow-brutal transition-all duration-200"
              />
            </div>
            
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="secondary"
              icon={SlidersHorizontal}
            >
              FILTERS
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t-2 border-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block font-mono font-bold text-black mb-2 text-sm">MAKE</label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black font-mono bg-white text-black focus:outline-none focus:bg-brutal-yellow"
                  >
                    <option value="">ALL MAKES</option>
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono font-bold text-black mb-2 text-sm">FUEL TYPE</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black font-mono bg-white text-black focus:outline-none focus:bg-brutal-yellow"
                  >
                    <option value="">ALL TYPES</option>
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono font-bold text-black mb-2 text-sm">PRICE RANGE</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black font-mono bg-white text-black focus:outline-none focus:bg-brutal-yellow"
                  >
                    <option value="">ALL PRICES</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-100000">$50,000 - $100,000</option>
                    <option value="100000-200000">$100,000 - $200,000</option>
                    <option value="200000">$200,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono font-bold text-black mb-2 text-sm">YEAR</label>
                  <select
                    value={filters.year}
                    onChange={(e) => handleFilterChange('year', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-black font-mono bg-white text-black focus:outline-none focus:bg-brutal-yellow"
                  >
                    <option value="">ALL YEARS</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={clearFilters} variant="secondary" size="sm">
                  CLEAR FILTERS
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-mono font-bold text-lg">
            SHOWING {filteredCars.length} OF {cars.length} VEHICLES
          </p>
        </div>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <Card key={car.id} hover className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover"
                  />
                  {!car.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 font-mono font-bold border-2 border-white">
                        SOLD
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-mono font-black text-xl mb-2">
                    {car.year} {car.make} {car.model}
                  </h3>
                  
                  <p className="font-mono text-2xl font-bold text-brutal-yellow mb-4">
                    ${car.price.toLocaleString()}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm font-mono mb-4">
                    <div>
                      <span className="text-gray-600">MILEAGE:</span>
                      <br />
                      <span className="font-bold">{car.mileage.toLocaleString()} MI</span>
                    </div>
                    <div>
                      <span className="text-gray-600">FUEL:</span>
                      <br />
                      <span className="font-bold">{car.fuelType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">TRANSMISSION:</span>
                      <br />
                      <span className="font-bold">{car.transmission}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">COLOR:</span>
                      <br />
                      <span className="font-bold">{car.color}</span>
                    </div>
                  </div>
                  
                  <Link to={`/car/${car.id}`}>
                    <Button variant="primary" className="w-full">
                      VIEW DETAILS
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Filter className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="font-mono font-black text-2xl mb-2">NO VEHICLES FOUND</h3>
            <p className="font-mono text-gray-600 mb-6">
              TRY ADJUSTING YOUR SEARCH OR FILTER CRITERIA
            </p>
            <Button onClick={clearFilters} variant="primary">
              CLEAR ALL FILTERS
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Inventory;
