import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface AppointmentData {
  carId: string;
  date: string;
  time: string;
  notes: string;
}

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAppointment = async (appointmentData: AppointmentData): Promise<boolean> => {
    if (!user) return false;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          car_id: appointmentData.carId,
          appointment_date: appointmentData.date,
          appointment_time: appointmentData.time,
          notes: appointmentData.notes,
          status: 'pending',
        });

      if (error) {
        throw error;
      }

      setError(null);
      return true;
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError('Failed to create appointment');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAppointments = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          cars (
            make,
            model,
            year,
            image
          )
        `)
        .eq('user_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) {
        throw error;
      }

      setAppointments(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAppointments();
    }
  }, [user]);

  return {
    appointments,
    createAppointment,
    isLoading,
    error,
    refetch: fetchUserAppointments,
  };
};
