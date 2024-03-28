import React, { useEffect, useState } from 'react';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro';
import { ProprietaireService } from '../../../../../services/propretaire.service';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ChoixPharmacie from '../../../../common/components/choixPharmacie/choixPharmacie';
import Swal from 'sweetalert2';
// import Button from '@mui/material/Button';

function ListeCategorie() {
  const [categories, setCategorie] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
	const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));


  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [show, setShow] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const modalClose = () => {
    setShow(false);
    setSelectedCategorie(null);
    reset();
  };

  const modalShow = () => setShow(true);
  useEffect(() => {
    ProprietaireService.listMesPharmacie()
      .then(response => {
        setPharmacies(response.data.data);
        // console.log(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
    loadCategoriesList();
    // loadIdPharmacies();
    
  }, []);

  const onSubmit = data => {
    data.pharmacie_id = pharmacie.id;
    console.log(data)
    if (selectedCategorie === null) {
      ProprietaireService.ajouterCatergorie(data)
        .then(response => {
         setSelectedCategorie(null);
          setShow(false);
          loadCategoriesList();
          reset();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      ProprietaireService.modifierCategorie(data, selectedCategorie.id)
        .then(response => {
         setSelectedCategorie(null);
          setShow(false);
          loadCategoriesList();
          reset();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onSelectCategorie = categorie => {
    setSelectedCategorie(categorie);
    setShow(true);
    setValue('nom', categorie.nom);
    setValue('description', categorie.description);
    setValue('pharmacie_id', categorie.pharmacie_id);
  };

  const supprimerCategorie = (idPharmacie, id) => {
    ProprietaireService.supprimerCatergorie(idPharmacie,id)
    Swal.fire({title: "Voulez-vous confirmer la suppression?", text: "Vous ne pourrez pas revenir en arrière !",
    icon: "warning",     showCancelButton: true,     confirmButtonColor: "#3085d6",     cancelButtonColor: "#d33",     confirmButtonText: "Supprimer",
   cancelButtonText: "Annuler",}).then(response => loadCategoriesList())
      .catch(error => {
        console.log(error);
      });
  };

  const loadCategoriesList = () => {
    ProprietaireService.listeCategorie(pharmacie?.id)
      .then(response => {
        setCategorie(response.data.categories);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
 


  if (categories === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarPro />
        <div className='body mx-3 p-4'>
        <ChoixPharmacie /> 
			   { pharmacie !== null ? <div>
          <div className='mb-5 d-flex justify-content-between'>
            <h2 className='titre'>Liste de catégories de la pharmacie:<span className='majuscule'> {pharmacie.nom}</span> </h2>
            <Button variant="success" onClick={modalShow}>
            <i className='fa fa-plus'></i> Ajouter une catégorie
            </Button>
          </div>
          <div className="ProprietaireList">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(categorie => (
                  <tr key={categorie.id}>
                    <td>{categorie.nom}</td>
                    <td>{categorie.description}</td>
                    <td>
                     
                      <button className="btn btn-outline-primary mx-1  " onClick={() => onSelectCategorie(categorie)}  title='Modifier'><i className='fa fa-edit'></i></button>
                      <button className='btn btn-outline-danger' onClick={()=>supprimerCategorie(categorie.pharmacie_id, categorie.id)}  title='Supprimer'><i className='fa fa-trash'></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>: null}
        </div>
      </div>

      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategorie === null ? <span className='color text-center'>Ajouter une Catégorie</span> : <span className='color'>Modifier la catégorie</span>}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
          <Modal.Body>
            <div className='col'>
              <div className='col-12 '>
                <div className='form-group mb-3'>
                  <label className='form-label'>Nom de la catégorie</label>
                  <input className='form-control w-100' placeholder='Entrer le nom de la catégorie' type='text' {...register("nom", { required: "Champ obligatoire" })} />
                  {errors.nom && <span>{errors.nom.message}</span>}
                </div>
              </div>
              <div className='col-12 '>
                <div className='form-group mb-3'>
                  <label className='form-label'>Description de la catégorie</label>
                  <textarea className='form-control w-100' placeholder='Ajouter une description' type='text' {...register("description", { required: "Champ obligatoire" })} />
                  {errors.description && <span>{errors.description.message}</span>}
                </div>
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
  );
}

export default ListeCategorie;
