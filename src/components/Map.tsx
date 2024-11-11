import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useLocationStore } from '../store/useLocationStore';
import { BusinessMapCard } from './BusinessMapCard';
import { createMarkerIcon } from './map/MarkerIcon';
import { mapStyles } from './map/MapStyles';
import type { Business } from '../types/business';

interface MapProps {
  businesses: Business[];
  onMarkerClick?: (business: Business) => void;
  center?: google.maps.LatLngLiteral;
  hoveredBusinessId?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060,
};

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export const Map: React.FC<MapProps> = ({ 
  businesses = [], 
  onMarkerClick, 
  center,
  hoveredBusinessId 
}) => {
  const { coordinates } = useLocationStore();
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [markerIcons, setMarkerIcons] = useState<Record<string, google.maps.Icon>>({});
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const updateMarkerIcon = useCallback((isHovered: boolean) => {
    if (!window.google) return null;
    
    try {
      return createMarkerIcon({
        isHovered,
        google: window.google
      });
    } catch (error) {
      console.error('Error creating marker icon:', error);
      return null;
    }
  }, []);

  React.useEffect(() => {
    if (!isLoaded || !window.google) return;
    
    businesses.forEach(business => {
      const isHovered = hoveredBusinessId === business.id || hoveredMarkerId === business.id;
      const icon = updateMarkerIcon(isHovered);
      if (icon) {
        setMarkerIcons(prev => ({
          ...prev,
          [business.id]: icon
        }));
      }
    });
  }, [businesses, hoveredBusinessId, hoveredMarkerId, updateMarkerIcon, isLoaded]);

  React.useEffect(() => {
    if (!mapRef.current || !hoveredBusinessId) return;

    const hoveredBusiness = businesses.find(b => b.id === hoveredBusinessId);
    if (!hoveredBusiness) return;

    mapRef.current.panTo(hoveredBusiness.coordinates);
    mapRef.current.setZoom(15);
  }, [hoveredBusinessId, businesses]);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const mapCenter = center || (coordinates.lat && coordinates.lng
    ? { lat: coordinates.lat, lng: coordinates.lng }
    : defaultCenter);

  const mapOptions: google.maps.MapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    maxZoom: 18,
    minZoom: 3,
    gestureHandling: 'cooperative',
    zoomControlOptions: {
      position: window.google?.maps.ControlPosition.RIGHT_TOP,
    },
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={mapCenter}
      options={mapOptions}
      onLoad={onLoad}
    >
      {Array.isArray(businesses) && businesses.map((business) => {
        const isHovered = hoveredBusinessId === business.id || hoveredMarkerId === business.id;
        const icon = markerIcons[business.id];
        
        if (!icon) return null;

        return (
          <React.Fragment key={business.id}>
            <MarkerF
              position={business.coordinates}
              onClick={() => onMarkerClick?.(business)}
              onMouseOver={() => setHoveredMarkerId(business.id)}
              onMouseOut={() => setHoveredMarkerId(null)}
              icon={icon}
              zIndex={isHovered ? 999 : undefined}
              animation={isHovered ? google.maps.Animation.BOUNCE : undefined}
            />
            
            {isHovered && (
              <InfoWindowF
                position={{
                  lat: business.coordinates.lat + 0.0015,
                  lng: business.coordinates.lng,
                }}
                onCloseClick={() => setHoveredMarkerId(null)}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -5),
                  disableAutoPan: true,
                }}
              >
                <BusinessMapCard business={business} />
              </InfoWindowF>
            )}
          </React.Fragment>
        );
      })}
    </GoogleMap>
  );
};