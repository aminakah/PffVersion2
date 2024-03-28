import React, { useState, useEffect } from 'react';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { Link } from 'react-router-dom';

const RegionButton = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetchData();
    PharmacieService.getListRegion()
    .then(response => setRegions(response.data))
  }, []);

  async function fetchData() {
    try {
      const response = await PharmacieService.getListPharmacie();
      console.log(response)
      setPharmacies(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleRegionFilter = (region) => {
    setSelectedRegion(region);
     PharmacieService.filtrePharmacieParRegion(region.id)
     .then(response => setPharmacies(response.data.data))
  };

 

  return (
    <div className='px-5'> 
      {/* <div className='  mx-2 ms-4'>
        { regions.map(region => <button className={selectedRegion && region.id === selectedRegion.id ? 'btn btn-success p-2 ms-2 me-2 ': 'btn btn-outline-success ms-2 me-2'} onClick={() => handleRegionFilter(region)}>{region.nom}</button>)}
        Ajoutez d'autres boutons pour chaque région
        <button className='btn btn-outline-success ms-4 me-3' onClick={() => fetchData()}>Toutes les régions</button>
      </div> */}
      <div className="  col-md-12  px-5">
          <div className="row">
              {pharmacies.map((pharmacie) => (
              <div className="col-md-4   " key={pharmacie.id}>
                <Link to={`/detailsPharmacie/${pharmacie.id}`}  className='lien'>
                <div className="card card1" >
                <div className="row">
                  <div className="col-md-6">
                  <img src={"http://localhost:8000/images/"+pharmacie.photo} className=" image" alt={pharmacie.nom}></img>
                  </div>
                  <div className="col-md-6 px-0 pt-2 ">
                    <div className="card-body info ">
                        <h5 className="card-title text-black "> {pharmacie.nom}</h5> 
                        <p className="card-text text-success "> <i className='fa fa-map-marker'></i> {pharmacie.adresse}</p>
                        <p className="card-text text-success  "> <i className=' fa fa-phone'></i>  {pharmacie.telephone}</p>
                        {pharmacie.ouverture==1 ?
                        <p className="card-text text-success  "> <i className='fa fa-check-circle'></i>  Ouvert</p>
                        :
                        <p className="card-text text-danger  "> <i className='fa fa-times-circle'></i>  Fermer</p>
                        }
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
              
            ))}
          </div>
          </div>
        
    </div>
  );
};

export default RegionButton;


