import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Wrench, DollarSign, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: MapPin,
      title: 'SHOWROOM ADDRESS',
      details: [
        '1234 Performance Drive',
        'Motor City, MC 12345',
        'United States'
      ]
    },
    {
      icon: Phone,
      title: 'PHONE NUMBERS',
      details: [
        'Sales: (555) 123-CARS',
        'Service: (555) 123-SERV',
        'Parts: (555) 123-PART'
      ]
    },
    {
      icon: Mail,
      title: 'EMAIL ADDRESSES',
      details: [
        'sales@brutalmotors.com',
        'service@brutalmotors.com',
        'info@brutalmotors.com'
      ]
    },
    {
      icon: Clock,
      title: 'BUSINESS HOURS',
      details: [
        'Mon-Fri: 9:00 AM - 8:00 PM',
        'Saturday: 9:00 AM - 6:00 PM',
        'Sunday: 12:00 PM - 5:00 PM'
      ]
    }
  ];

  const departments = [
    {
      icon: MessageSquare,
      title: 'GENERAL INQUIRIES',
      description: 'Questions about our dealership, inventory, or services',
      contact: 'info@brutalmotors.com',
      phone: '(555) 123-INFO'
    },
    {
      icon: Calendar,
      title: 'SALES DEPARTMENT',
      description: 'Vehicle purchases, test drives, and sales consultations',
      contact: 'sales@brutalmotors.com',
      phone: '(555) 123-CARS'
    },
    {
      icon: Wrench,
      title: 'SERVICE CENTER',
      description: 'Maintenance, repairs, and technical support',
      contact: 'service@brutalmotors.com',
      phone: '(555) 123-SERV'
    },
    {
      icon: DollarSign,
      title: 'FINANCING',
      description: 'Loan applications, lease options, and payment plans',
      contact: 'finance@brutalmotors.com',
      phone: '(555) 123-LOAN'
    }
  ];

  const faqs = [
    {
      question: 'What financing options do you offer?',
      answer: 'We offer competitive financing through multiple lenders, including traditional auto loans, lease programs, and special financing for qualified buyers. Our finance team works with all credit levels.'
    },
    {
      question: 'Do you accept trade-ins?',
      answer: 'Yes! We accept trade-ins and offer competitive valuations. Our team can provide an instant quote and handle all paperwork to make the process seamless.'
    },
    {
      question: 'What warranty comes with your vehicles?',
      answer: 'All our vehicles come with comprehensive warranties. New cars include manufacturer warranties, while pre-owned vehicles come with our exclusive Brutal Motors warranty covering major components.'
    },
    {
      question: 'Can I schedule a test drive online?',
      answer: 'Absolutely! You can schedule test drives through our website or by calling our sales team. We offer flexible scheduling including evenings and weekends.'
    },
    {
      question: 'Do you offer vehicle delivery?',
      answer: 'Yes, we offer complimentary delivery within 50 miles of our dealership. For longer distances, we can arrange transportation at competitive rates.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-pink">
      {/* Hero Section */}
      <div className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold mb-6">GET IN TOUCH</h1>
          <p className="text-2xl max-w-4xl mx-auto">
            READY TO TALK CARS? WE'RE HERE TO HELP WITH EVERYTHING FROM 
            VEHICLE SELECTION TO SERVICE APPOINTMENTS.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-12">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center" hover>
              <info.icon className="h-12 w-12 mx-auto mb-4 text-brutal-green" />
              <h3 className="text-lg font-bold mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <div key={idx} className="text-sm">{detail}</div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">SEND US A MESSAGE</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-brutal-green border-2 border-black flex items-center space-x-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold">Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500 text-white border-2 border-black flex items-center space-x-3">
                <AlertCircle className="h-5 w-5" />
                <span className="font-bold">Error sending message. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="FULL NAME"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="EMAIL ADDRESS"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                label="PHONE NUMBER"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />

              <div>
                <label className="block font-bold mb-2">SUBJECT</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-black font-mono"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="sales">Sales Question</option>
                  <option value="service">Service Appointment</option>
                  <option value="financing">Financing Options</option>
                  <option value="trade-in">Trade-in Valuation</option>
                  <option value="complaint">Complaint or Concern</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">PREFERRED CONTACT</label>
                  <select
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-black font-mono"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-2">URGENCY</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-black font-mono"
                  >
                    <option value="low">Low - Within a week</option>
                    <option value="normal">Normal - Within 2-3 days</option>
                    <option value="high">High - Within 24 hours</option>
                    <option value="urgent">Urgent - Same day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-3 border-2 border-black font-mono resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                icon={Send}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </Button>
            </form>
          </Card>

          {/* Departments & Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">DEPARTMENTS</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="border-b-2 border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <dept.icon className="h-6 w-6 mt-1 text-brutal-green" />
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{dept.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{dept.contact}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span className="text-sm">{dept.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">QUICK ACTIONS</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  SCHEDULE TEST DRIVE
                </Button>
                <Button variant="secondary" className="w-full">
                  GET TRADE-IN VALUE
                </Button>
                <Button variant="secondary" className="w-full">
                  SERVICE APPOINTMENT
                </Button>
                <Button variant="secondary" className="w-full">
                  FINANCING PRE-APPROVAL
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6">EMERGENCY CONTACT</h3>
              <p className="mb-4">
                For urgent matters outside business hours, call our emergency line:
              </p>
              <div className="text-2xl font-bold text-red-600 mb-4">
                (555) 911-AUTO
              </div>
              <p className="text-sm text-gray-600">
                Available 24/7 for roadside assistance, service emergencies, and urgent sales matters.
              </p>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Map Placeholder */}
        <Card className="p-0 overflow-hidden">
          <div className="bg-gray-300 h-96 flex items-center justify-center border-b-2 border-black">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">INTERACTIVE MAP</h3>
              <p>1234 Performance Drive, Motor City, MC 12345</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold mb-2">PARKING</h4>
                <p className="text-sm">Free customer parking available with covered spaces for test drives</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2">ACCESSIBILITY</h4>
                <p className="text-sm">Fully wheelchair accessible with dedicated parking spaces</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold mb-2">AMENITIES</h4>
                <p className="text-sm">Customer lounge, WiFi, refreshments, and children's play area</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
