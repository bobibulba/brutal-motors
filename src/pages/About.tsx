import React from 'react';
import { Award, Users, Clock, Shield, Star, Target, Heart, Zap, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const About: React.FC = () => {
  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Customers' },
    { icon: Clock, value: '25+', label: 'Years Experience' },
    { icon: Award, value: '500+', label: 'Awards Won' },
    { icon: Shield, value: '100%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Target,
      title: 'PRECISION',
      description: 'Every detail matters. From vehicle selection to customer service, we maintain the highest standards of precision and quality.'
    },
    {
      icon: Heart,
      title: 'PASSION',
      description: 'We live and breathe automotive excellence. Our passion for cars drives everything we do, from curation to customer care.'
    },
    {
      icon: Shield,
      title: 'TRUST',
      description: 'Built on decades of honest dealings and transparent processes. Your trust is our most valuable asset.'
    },
    {
      icon: Zap,
      title: 'INNOVATION',
      description: 'Embracing cutting-edge technology and modern approaches while respecting automotive heritage and craftsmanship.'
    }
  ];

  const team = [
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: '25+ years in luxury automotive sales. Former Ferrari and Lamborghini dealer principal.',
      specialties: ['Exotic Cars', 'Business Strategy', 'Customer Relations']
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=300&h=300&fit=crop',
      bio: 'Expert in luxury vehicle sales with deep knowledge of European and American performance cars.',
      specialties: ['Luxury Sales', 'Market Analysis', 'Client Advisory']
    },
    {
      name: 'David Thompson',
      role: 'Master Technician',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      bio: 'ASE Master Certified with 20+ years experience in high-performance vehicle maintenance.',
      specialties: ['Performance Tuning', 'Diagnostics', 'Restoration']
    },
    {
      name: 'Elena Vasquez',
      role: 'Finance Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Specialized in automotive financing with connections to premium lending institutions.',
      specialties: ['Financing Solutions', 'Lease Programs', 'Insurance']
    }
  ];

  const timeline = [
    { year: '1998', event: 'Founded as a small family dealership specializing in European imports' },
    { year: '2003', event: 'Expanded to include American muscle cars and performance vehicles' },
    { year: '2008', event: 'Opened state-of-the-art service center and customer lounge' },
    { year: '2012', event: 'Launched online inventory system and virtual showroom tours' },
    { year: '2018', event: 'Became authorized dealer for multiple luxury brands' },
    { year: '2023', event: 'Introduced AI-powered vehicle matching and concierge services' }
  ];

  const certifications = [
    'Better Business Bureau A+ Rating',
    'Automotive Service Excellence (ASE) Certified',
    'National Independent Automobile Dealers Association Member',
    'Certified Pre-Owned Vehicle Dealer',
    'Environmental Protection Agency Compliant',
    'State Licensed Motor Vehicle Dealer'
  ];

  return (
    <div className="min-h-screen bg-brutal-pink">
      {/* Hero Section */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">ABOUT BRUTAL MOTORS</h1>
            <p className="text-2xl max-w-4xl mx-auto mb-8">
              WHERE AUTOMOTIVE PASSION MEETS UNCOMPROMISING EXCELLENCE. 
              WE DON'T JUST SELL CARS – WE CURATE AUTOMOTIVE DREAMS.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="primary" size="lg">OUR STORY</Button>
              <Button variant="secondary" size="lg">MEET THE TEAM</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center" hover>
              <stat.icon className="h-12 w-12 mx-auto mb-4" />
              <div className="text-3xl font-bold text-brutal-green mb-2">{stat.value}</div>
              <div className="font-bold">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">OUR MISSION</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To revolutionize the automotive retail experience by combining cutting-edge technology 
              with old-school craftsmanship and genuine human connection. We believe every car has a 
              story, and every customer deserves to find their perfect automotive companion through 
              a process that's transparent, exciting, and utterly unforgettable.
            </p>
          </div>
        </Card>

        {/* Values Section */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-8">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6" hover>
                <value.icon className="h-12 w-12 mb-4 text-brutal-green" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-lg">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-8">MEET OUR TEAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="p-0 overflow-hidden" hover>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-brutal-green font-bold mb-3">{member.role}</div>
                  <p className="text-sm mb-3">{member.bio}</p>
                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-brutal-yellow" />
                        <span className="text-xs">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <Card className="p-8">
          <h2 className="text-4xl font-bold text-center mb-8">OUR JOURNEY</h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-brutal-yellow border-2 border-black px-3 py-1 font-bold text-sm">
                  {item.year}
                </div>
                <div className="flex-1">
                  <p className="text-lg">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-8">
          <h2 className="text-4xl font-bold text-center mb-8">CERTIFICATIONS & MEMBERSHIPS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Location & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">VISIT OUR SHOWROOM</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>1234 Performance Drive, Motor City, MC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>(555) 123-CARS</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>info@brutalmotors.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5" />
                <div>
                  <div>Mon-Fri: 9:00 AM - 8:00 PM</div>
                  <div>Sat: 9:00 AM - 6:00 PM</div>
                  <div>Sun: 12:00 PM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">WHY CHOOSE US?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>Handpicked premium vehicle selection</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>Comprehensive vehicle history reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>Competitive financing options</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>Full-service maintenance facility</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>Lifetime customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-brutal-green" />
                <span>30-day exchange guarantee</span>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">READY TO FIND YOUR DREAM CAR?</h2>
          <p className="text-xl mb-6">
            Experience the Brutal Motors difference. Visit our showroom or browse our inventory online.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="primary" size="lg">VIEW INVENTORY</Button>
            <Button variant="secondary" size="lg">SCHEDULE VISIT</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
