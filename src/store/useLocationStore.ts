import { create } from 'zustand';

interface LocationState {
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
  radius: number;
  setCoordinates: (lat: number, lng: number) => void;
  setRadius: (radius: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  coordinates: {
    lat: null,
    lng: null,
  },
  radius: 20,
  setCoordinates: (lat, lng) => set({ coordinates: { lat, lng } }),
  setRadius: (radius) => set({ radius }),
}));