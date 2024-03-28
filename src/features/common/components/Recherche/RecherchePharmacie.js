


import React, { useState } from 'react';
import { PharmacieService } from '../../../../services/pharmacie.service';
import './Recherche.css';
import { Link } from 'react-router-dom';

function RecherchePharmacie() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searchParams, setSearchParams] = useState({});

 
  const handleSearch = () => {
    PharmacieService.rechercherPharmacie(searchParams.nom).then(response => {
      if(response.data.resultats.length === 0){
        setSearchError(" aucun resultat")
        console.log("il n'existe pas")
         }
         else{
          setSearchError(null);
         }
     setSearchResults(response.data.resultats);
       console.log(response.data.resultats)
     })
     .catch(error => {
       console.error('Erreur lors de la recherche de pharmacie', error);
       console.log('Erreur lors de la recherche de pharmacie', error);
       setSearchError(error)
     });
 };

  return (
  
    <div>
    <div className="mx-1 SearchBar ">
    <div class="d-flex">
        <input type="text" className="form-control border border-success-subtle search-input" placeholder="Rechercher une pharmacie" 
        value={searchParams.nom || ''}
        onChange={(e) => setSearchParams({ ...searchParams, nom: e.target.value })}/>
        <button onClick={handleSearch} className="btn btn-success search-btn"> 
        <i className="fa fa-search rounded-end-circle iconSearch"></i>
        
         </button>

        
    </div>
   { searchResults.length>0 &&
    <div className='PharmacieRecherche'>

      <ul >
      {searchResults.map((pharmacie) => (
        <Link  className='lien' to={`/detailsPharmacie/${pharmacie.id}`}>
         <li  className='searchResults' key={pharmacie.id}>{pharmacie.nom} </li>
        </Link>
      ))}
        </ul>
      
    </div>
   }
   {searchError && 
   <div className='ErreurRechercher'>
    <p>
    {searchError}
    </p>
    </div>}
    </div>
</div>
  );
}

export default RecherchePharmacie;
