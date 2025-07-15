export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  color: string;
  description: string;
  features: string[];
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
}

export interface Profile {
  id: string;
  name: string;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  userId: string;
  carId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; phone: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
