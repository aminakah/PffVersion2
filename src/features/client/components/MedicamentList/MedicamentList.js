import React, { useEffect, useState } from 'react';
import './MedicamentList.css';
import { Link } from 'react-router-dom';
import { ProduitService } from '../../../../services/produit.service';
import { BASE_URL } from '../../../../constants/app-constant';
import RechercheMedicament from '../../../common/components/Recherche/RechercheMedicament';
import { Modal } from 'react-bootstrap';

export const MedicamentList =  (props) => {
     
	const [medicaments, setMedicaments] = useState([]);
	const [show, setShow] = useState(false);
  	const [selectedCategorie, setSelectedCategorie] = useState(null);


	
	  const modalClose = () => {
		setShow(false);
		setSelectedCategorie(null);
	  };
	
	  const modalShow = () => setShow(true);
		useEffect(() => {
			ProduitService.getPublicListMedicaments(props.pharmacie.id)
			.then((response) =>{
				setMedicaments(response?.data?.produits);
			})
			.catch(error => console.log(error))

		},[])

	
	if(medicaments.length === 0){
		return<div className='color text-center'>Il n'a pas de medicament disponible dans cette pharmacie ...</div>

	   }
		return(
			<div>
				<div className= 'justify-content-center ps-5'><RechercheMedicament></RechercheMedicament>
				</div>				
				<div className="MedicamentList">
				<div className=''>
                  <div className='row ps-5 px-5' >
                    {medicaments.map((med) => 
					<div className='col-3 '>
					<div className='card '>
                      <div className='card-header pt-0' >
						<img className='img-fluid' height={60}  src={BASE_URL + '/images/' + med.photo} alt={med.nom} />
					  </div>
					  <div class="card-body p-0">
							<h5 class="card-text mx-2 p-0">{med.nom}</h5>
							<p class="card-text mx-2">{med.description.substring(0, 30)}{med.description.length > 100 ? '...' : ''}</p>
			
						  <div class="d-flex justify-content-between align-items-center m-2">
							<small class="text-muted">{med.prix} FCFA</small>
							<div class="btn-group mx-2">
							  <button onClick={modalShow} type="button" class="btn btn-sm btn-outline-success">Details</button>
							</div>
						  </div>
						</div>
						<Modal show={show} onHide={modalClose}>
						<Modal.Header closeButton>
						<Modal.Title>Details du medicament:{med.nom}</Modal.Title>
						</Modal.Header>
						<div className="  col-md-12  px-5 ">
          <div className="row">
              {medicaments.map((pharmacie) => (
              <div className="col-md-3   " key={pharmacie.id}>
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
                 
              
						</Modal>
					</div> 
					</div>)}
				  </div>
				</div>
				</div>

			</div>
		)
	
}