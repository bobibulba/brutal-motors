import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Wrench } from 'lucide-react';
import { useCars } from '../hooks/useCars';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const { cars, isLoading } = useCars();
  const featuredCars = cars.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-mono font-black text-6xl md:text-8xl mb-6 tracking-wider">
              BRUTAL
              <span className="block text-brutal-yellow">MOTORS</span>
            </h1>
            <p className="font-mono text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              WHERE PERFORMANCE MEETS PERFECTION. DISCOVER THE MOST EXCLUSIVE COLLECTION OF HIGH-PERFORMANCE VEHICLES.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inventory">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  EXPLORE INVENTORY
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  LEARN MORE
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-mono font-black text-4xl md:text-6xl mb-4">
              WHY CHOOSE BRUTAL?
            </h2>
            <p className="font-mono text-xl text-gray-600 max-w-2xl mx-auto">
              WE DON'T JUST SELL CARS. WE DELIVER EXPERIENCES.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center group hover:shadow-brutal-lg transition-all duration-300">
              <div className="bg-brutal-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">PREMIUM QUALITY</h3>
              <p className="font-mono text-gray-600">
                Every vehicle undergoes rigorous inspection. Only the finest make it to our showroom.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-brutal-lg transition-all duration-300">
              <div className="bg-brutal-cyan w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">GUARANTEED AUTHENTICITY</h3>
              <p className="font-mono text-gray-600">
                Verified history, authentic parts, and transparent documentation for every vehicle.
              </p>
            </Card>

            <Card className="p-8 text-center group hover:shadow-brutal-lg transition-all duration-300">
              <div className="bg-brutal-pink w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="font-mono font-black text-2xl mb-4">EXPERT SERVICE</h3>
              <p className="font-mono text-gray-600">
                Our certified technicians provide ongoing support and maintenance for your investment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-mono font-black text-4xl md:text-6xl mb-4">
              FEATURED VEHICLES
            </h2>
            <p className="font-mono text-xl text-gray-600 max-w-2xl mx-auto">
              HANDPICKED SELECTIONS FROM OUR PREMIUM COLLECTION
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 border-4 border-black h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <Card key={car.id} className="group hover:shadow-brutal-lg transition-all duration-300">
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
                  <div className="p-6">
                    <h3 className="font-mono font-black text-2xl mb-2">
                      {car.make} {car.model}
                    </h3>
                    <p className="font-mono text-3xl font-black text-brutal-yellow mb-4">
                      ${car.price.toLocaleString()}
                    </p>
                    <Link to={`/car/${car.id}`}>
                      <Button variant="primary" className="w-full">
                        VIEW DETAILS
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

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
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-mono font-black text-4xl md:text-6xl mb-6">
            READY TO DRIVE?
          </h2>
          <p className="font-mono text-xl mb-8 max-w-2xl mx-auto">
            SCHEDULE A TEST DRIVE TODAY AND EXPERIENCE THE BRUTAL DIFFERENCE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inventory">
              <Button variant="primary" size="lg">
                BROWSE INVENTORY
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                CONTACT US
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
