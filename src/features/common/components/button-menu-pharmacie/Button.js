import React, { useState } from 'react';
import './Button.css';

const tabsData = [
    { id: 1, name: 'Medicament' },
    { id: 2, name: 'Contact' },
    { id: 3, name: 'Horaire' },
    { id: 4, name: 'Localisation' },
  ];
  

const ButtonMenu = (props) => {
  const [activeRegion, setActiveRegion] = useState(1);

  const handleTabClick = (regionId) => {
    setActiveRegion(regionId);
    props.onSelectTab(regionId)
    // Vous pouvez également mettre en œuvre la logique de filtrage ici
    // en fonction de la région sélectionnée.
  };

  return (
    <div  >
    <div className="btn-group button">
      {tabsData.map((region) => (
        <button
          key={region.id}
          type="button"
          className={`custom-btn  ${activeRegion === region.id ? 'active' : 'inactive'}`}
          onClick={() => handleTabClick(region.id)}
        >
          {region.name}
        </button>
      ))}
    </div>
  </div>
  
  
  );
};

export default ButtonMenu;
