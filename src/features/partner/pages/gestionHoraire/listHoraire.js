

// Importez les bibliothèques React nécessaires
import React, { useState, useEffect } from 'react';
import { ProprietaireService } from '../../../../services/propretaire.service';
import { UserService } from '../../../../services/user.service';
import ChoixPharmacie from '../../../common/components/choixPharmacie/choixPharmacie';
import { SideNavBarPro } from '../../../common/components/SideNavBarPro/SideNavBarPro';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ListHoraire = () => {
    const [horaires, setHoraires] = useState([]);
      
  const [error, setError] = useState(null);
  const [nomPharmacie, setNomPharmacie] = useState(null);
  const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [show, setShow] = useState(false);
  const [selectedHoraire, setSelectedHoraire] = useState(null);

  const modalClose = () => {
    setShow(false);
    setSelectedHoraire(null);
    reset();
  };

  const modalShow = () => setShow(true);
  useEffect(() => {
    listerHorairesPharmacies();
  }, []);

  const onSubmit = data => {
    data.pharmacie_id = pharmacie.id;
    console.log(data)
    if (selectedHoraire === null) {
      ProprietaireService.ajouterHoraire(data)
        .then(response => {
			setSelectedHoraire(null);
          setShow(false);
          listerHorairesPharmacies();
          reset();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      ProprietaireService.modifierHoraire(data, selectedHoraire.id)
        .then(response => {
			setSelectedHoraire(null);
          setShow(false);
          listerHorairesPharmacies();
          reset();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onSelectHoraire = horaire => {
    setSelectedHoraire(horaire);
    setShow(true);
    setValue('j1', horaire.j1);
    setValue('j2', horaire.j2);
    setValue('j3', horaire.j3);
    setValue('j4', horaire.j4);
    setValue('j5', horaire.j5);
    setValue('j6', horaire.j6);
    setValue('j7', horaire.j7);
  };


 
  
  const listerHorairesPharmacies = () => {
    ProprietaireService.listehoraire(pharmacie?.id)
      .then(response => {
        const horaireData = response.data.horaires;

        if (Array.isArray(horaireData)) {
          setHoraires(horaireData);
        } else if (horaireData) {
          // Si c'est un objet unique, transformez-le en un tableau
          setHoraires([horaireData]);
        } else {
          console.error("Les données horaires ne sont pas valides :", horaireData);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

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
	
    const supprimerHoraire = (idPharmacie, id) => {
      ProprietaireService.supprimerCatergorie(idPharmacie,id)
      Swal.fire({title: "Voulez-vous confirmer la suppression?", text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",     showCancelButton: true,     confirmButtonColor: "#3085d6",     cancelButtonColor: "#d33",     confirmButtonText: "Supprimer",
     cancelButtonText: "Annuler",}).then(response => listerHorairesPharmacies())
        .catch(error => {
          console.log(error);
        });
    };
  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBarPro />
			 <div className='body mx-3 p-4'>
			   <ChoixPharmacie /> 
			   { pharmacie !== null ?  
				<div>
				 <div className='mb-5 d-flex justify-content-between'>
					<h2 className='titre'>Les horaires de la pharmacie:<span className='majuscule '> {pharmacie.nom}</span></h2>
					
					<Button variant="success" onClick={modalShow}>  <i className='fa fa-plus'></i>Ajouter horaire</Button>
				 </div>
				 <div className="ProprietaireList">
				<table className="table">
					<thead>
					<tr>
						<th scope="col">lundi</th>
						<th scope="col">Mardi</th>
						<th scope="col">Mercredi</th>
						<th scope="col">Jeudi</th>
						<th scope="col">vendredi</th>
						<th scope="col">Samedi</th>
						<th scope="col">Dimanche</th>
						<th>En garde </th>
						<th scope="col">Actions</th>
					</tr>
					</thead>
					<tbody>
					{horaires.map(horaire => (
						<tr key={horaire.id}>
						<td>{horaire.j1}</td>
						<td>{horaire.j2}</td>
						<td>{horaire.j3}</td>
						<td>{horaire.j4}</td>
						<td>{horaire.j5}</td>
						<td>{horaire.j6}</td>
						<td>{horaire.j7}</td>
						<td>
						{horaire.status==0?<p >en garde</p >:<p > pas en gadre</p>}
            </td>
						<td>
						<td>
						{horaire.status==0?<button onClick={() => definirPharmacieGarde(horaire.id)} className="btn btn-success">Defenir en Garde</button >:<button onClick={() => definirPharmacieGarde(horaire.id)}className="btn btn-danger">defenir pas en gadre</button>}
            <button className="btn  btn-outline-primary mx-1" onClick={() => onSelectHoraire(horaire)}  title='Modifier'><i className='fa fa-edit'></i></button>
            {/* <button className='btn btn-outline-danger' onClick={()=>supprimerHoraire(horaire.pharmacie_id, horaire.id)}  title='Supprimer'><i className='fa fa-trash'></i></button> */}
            </td>
						{/* {horaire.status==0?<button onClick={() => definirPharmacieGarde(horaire.id)} className="btn btn-primary">Defenir en Garde</button >:<button onClick={() => definirPharmacieGarde(horaire.id)}className="btn btn-danger">defenir pas en gadre</button>} */}
						</td>
						</tr>
					))}
					</tbody>
				</table>
				</div>
				</div> : null }
			  </div>
			</div>
			<Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHoraire === null ? 'Ajouter horaire' : 'Modifier horaire '}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
          <Modal.Body>
		  <div className="LoginForm w-100">
            <form  className="w-100">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du lundi</label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j1")}
                    />
                    {errors.nom && <span>Champ obligatoire</span>}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du Mardi</label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j2")}
                    />
                    {errors.adresse && <span>Champ obligatoire</span>}
                  </div>
                  
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label"> Entrez L'Heure d'ouverture et fermuture du Mercredi</label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j3")}
                    />
                    {errors.nom && <span>Champ obligatoire</span>}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du Jeudi </label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j4")}  
                    />
                    {errors.adresse && <span>Champ obligatoire</span>}
                  </div>
                  
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label"> Entrez L'Heure d'ouverture et fermuture du Vendredi</label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j5")}
                    />
                    {errors.nom && <span>Champ obligatoire</span>}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du Samedi </label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j6")}
                    />
                    {errors.adresse && <span>Champ obligatoire</span>}
                  </div>
                </div>
              </div>
			  <div className="col-12 col-md-12">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du Samedi </label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("j7")}
                    />
                    {errors.adresse && <span>Champ obligatoire</span>}
                  </div>
                </div>

             
            </form>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={modalClose}>Annuler</Button>
            <input className='btn btn-secondary' type="submit" value="Valider" />
          </Modal.Footer>
        </form>
      </Modal>
            
		</div>
  );
};

export default ListHoraire;
