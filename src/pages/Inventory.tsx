import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Fuel, Gauge, Palette, Settings } from 'lucide-react';
import { useCars } from '../hooks/useCars';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Inventory: React.FC = () => {
  const { cars, isLoading, error } = useCars();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-mono font-black text-4xl mb-8">LOADING INVENTORY...</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border-4 border-black h-96 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-mono font-black text-4xl mb-8 text-red-600">ERROR LOADING INVENTORY</div>
            <p className="font-mono text-xl">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-mono font-black text-6xl mb-4 tracking-wider">
            INVENTORY
          </h1>
          <p className="font-mono text-xl text-gray-600 max-w-2xl mx-auto">
            DISCOVER OUR COLLECTION OF PREMIUM VEHICLES. EACH CAR IS HAND-SELECTED FOR PERFORMANCE AND STYLE.
          </p>
        </div>

        {/* Cars Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-12">
            <div className="font-mono font-black text-2xl mb-4">NO CARS AVAILABLE</div>
            <p className="font-mono text-gray-600">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card key={car.id} className="group hover:shadow-brutal-lg transition-all duration-300">
                {/* Car Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-brutal-yellow text-black px-3 py-1 font-mono font-bold text-sm border-2 border-black">
                      {car.year}
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-mono font-black text-2xl mb-2">
                      {car.make} {car.model}
                    </h3>
                    <p className="font-mono text-3xl font-black text-brutal-yellow">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4" />
                      <span className="font-mono text-sm">{car.mileage.toLocaleString()} MI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Fuel className="h-4 w-4" />
                      <span className="font-mono text-sm">{car.fuelType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span className="font-mono text-sm">{car.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span className="font-mono text-sm">{car.color}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 border-2 border-black px-2 py-1 font-mono text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className="bg-gray-100 border-2 border-black px-2 py-1 font-mono text-xs">
                          +{car.features.length - 3} MORE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link to={`/car/${car.id}`} className="block">
                      <Button variant="primary" className="w-full">
                        VIEW DETAILS
                      </Button>
                    </Link>
                    <Link to={`/car/${car.id}#appointment`} className="block">
                      <Button variant="secondary" className="w-full" icon={Calendar}>
                        SCHEDULE TEST DRIVE
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
