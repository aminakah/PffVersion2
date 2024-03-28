import React, { useEffect, useState } from 'react';
import './Localisation.css';
import GoogleMaps from '../../../common/components/GoogleMaps/GoogleMaps';

export const Localisation  = ({pharmacie}) => {

	const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
	
    
	const getLocation = () => {
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(
			(position) => {

			  setUserLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			  });
			},
			(error) => {
				console.warn(error)
			}
		  );
		} else {
			console.warn("Position non trouvable")
		}
	  };

	  useEffect(() => {
		getLocation();
	  }, []);
		
	return(
		<div className="Localisation">
		       <h1>Google Maps avec itinéraire</h1>
		   <GoogleMaps pharmacie={pharmacie} userLocation={userLocation} />
		   
		    </div>
		// <div className="Localisation">
		// 	<h1>Localisation</h1>
		// 	<GoogleMaps pharmacie={pharmacie} zoom={8}  />
		// </div>
	)
}
// import React from 'react';
// import GoogleMaps from '../../../common/components/GoogleMaps/GoogleMaps';

// function Localisation() {
//   const pharmacie = {
//     nom: 'Nom de la pharmacie',
//     latitude: 37.7749,
//     longitude: -122.4194
//   };

//   const destination = 'Adresse de destination'; // Remplacez par l'adresse de votre choix

//   return (
//     <div>
//       <h1>Google Maps avec itinéraire</h1>
//       <GoogleMaps pharmacie={pharmacie} zoom={14} destination={destination} />
//     </div>
//   );
// }

// export default Localisation;
