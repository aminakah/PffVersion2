import React, { useEffect, useRef, useState } from 'react';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
import { ProprietaireService } from '../../../../../services/propretaire.service';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../../../../../constants/app-constant';
import ChoixPharmacie from '../../../../common/components/choixPharmacie/choixPharmacie';
import Swal from 'sweetalert2';
import './listeMedicame.css'
function Listemedicament() {

  const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));
	const [medicaments, setMedicaments] = useState([]);
  const [photo, setPhoto] = useState();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset} = useForm();
  const [show, setShow] = useState(false);  
  const [selectedMedicament, setSelectedMecicament] = useState(null);
  const [categories, setCategories] = useState([]);

  const fileInputRef = useRef(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(photo);
    setValue('photo', file); // Set the file value in the form data
  };



  const modalClose = () => {
    reset();
    setShow(false);
    setSelectedMecicament(null);
  };  
  const modalShow = () => setShow(true); 
  
    useEffect(() => {
        loadMedicaments();
        loadCategoriesList(); 
    }, []);



  const   loadMedicaments = () => {
    ProprietaireService.listeMedicament(pharmacie?.id)
    .then(response => {
      setMedicaments(response.data.produits);
    })
    .catch(error => {
      console.error(error);
    });
    }

    const onSelectMedicament = med => {
      setSelectedMecicament(med);
      setShow(true);
      setValue('nom', med.nom);
      setValue('description', med.description);
      setValue('categorie_id', med.categorie_id);
      setValue('prix', med.prix);
      setValue('quantite', med.quantite);
    };

    const onSubmit = data => {
      if(selectedMedicament === null){
        ProprietaireService.ajouterMedicament(data, pharmacie?.id)
        .then(
          (response) => {
           loadMedicaments();
          setShow(false);
          reset();
          setSelectedMecicament(false);
          }
        ).catch((error) => {
          console.log(error)
        })
      } else{
        data.id = selectedMedicament?.id;
        ProprietaireService.modifierMedicament(data, pharmacie?.id)
        .then(
          (response) => {
          loadMedicaments();
          modalClose();
          reset();
          setSelectedMecicament(null);
          }
        ).catch((error) => {
          console.log(error)
        })
      }
      
    }

    const loadCategoriesList = () =>{
      ProprietaireService.listeCategorie(pharmacie?.id)
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
      console.error(error);
      });
  
      }

    const supprimerMedicamsdent = (pharmacieId, id) => {
    ProprietaireService.supprimerMedicamet(pharmacieId, id)
    .then(response =>{

      loadMedicaments();
    })
    .catch(error => console.log(error))
    }

    const supprimerMedicament = (pharmacieId, id) => {
      ProprietaireService.supprimerMedicamet(pharmacieId,id)
      Swal.fire({title: "Voulez-vous confirmer la suppression?", text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",     showCancelButton: true,     confirmButtonColor: "#3085d6",     cancelButtonColor: "#d33",     confirmButtonText: "Supprimer",
     cancelButtonText: "Annuler",}).then(response => loadMedicaments())
        .catch(error => {
          console.log(error);
        });
    };
    if (medicaments === null) {
      // Loading state, you can render a loading spinner or message
      return <p>En chargement...</p>;
      }
  return (
    <div className="PartnerHomePage container-fluid p-0 m-0">
		<div className='d-flex'>
		  <SideNavBarPro />
		  <div className='body mx-3 p-4'>
        <ChoixPharmacie />
         {pharmacie !== null ? <div>
            <div className='mb-5 d-flex justify-content-between'>
              <h3 className='titre '>Liste des medicaments de la  pharmacie: <span className='majuscule' > {pharmacie.nom}</span></h3>
                <button onClick={modalShow} className='btn btn-success'>  <i className='fa fa-plus'></i>Ajouter un medicament</button>
            </div>
            <div className="ProprietaireList">
                <table className="table  table-striped table-hover table-responsive">
                  <thead>
                    <tr className='w-100' style={{position: 'relative'}}>
                  <th scope="col">Image</th>
                      <th className='' scope="col">Nom</th>
                      <th scope="col">Description</th>
                      <th scope="col">Quantite</th>
                      <th scope="col">Categorie</th>
                      <th scope="col">Prix</th>
                      <th scope="col " className='text-end' style={{position: 'absolute',right: 0}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicaments.map(medicament => (
                      <tr key={medicament.id}>
                        <td>
                          <img width={40} height={40} src={`${BASE_URL}/images/${medicament.photo}`}  alt={medicament.photo}/>
                        </td>
                        <td>{medicament.nom}</td>
                        <td className='w-50'>{medicament.description}</td>
                        <td>{medicament.quantite}</td>
                        <td>{medicament.categorie.nom}</td>
                        <td>{medicament.prix}Fcfa</td>
                        {/* <td>{medicament.pharmacie_id}</td> */}
                        <td>{medicament.telephone}</td>
                        {/* <td>{agent.status == 0 ?"actif":"inactif"}</td> */}
                        <td className='text-end'>
                  <button className="btn btn-outline-primary mx-1  " onClick={() =>onSelectMedicament(medicament)} title='Modifier'><i className='fa fa-edit'></i></button>
                  <button className='btn btn-outline-danger' onClick={()=> supprimerMedicament(medicament.pharmacie_id, medicament.id)} title='Supprimer'><i className='fa fa-trash'></i></button>
                  <a href={`/DetailsMedicament/${medicament.id}`} className="btn btn-outline-success mx-1 "><i className='fa fa-eye' title='Voir Détails'></i></a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
         </div> : null}
				 
			  </div>
		</div>
    <Modal show={show} onHide={modalClose}>  
      <Modal.Header closeButton>  
        <Modal.Title>{selectedMedicament === null ?  'Ajouter une Médicament': 'Modifier le Médicament'}</Modal.Title>  
      </Modal.Header>  
      <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
      
      <Modal.Body>  
      <div className='row'>
		   <div className='col-12 col-md-6'>
				<div className='form-group mb-3'>
					<label className='form-label'>Nom du medicament</label>
					<input  className='form-control w-100' placeholder='Entrez le nom medicament' type='text' {...register("nom")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
       <div className='col-12 col-md-6'>
  <div className='form-group mb-3'>
    <label className='form-label'>
      {selectedMedicament !== null ? (
        <img width={30} src={`${BASE_URL}/images/${selectedMedicament.photo}`} alt={selectedMedicament.nom} />
      ) : null}
      <span>{selectedMedicament !== null ? "Changer l'image" : "Ajouter une image"} </span>
    </label>
    
    {/* Condition pour rendre le champ image actif/désactivé */}
    {!selectedMedicament && (
      <input
        {...register('photo')}
        onChange={handleImageChange}
        ref={(e) => {
          setValue('photo', e)
          fileInputRef.current = e;
        }}
        className='form-control w-100'
        type='file'
      />
    )}

    {errors.non && <span>champs obligatoire</span>}
  </div>
</div>

		</div>

		<div className='row'>
		   <div className='col-12 col-md-6'>
				<div className='form-group mb-3'>
					<label className='form-label'>Prix</label>
					<input  className='form-control w-100' placeholder='Entrez le prix'  type='number' {...register("prix")} />
					{errors.prix && <span>champs obligatoire</span>}
				</div>
		   </div>
		   <div className='col-12 col-md-6'>
				   <div className='form-group mb-3'>
					<label className='form-label'>Quantite</label>
					<input  className='form-control w-100' placeholder='Entrez la quqntite ' type='number' {...register("quantite")} />
					{errors.quantite && <span>champs obligatoire</span>}
				</div>
		   </div>
		</div>
		<div className='row'>
		   <div className='form-group mb-6'>
			<label className='form-label'>Categorie</label>
			<select class="form-select" {...register('categorie_id')} >
			<option selected disabled value={''}>Selectionner une categorie</option>
			{categories.map((cat)=><option value={cat.id}>{cat.nom}</option>)}
			</select>
			{errors.email && <span>Veillez selectionner une categorie</span>}
		   </div>
		</div>
	   
		<div className='row'>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Description </label>
        <textarea class="form-control w-100" id="exampleFormControlTextarea1" rows="3" {...register('description')}></textarea>
      </div>
</div>
		
      </Modal.Body>  
      
      <Modal.Footer>  
        <input className='btn btn-success' type="submit" value="Valider" /> 
        <Button variant="danger" onClick={modalClose}>Annuler</Button> 

      </Modal.Footer>  
      </form>

    </Modal> 
	</div>
  )
}
export default Listemedicament