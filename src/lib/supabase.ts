import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      cars: {
        Row: {
          id: string;
          make: string;
          model: string;
          year: number;
          price: number;
          image: string;
          mileage: number;
          fuel_type: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
          transmission: 'Manual' | 'Automatic';
          color: string;
          description: string;
          features: string[];
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          make: string;
          model: string;
          year: number;
          price: number;
          image: string;
          mileage: number;
          fuel_type: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
          transmission: 'Manual' | 'Automatic';
          color: string;
          description: string;
          features?: string[];
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          make?: string;
          model?: string;
          year?: number;
          price?: number;
          image?: string;
          mileage?: number;
          fuel_type?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
          transmission?: 'Manual' | 'Automatic';
          color?: string;
          description?: string;
          features?: string[];
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          user_id: string;
          car_id: string;
          appointment_date: string;
          appointment_time: string;
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          car_id: string;
          appointment_date: string;
          appointment_time: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          car_id?: string;
          appointment_date?: string;
          appointment_time?: string;
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
