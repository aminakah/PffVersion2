

import React, { useEffect, useState } from 'react';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';
import { Link } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RegionService } from '../../../../services/region.service';


function ListeRegion() {
	const [region, setRegion] = useState([{}]);
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
        
        loadRegion();
        // loadIdPharmacies();
        
      }, []);
    
      const onSubmit = data => {
        console.log(data)
        if (selectedRegion === null) {
          RegionService.ajouterRegion(data)
            .then(response => {
                console.log(response)
             setSelectedRegion(null);
              setShow(false);
              loadRegion();
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
              loadRegion();
              reset();
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
    
      const onSelectRegion = region => {
        setSelectedRegion(region.id);
        setShow(true);
        setValue('nom', region.nom);
       
      };
    
      const supprimerRegion = ( id) => {
        RegionService.supprimerRegion(id)
          .then(response => loadRegion())
          .catch(error => {
            console.log(error);
          });
      };
    
      const loadRegion = () => {
        RegionService.getListRegion()
        .then(response => {
          console.log(response.data);
          
            setRegion(response.data);
          
        })
          .catch(error => {
            console.error(error);
          });
      };
    
	
	  if (region === null) {
		// Loading state, you can render a loading spinner or message
		return <p>Loading...</p>;
	  }
  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBar />
        <div className='body  p-4'>
        
			    <div>
          <div className=' d-flex justify-content-between'>
            <h2>Liste regions </h2>
            {/* <Button variant="success" onClick={modalShow}>
              Ajouter une region
            </Button> */}
          </div>
          
          </div>

      <div className='col-12 col-md-12'>
				   <div className='card'>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Actions</th>

						</tr>
					</thead>
					<tbody>
						{region.map((c) =><tr>
               <td>{c.nom}</td>
                <td>
                  <button onClick={() => supprimerRegion(c.id,)} className="btn btn-outline-danger"> <i className='fa fa-trash'></i></button>
                  <button onClick={() => onSelectRegion(c)} className="btn btn-outline-success mx-2"> <i className='fa fa-edit'></i></button>
                  <Link to={'/account/admin/'+ UserService.getCurrentUser()?.id +'/departement'}>
                  <button className='btn btn-primary'>Departements</button>
                </Link>
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

export default ListeRegion