import React from 'react';
import { Award, Users, Shield, Clock, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years in Business', value: '25+' },
    { label: 'Vehicles Sold', value: '10,000+' },
    { label: 'Satisfied Customers', value: '8,500+' },
    { label: 'Expert Staff', value: '50+' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'Every transaction is built on honesty and transparency. We provide complete vehicle histories and stand behind our quality guarantee.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in vehicle selection, customer service, and after-sales support to exceed your expectations.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. Our dedicated team works tirelessly to ensure you find the perfect vehicle for your needs.'
    },
    {
      icon: Target,
      title: 'Performance Focus',
      description: 'Specializing in high-performance and luxury vehicles, we understand what driving enthusiasts truly desire.'
    }
  ];

  const team = [
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '25+ years in luxury automotive sales with a passion for connecting customers with their dream cars.'
    },
    {
      name: 'Sarah Chen',
      role: 'Sales Director',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in high-performance vehicles with extensive knowledge of European and American supercars.'
    },
    {
      name: 'David Thompson',
      role: 'Service Manager',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Certified master technician ensuring every vehicle meets our rigorous quality standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Brutal Motors</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              For over two decades, we've been the premier destination for luxury and high-performance vehicles, 
              building lasting relationships with automotive enthusiasts worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 1999 by automotive enthusiast Marcus Rodriguez, Brutal Motors began as a small 
                  specialty dealership with a simple mission: to connect passionate drivers with extraordinary vehicles.
                </p>
                <p>
                  What started as a modest showroom has evolved into one of the most respected luxury car dealerships 
                  in the region. Our commitment to authenticity, quality, and customer satisfaction has earned us 
                  the trust of collectors, enthusiasts, and everyday drivers alike.
                </p>
                <p>
                  Today, we continue to uphold the same values that founded our company: integrity, excellence, 
                  and an unwavering passion for automotive perfection. Every vehicle in our inventory is carefully 
                  selected and thoroughly inspected to meet our exacting standards.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury car showroom"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind your automotive journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            To provide an exceptional automotive experience by offering the finest selection of luxury and 
            high-performance vehicles, backed by unparalleled service and expertise. We believe that finding 
            the perfect car should be as thrilling as driving it.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience the Difference</h2>
          <p className="text-xl text-gray-600 mb-8">
            Visit our showroom and discover why thousands of customers trust Brutal Motors 
            with their automotive dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inventory"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View Inventory
            </a>
            <a
              href="/contact"
              className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
