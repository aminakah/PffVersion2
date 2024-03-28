
import React, { useState } from 'react';
import { ProduitService } from '../../../../services/produit.service';
import RecherchePharmacie from './RecherchePharmacie';
import { Link } from 'react-router-dom';
function RechercheMedicament() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [searchError, setSearchError] = useState(null);
  const [pharmacieId, setPharmacieId] = useState(26);

 
  const handleSearch = () => {
    ProduitService.rechercheProduit( pharmacieId, searchParams.nom).then(response => {
      console.log(response)
      if(response.data.resultats.length === 0){
        setSearchError("aucun resultat")
         }
         else{
          setSearchError(null);
         }
     setSearchResults(response.data.resultats);
       console.log(response.data.resultats)
     })
     .catch(error => {
       console.error('Erreur lors de la recherche de pharmacie', error);
       setSearchError(error)
     });
 };
  return (
   
    <div>
    <div className="SearchBar  p-2 ">
      <div class="d-flex">
        <input type="text" className="form-control border border-success-subtle search-input" placeholder="Rechercher un medicaments" 
        value={searchParams.nom || ''}
        onChange={(e) => setSearchParams({ ...searchParams, nom: e.target.value })}/>
        <button onClick={handleSearch} className="btn btn-success search-btn"> 
        <i className="fa fa-search rounded-end-circle iconSearch"></i>
        
         </button>

        <div class="input-group-append">
        
        </div>
    </div>
   { searchResults.length>0 &&
    <div className='PharmacieRecherche'>
      <Link >
      <ul >   <i  className="m-3 text-left text-danger fa fa-times"></i>
      {searchResults.map((pharmacie) => (
        <Link className='lien' to={`/detailsPharmacie/${pharmacie.id}`}>
          
         <li   className='searchResults' key={pharmacie.id}>{pharmacie.nom} </li>
        </Link>
      ))}
      
        </ul>
      </Link>
  
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

export default RechercheMedicament;
