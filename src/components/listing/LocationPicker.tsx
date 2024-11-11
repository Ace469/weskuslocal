import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { MapPin, Search } from 'lucide-react';
import { mapStyles } from '../map/MapStyles';

interface LocationPickerProps {
  onLocationSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
}

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
  const [marker, setMarker] = React.useState<google.maps.LatLngLiteral | null>(null);
  const [address, setAddress] = React.useState('');
  const searchBoxRef = React.useRef<HTMLInputElement>(null);
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  React.useEffect(() => {
    if (!isLoaded || !searchBoxRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(searchBoxRef.current, {
      fields: ['formatted_address', 'geometry'],
    });

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        const coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarker(coordinates);
        setAddress(place.formatted_address || '');
        onLocationSelect(place.formatted_address || '', coordinates);
      }
    });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, onLocationSelect]);

  if (!isLoaded) return null;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={searchBoxRef}
          type="text"
          placeholder="Search for your business location..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="h-[300px] rounded-lg overflow-hidden border">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={marker || { lat: 40.7128, lng: -74.006 }}
          zoom={marker ? 15 : 12}
          options={{
            styles: mapStyles,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onClick={(e) => {
            if (e.latLng) {
              const coordinates = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              };
              setMarker(coordinates);
              
              // Reverse geocode to get address
              const geocoder = new google.maps.Geocoder();
              geocoder.geocode({ location: coordinates }, (results, status) => {
                if (status === 'OK' && results?.[0]) {
                  setAddress(results[0].formatted_address);
                  onLocationSelect(results[0].formatted_address, coordinates);
                }
              });
            }
          }}
        >
          {marker && <MarkerF position={marker} />}
        </GoogleMap>
      </div>

      {address && (
        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Selected Location</p>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
        </div>
      )}
    </div>
  );
};