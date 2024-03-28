

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LocalisationRecu() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Vérifier si le navigateur prend en charge la géolocalisation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Utilisation du service de géocodage pour obtenir l'adresse
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCXrymOPbIN5SZu5QrsqlKzMp_5Ac7UjAY`
            );

            if (response.data.results.length > 0) {
              setAddress(response.data.results[0].formatted_address);
              setLocation({ latitude, longitude });
            } else {
              console.error('Aucune adresse trouvée pour ces coordonnées.');
            }
          } catch (error) {
            console.error('Erreur lors de la récupération de l\'adresse :', error);
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation :', error.message);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }, []);

  return (
    <div>
      {location ? (
        <>
          <p>Position: {address}</p>
          {/* <p>Latitude: {location.latitude}</p> */}
          {/* <p>Longitude: {location.longitude}</p> */}
        </>
      ) : (
        <p>En attente de la géolocalisation...</p>
      )}
    </div>
  );
}

export default LocalisationRecu;
