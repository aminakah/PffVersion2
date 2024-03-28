import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';
import markerIcon from '../../../../assets/images/pharmacie-marker.png';
import userMarkerIcon from '../../../../assets/images/user-marker.png';
import './GoogleMapsStyle.css';

const defaultPosition = { lat: 14.698220, lng: -17.437160 };

const GoogleMaps = ({ pharmacie, userLocation }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [mapUp, setMapUp] = useState(false);


  const directionsCallback = (response) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
    } else {
      console.error('Directions request failed');
    }
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  useEffect(() => {
	
    if (map && pharmacie && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          destination: { lat: pharmacie.latitude, lng: pharmacie.longitude },
          origin: { lat: userLocation.latitude, lng: userLocation.longitude },
          travelMode: 'DRIVING'
        },
        directionsCallback
      );

	  if (map) {
		if(pharmacie){
			map.panTo({ lat:pharmacie?.latitude, lng: pharmacie?.longitude });
		} else if(userLocation.latitude !== null){
			map.panTo({ lat: userLocation.latitude, lng: userLocation.longitude});
		}else{
			map.panTo(defaultPosition);
		}
	  if (window.google && window.google.maps) {
		setMapUp(true);
	  }
    }}
  }, [map, pharmacie, userLocation]);

  return (
    <div className='GoogleMaps card p-2 card-body' style={{ height: '530px' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={
          pharmacie
            ? { lat: pharmacie.latitude, lng: pharmacie.longitude }
            : userLocation
              ? { lat: userLocation.latitude, lng: userLocation.longitude }
              : defaultPosition
        }
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && <DirectionsRenderer directions={directions} />}

        {(pharmacie  && mapUp) && (
          <Marker
            key={pharmacie.id}
            position={{ lat: pharmacie.latitude, lng: pharmacie.longitude }}
            icon={{
              url: markerIcon,
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        )}

        {(userLocation && mapUp) && (
          <Marker
            key={'currentUser'}
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude
            }}
            icon={{
              url: userMarkerIcon,
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;