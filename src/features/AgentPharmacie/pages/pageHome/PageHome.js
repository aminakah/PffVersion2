import React, { useEffect, useState } from 'react';
import './PageHomeAgent.css';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { ProprietaireService } from '../../../../services/propretaire.service';
import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
import { AgentService } from '../../../../services/agent.service';
import { BASE_URL } from '../../../../constants/app-constant';

export const  PageHome = () => {

	

	const [pharmacies, setPharmacies] = useState([]);
	const [location, setLocation] = useState(null);
	const [medicaments, setMedicaments] = useState([]);
	const [categories, setCategories] = useState([]);


	const   loadMedicaments = () => {
		AgentService.listeMedicament()
		.then(response => {
		  setMedicaments(response.data.produits);
		  console.log(response);
		})
		.catch(error => {
		  console.error(error);
		});
		}
		const loadCategoriesList = () => {
			AgentService.listeCategorie()
			  .then(response => {
				setCategories(response.data.categories);
				console.log(response.data);
			  })
			  .catch(error => {
				console.error(error);
			  });
		  };
		 

	useEffect(() => {
		loadMedicaments();

		loadCategoriesList();
		// Vérifier si le navigateur prend en charge la géolocalisation
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition(
			(position) => {
			  const { latitude, longitude } = position.coords;
			  setLocation({ latitude, longitude });
			},
			(error) => {
			  console.error('Erreur de géolocalisation :', error.message);
			}
		  );
		} else {
		  console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
		}
	  }, []); // Le tableau vide signifie que ce code s'exécutera une seule fois après le montage du composant
	
	

	return(
		
		<div className="PartnerHomePage container-fluid p-0 m-0">
		<div className='d-flex'>
		  <SideNavBarAgent />
		  <div className='body mx-3 p-4'>
			 <div className='container'>
                <div className='row'>
                   <div className='col-12 col-md-6'>
						<div className='card card-body card-info bg-danger'>
                          <h1>Nos Medicaments</h1>
						  {/* <p className='nb'>4</p> */}
						</div>
				   </div>
                   
                   <div className='col-12 col-md-6'>
				   		<div className='card card-body card-info  bg-warning'>
						   <h1>Nos  Categories</h1>
						    {/* <p className='nb'>3</p> */}
						</div>
				   </div>
				</div>
				
				 
			 </div>
			 <div className=' mt-5 commandes'>
				<div className='row'>
				<div className="'col-12 col-md-6">
                <table className="table  table-striped table-hover table-responsive">
                  <thead>
                    <tr className='w-100' style={{position: 'relative'}}>
                  <th scope="col">Image</th>
                      <th  scope="col">Nom</th>
                      <th scope="col">Quantite</th>
                      {/* <th scope="col">Categorie</th> */}
                      <th scope="col">Prix</th>
                      {/* <th scope="col">pharmacie</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {medicaments.map(medicament => (
                      <tr key={medicament.id}>
                        <td>
                          <img width={40} height={40} src={`${BASE_URL}/images/${medicament.photo}`}  alt={medicament.photo}/>
                        </td>
                        <td>{medicament.nom}</td>
                        <td>{medicament.quantite}</td>
                        {/* <td>{medicament.categorie_id}</td> */}
                        <td>{medicament.prix}</td>
                        {/* <td>{medicament.pharmacie_id}</td> */}
                        <td>{medicament.telephone}</td>
                        {/* <td>{agent.status == 0 ?"actif":"inactif"}</td> */}
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
			<div className="col-12 col-md-6">
				
            <table className="table">
              <thead>
              <tr className='w-100' style={{position: 'relative'}}>
                
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(categorie => (
                  <tr key={categorie.id}>
                    <td>{categorie.nom}</td>
                    <td>{categorie.description}</td>
                  
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
				</div>
			 </div>
			 
		  </div>
		  
		</div>
	</div>
	)
	
}