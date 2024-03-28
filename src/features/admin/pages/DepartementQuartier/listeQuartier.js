

import React, { useEffect, useState } from 'react';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { Link } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RegionService } from '../../../../services/region.service';


function ListeQuartier() {
    
	  const [quartiers, setQuartier] = useState([{}]);
      const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
      const [show, setShow] = useState(false);
      const [selectedRegion, setSelectedRegion] = useState(null);
    
      const modalClose = () => {
        setShow(false);
        setSelectedRegion(null);
        reset();
      };
    
      const modalShow = () => setShow(true);
      useEffect(() => {
        loadQuartier();
      }, []);
    
      const onSubmit = data => {
        console.log(data)
        if (selectedRegion === null) {
          RegionService.ajouterRegion(data)
            .then(response => {
                console.log(response)
             setSelectedRegion(null);
              setShow(false);
              loadQuartier();
              reset();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          RegionService.modifierRegion(data, selectedRegion.id)
            .then(response => {
             setSelectedRegion(null);
              setShow(false);
              loadQuartier();
              reset();
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
    
      const onSelectRegion = region => {
        setSelectedRegion(region);
        setShow(true);
        setValue('nom', region.nom);
       
      };
    
      const supprimerRegion = ( id) => {
        PharmacieService.supprimerRegion(id)
          .then(response => loadQuartier())
          .catch(error => {
            console.log(error);
          });
      };
    
      const loadQuartier = () => {
        RegionService.getListQuartier()
        .then(response => {
          console.log(response);
            setQuartier(response.data);
        })
          .catch(error => {
            console.error(error);
          });
      };
    
	  if (quartiers === null) {
		// Loading state, you can render a loading spinner or message
		return <p>Loading...</p>;
	  }
  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBar />
        <div className='body mx-3 p-4'>
        
			<div>
          <div className='mb-5 d-flex justify-content-between'>
            <h2>Liste quartier </h2>
            <Button variant="success" onClick={modalShow}>
              Ajouter un quartier
            </Button>
          </div>
          <div className="ProprietaireList">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">departements</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quartiers.map(q => (
                  <tr key={q.id}>
                    <td>{q.nom}</td>
                    <td>{q.region_id}</td>
                    <td>
                      <button onClick={() => supprimerRegion(q.id,)} className="btn btn-outline-primary"> Supprimer</button>
                      <button onClick={() => onSelectRegion(q)} className="btn btn-outline-danger"> Modifier</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRegion === null ? 'Ajouter une Catégorie' : 'Modifier la catégorie'}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
          <Modal.Body>
            <div className='col'>
              <div className='col-12 '>
                <div className='form-group mb-3'>
                  <label className='form-label'>Nom de la region</label>
                  <input className='form-control w-100' placeholder='Entrer le nom de la catégorie' type='text' {...register("nom", { required: "Champ obligatoire" })} />
                  {errors.nom && <span>{errors.nom.message}</span>}
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

export default ListeQuartier