import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Car } from '../types';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform database format to app format
      const transformedCars: Car[] = data.map(car => ({
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        image: car.image,
        mileage: car.mileage,
        fuelType: car.fuel_type,
        transmission: car.transmission,
        color: car.color,
        description: car.description,
        features: car.features,
        available: car.available,
      }));

      setCars(transformedCars);
      setError(null);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to fetch cars');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, isLoading, error, refetch: fetchCars };
};

export const useCarById = (id: string) => {
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          const transformedCar: Car = {
            id: data.id,
            make: data.make,
            model: data.model,
            year: data.year,
            price: data.price,
            image: data.image,
            mileage: data.mileage,
            fuelType: data.fuel_type,
            transmission: data.transmission,
            color: data.color,
            description: data.description,
            features: data.features,
            available: data.available,
          };
          setCar(transformedCar);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to fetch car');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  return { car, isLoading, error };
};
