import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AddCar: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    image: '',
    mileage: '',
    fuel_type: 'Gasoline',
    transmission: 'Automatic',
    color: '',
    description: '',
    features: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const featuresArray = formData.features
        .split(',')
        .map(feature => feature.trim())
        .filter(feature => feature.length > 0);

      const { error } = await supabase.from('cars').insert([
        {
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year.toString()),
          price: parseFloat(formData.price),
          image: formData.image,
          mileage: parseInt(formData.mileage),
          fuel_type: formData.fuel_type,
          transmission: formData.transmission,
          color: formData.color,
          description: formData.description,
          features: featuresArray,
          available: true
        }
      ]);

      if (error) {
        console.error('Error adding car:', error);
        alert('Error adding car. Please try again.');
      } else {
        alert('Car added successfully!');
        navigate('/admin/cars');
      }
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Error adding car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/admin/cars')}
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cars
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
          <p className="text-gray-600 mt-2">Add a new vehicle to your inventory</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                Make *
              </label>
              <input
                type="text"
                id="make"
                name="make"
                required
                value={formData.make}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Ferrari"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., 488 GTB"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="299000"
              />
            </div>

            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                Mileage *
              </label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                required
                min="0"
                value={formData.mileage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="1200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type *
              </label>
              <select
                id="fuel_type"
                name="fuel_type"
                required
                value={formData.fuel_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                Transmission *
              </label>
              <select
                id="transmission"
                name="transmission"
                required
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Color *
              </label>
              <input
                type="text"
                id="color"
                name="color"
                required
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., Rosso Corsa Red"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://images.pexels.com/photos/..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Use a high-quality image URL from Pexels or similar stock photo service
            </p>
          </div>

          <div>
            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <input
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Leather Seats, Navigation, Sunroof, Premium Sound (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter features separated by commas
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Detailed description of the vehicle..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/cars')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Adding...' : 'Add Car'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
