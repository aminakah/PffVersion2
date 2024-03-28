import React, { useEffect, useState } from 'react';
import { NavBarTop } from '../../../common/components/NavBarTop/NavBarTop';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { Link } from 'react-router-dom';

function PharmacieGarde() {
  const [pharmacies, setPharmacies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Change this value according to your preference

  useEffect(() => {
    PharmacieService.pharmaciesDeGarde()
      .then(response => {
        setPharmacies(response.data.pharmacies);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPharmacies = pharmacies.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <NavBarTop />
      <div className="pharmacie-container">
        <h2 className='pharmacie-title'>Les pharmacies de garde</h2>
        <div className="row">
          {currentPharmacies.map((pharmacie) => (
            <div className="col-md-4" key={pharmacie.id}>
              <Link to={`/detailsPharmacie/${pharmacie.id}`} className='lien'>
                <div className="card card1">
                  <div className="row">
                    <div className="col-md-6">
                      <img src={"http://localhost:8000/images/" + pharmacie.photo} className="image" alt={pharmacie.nom}></img>
                    </div>
                    <div className="col-md-6 px-0 pt-2">
                      <div className="card-body info">
                        <h5 className="card-title text-black"> {pharmacie.nom}</h5>
                        <p className="card-text text-success"> <i className='fa fa-map-marker'></i> {pharmacie.adresse}</p>
                        <p className="card-text text-success"> <i className=' fa fa-phone'></i>  {pharmacie.telephone}</p>
                        {pharmacie.ouverture === 1 ?
                          <p className="card-text text-success"> <i className='fa fa-check-circle'></i>  Ouvert</p>
                          :
                          <p className="card-text text-danger"> <i className='fa fa-times-circle'></i>  Fermer</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(pharmacies.length / itemsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PharmacieGarde;
