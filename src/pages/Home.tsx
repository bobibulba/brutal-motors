import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Award } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { cars } from '../data/cars';

const Home: React.FC = () => {
  const featuredCars = cars.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brutal-yellow/10 to-brutal-pink/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-mono font-black text-4xl md:text-6xl lg:text-8xl mb-6 tracking-wider animate-glitch">
              BRUTAL
              <span className="block text-brutal-yellow">MOTORS</span>
            </h1>
            <p className="font-mono text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              THE MOST AGGRESSIVE CAR DEALERSHIP IN THE CITY. WE DON'T SELL CARS, WE DELIVER EXPERIENCES.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inventory">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  BROWSE INVENTORY
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="secondary" size="lg">
                  BOOK TEST DRIVE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono font-black text-4xl md:text-5xl text-center mb-16 tracking-wider">
            WHY CHOOSE <span className="text-brutal-yellow">BRUTAL</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="p-8 text-center">
              <div className="bg-brutal-cyan p-4 border-2 border-black shadow-brutal w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">INSTANT APPROVAL</h3>
              <p className="font-mono text-gray-600">
                GET APPROVED IN MINUTES WITH OUR BRUTAL FAST FINANCING SYSTEM. NO WAITING, NO GAMES.
              </p>
            </Card>

            <Card hover className="p-8 text-center">
              <div className="bg-brutal-pink p-4 border-2 border-black shadow-brutal w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">BRUTAL WARRANTY</h3>
              <p className="font-mono text-gray-600">
                COMPREHENSIVE COVERAGE THAT ACTUALLY PROTECTS YOU. WE STAND BEHIND EVERY VEHICLE.
              </p>
            </Card>

            <Card hover className="p-8 text-center">
              <div className="bg-brutal-green p-4 border-2 border-black shadow-brutal w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">PREMIUM SELECTION</h3>
              <p className="font-mono text-gray-600">
                HAND-PICKED VEHICLES THAT MEET OUR BRUTAL STANDARDS. QUALITY IS NON-NEGOTIABLE.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono font-black text-4xl md:text-5xl text-center mb-16 tracking-wider">
            FEATURED <span className="text-brutal-yellow">VEHICLES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} hover className="overflow-hidden">
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-mono font-black text-xl mb-2">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="font-mono text-2xl font-bold text-brutal-yellow mb-4">
                    ${car.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center text-sm font-mono mb-4">
                    <span>{car.mileage.toLocaleString()} MI</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
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
          
          <div className="text-center mt-12">
            <Link to="/inventory">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                VIEW ALL VEHICLES
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono font-black text-4xl md:text-5xl mb-6 tracking-wider">
            READY TO GO <span className="text-brutal-yellow">BRUTAL</span>?
          </h2>
          <p className="font-mono text-xl mb-8 max-w-2xl mx-auto">
            DON'T WAIT. THE PERFECT CAR IS WAITING FOR YOU. BOOK YOUR TEST DRIVE TODAY.
          </p>
          <Link to="/auth">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              GET STARTED NOW
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
