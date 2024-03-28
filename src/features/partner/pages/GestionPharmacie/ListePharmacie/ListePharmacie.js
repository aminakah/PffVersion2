  import React, { useEffect, useState } from 'react';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
import { UserService } from '../../../../../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import { ProprietaireService } from '../../../../../services/propretaire.service';

import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import Swal from "sweetalert2";
import "./ListePharmacie"
import { PharmacieService } from '../../../../../services/pharmacie.service';
import { RegionService } from '../../../../../services/region.service';
function ListePharmacie() {
  const navigate = useNavigate();

	const [pharmacies, setPharmacie] = useState([]);
  // const [quartiers, setQuartiers] = useState([]);
  const [horaires, setHoraires] = useState([])

  const [quartiers, setQuarties] = useState([]);
  const [regions, setRegions] = useState([]);
  const [departements, setDepartements] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors },  setError,reset } = useForm();
  const [show, setShow] = useState(false);
  const [selectedPharmacie, setSelectedPharmacie] = useState(null);

  const modalClose = () => {
    setShow(false);
    setSelectedPharmacie(null);
    reset();
  };

  const modalShow = () => setShow(true);
  useEffect(() => {
    RegionService.getListRegion()
    .then(response => {
      console.log(response)
      setRegions(response?.data)
    })
    pharmacie();
   },
   []
   );

  const onSubmit = data => {
    console.log(data)
    if (setSelectedPharmacie === null) {
        ProprietaireService.ajouterPharmacie(data).then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Pharmacie ajoutée avec succès!',
          }).then(() => {
            navigate(`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`);
          });
          setError(response.data.errorsList)
          if(response.data.error===true){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue, veuillez réessayer!',
            });
          }
          console.log(errors.nom);
        }).catch((errors) => {
          console.error(errors);
          // setError();
        });
     
    } else {
      ProprietaireService.modifierCategorie(data, setSelectedPharmacie.id)
        .then(response => {
          setSelectedPharmacie(null);
          setShow(false);
          pharmacie();
          reset();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onSelectPharmacie = pharmacie => {
    setSelectedPharmacie(pharmacie);
    setShow(true);
    setValue('nom', pharmacie.nom);
    setValue('description', pharmacie.description);
    setValue('pharmacie_id', pharmacie.pharmacie_id);
  };
  async function supprimerPharmacie(id) {
    try {
      await ProprietaireService.supprimerPharmacie(id);
      const newPharmacies = pharmacies.filter((pharmacie) => pharmacie.id !== id);
      setPharmacie(newPharmacies);
      Swal.fire({title: "Voulez-vous confirmer la suppression?", text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",     showCancelButton: true,     confirmButtonColor: "#3085d6",     cancelButtonColor: "#d33",     confirmButtonText: "Supprimer",
     cancelButtonText: "Annuler",}).then(response => pharmacie())
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur, pharmacie non supprimée',
      });
    }
  }
   
  const pharmacie=()=>{
    ProprietaireService.listMesPharmacie()
    .then(response => {
        console.log(response.data.data);
        setPharmacie(response.data.data);
        // setQuartiers(response.data.data);
        console.log(response.data.data);
      
    })
    .catch(error => {
      console.error(error);
    });
   }
  
  const loadDepartment =  (idRegion) =>{
    RegionService.getListDepartements(idRegion)
    .then(response => {
      setDepartements(response.data);
      console.log(response?.data)
    })
  }
  const loadQuartier = (idDepartement) => {
    RegionService.getListQuartier(idDepartement)
    .then(response => {
      setQuarties(response?.data)
      setQuarties(response?.data)
    })
  }
  const definirPharmacieGarde = async (id) => {
		try {
		  const response = await ProprietaireService.definirPharmacieGarde(pharmacie?.id);
		  ProprietaireService.listehoraire(pharmacie?.id)
		  .then(response => {
			const horaireData = response.data.horaires;
			console.log(horaireData)
			if (Array.isArray(horaireData)) {
			  setHoraires(horaireData);
			} else if (horaireData) {
			  // Si c'est un objet unique, transformez-le en un tableau
			  setHoraires([horaireData]);
			} else {
			  console.error("Les données horaires ne sont pas valides :", horaireData);
			}
		  })
		  
		} 
		catch (error) {
		  console.error(error);
		}
	  };
    
  if (pharmacies === null) {
       // Loading state, you can render a loading spinner or message
       return <p>Loading...</p>;
     }
  return (
    <div className="PartnerHomePage container-fluid p-0 m-0">
		<div className='d-flex'>
		  <SideNavBarPro />
		<div className='body mx-3 p-4'>
       <div className=''>
         <div  className='mb-5 d-flex justify-content-between'>
					<h2 className=' ms-3 color'>Liste de Mes Pharmacies </h2>
					<Link to={'/account/partner/'+ UserService.getCurrentUser()?.id +'/AjouterPharmacie'}>
						<button className='btn btn-success'> <i className='fa fa-plus'></i>Ajouter une pharmacie</button>
					</Link>
          {/* <Button variant="success" onClick={modalShow}>
              Ajouter une pharmacie
            </Button> */}
				 </div>
				   <div className='mb-2 d-flex justify-content-between card'>
				  <div className='card-body'>
          <table className="table table-striped table-hover table-responsive">
					<thead>
						<tr>
						<th scope="col">image</th>
						<th scope="col">Nom</th>
						<th scope="col">Adresse</th>
						<th scope="col">Telephone </th>
						{/* <th scope="col">Statut</th> */}
						<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{pharmacies.map((c) =><tr>
							<th>
              <img style={{width: 70,height:60}} src={"http://localhost:8000/images/"+c.photo} className=" imagePharmaci" alt={c.nom}></img>
							</th>
							<th>{c.nom}</th>
							<td>{c.adresse}</td>
							<td>{c.telephone}</td>
              {/* <td>
              {c.ouverture==1?<td  className="">Ouvrert</td >:<button className="">Fermer</button>}
              </td> */}
              <td>
               {/* {c.ouverture==0?<button onClick={() => definirPharmacieGarde(c.id)} className="btn btn-primary">Ouvrir</button >:<button onClick={() => definirPharmacieGarde(c.id)}className="btn btn-danger">Fermer</button>} */}
               <a className="btn btn-outline-success mx-1  " href={`/DetailsDeMaPharmacie/${c.id}`} ><i className="fas fa-eye" ></i></a>
			  	     <a className="btn btn-outline-primary mx-1  " href={`/modifierPharmacie/${c.id}`}> <i className='fa fa-edit '></i></a>
              <button className='btn btn-outline-danger' onClick={()=>supprimerPharmacie( c.id)}  title='Supprimer'><i className='fa fa-trash'></i></button>
			        </td>
						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
				</div>
			  </div>
        
		</div>
    <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPharmacie === null ? 'Ajouter une Catégorie' : 'Modifier la catégorie'}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
          <Modal.Body>
         
            <div className="LoginForm w-100">
              
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Nom pharmacie</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("nom",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.nom && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Adresse de la pharmacie </label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("adresse",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.adresse && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Ajoutez ici les champs manquants de votre formulaire */}
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Latitude</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("latitude",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.latitude && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Longitude</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("longitude",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.longitude && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Ajoutez ici les champs manquants de votre formulaire */}
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Numéro de téléphone de la pharmacie</label>
                      <input
                       maxLength={9}
                       minLength={9}
                        className="form-control w-100"
                        type="tel"
                        {...register("telephone",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.telephone && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Numéro de fax de la pharmacie</label>
                      <input
                       maxLength={9}
                       minLength={9}
                        className="form-control w-100"
                        type="tel"
                        {...register("fax",{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.fax && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  {/* Ajoutez ici les champs manquants de votre formulaire */}
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Séléctionner une région</label>
                      <select className='form-control' 
                        onChange={e => loadDepartment(e.target.value)}
                       >
                        <option selected value={''} disabled>Choisir une région</option>
                        {regions.map( (r) => <option key={r.id} value={r.id}>{r.nom}</option>)}
                      </select>
                      {errors.region && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>

                   {/* Ajoutez ici les champs manquants de votre formulaire */}
                   <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Sélectionner un département</label>
                      <select className='form-control'
                       onChange={e => loadQuartier(e.target.value)}
                       >
                        <option selected value={''} disabled>Choisir un département</option>
                        {departements.map( (d) => <option key={d.id} value={d.id}>{d.nom}</option>)}
                      </select>
                      {errors.quartier_id && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  </div>

                <div className="row">
                  {/* Ajoutez ici les champs manquants de votre formulaire */}
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-6">
                      <label className="form-label">Quartier</label>
                      <select className='form-control' {...register('quartier_id',{ required: 'Veillez renseigner votre nom' })} >
                        <option selected value={''} disabled>Choisir un quartier</option>
                        {quartiers.map( (q) => <option key={q.id} value={q.id}>{q.nom}</option>)}
                      </select>
                      {errors.quartier_id && <span className="text-danger">Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Image de la pharmacie</label>
                      <input
                        className="form-control w-100"
                        type="file"
                        {...register('photo',{ required: 'Veillez renseigner votre nom' })}
                      />
                      {errors.photo && <span className="text-danger"> Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                
             </div>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={modalClose}>Annuler</Button>
            <input className='btn btn-secondary' type="submit" value="Valider" />
          </Modal.Footer>
        </form>
      </Modal>
	</div>
  )
}

export default ListePharmacie