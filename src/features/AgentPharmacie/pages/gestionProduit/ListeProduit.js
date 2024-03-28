import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-bootstrap';
import { AgentService } from '../../../../services/agent.service';
import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
import { BASE_URL } from '../../../../constants/app-constant';
import Swal from 'sweetalert2';

function ListeProduit() {

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
          AgentService.listeMedicament()
          .then(response => {
            setMedicaments(response.data.produits);
            console.log(response);
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
        AgentService.ajouterMedicament(data)
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
        AgentService.modifierMedicament(data)
        .then(
          (response) => {
          console.log(response)

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
      AgentService.listeCategorie()
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
      console.error(error);
      });
  
      }

    // const supprimerMedicament = (id) => {
    // AgentService.supprimerMedicamet( id)
    // .then(response =>{
      
    //   loadMedicaments();
    // })
    // .catch(error => console.log(error))
    // }

    async function supprimerMedicament(id) {
      try {
        await AgentService.supprimerMedicamet(id);
        const newCategories = categories.filter((medicament) => medicament.id !== id);
        setCategories(newCategories);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Pharmacie supprimée',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erreur, pharmacie non supprimée',
        });
      }
    }
  return (
    <div className="PartnerHomePage container-fluid p-0 m-0">
		<div className='d-flex'>
		  <SideNavBarAgent/>
		  <div className='body mx-3 p-4'>
        
            <div className='mb-5 d-flex justify-content-between'>
              <h2>Liste des medicament de la  pharmacie</h2>
                <button onClick={modalShow} className='btn btn-success'>Ajouter un medicament</button>
            </div>
            <div className="ProprietaireList">
                <table className="table  table-striped table-hover table-responsive">
                  <thead>
                    <tr className='w-100' style={{position: 'relative'}}>
                  <th scope="col">Image</th>
                      <th  scope="col">Nom</th>
                      <th scope="col">Description</th>
                      <th scope="col">Quantite</th>
                      {/* <th scope="col">Categorie</th> */}
                      <th scope="col">Prix</th>
                      {/* <th scope="col">pharmacie</th> */}
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
                        {/* <td>{medicament.categorie_id}</td> */}
                        <td>{medicament.prix}</td>
                        {/* <td>{medicament.pharmacie_id}</td> */}
                        <td>{medicament.telephone}</td>
                        {/* <td>{agent.status == 0 ?"actif":"inactif"}</td> */}
                        <td className='text-end'>
                  <button className="btn btn-outline-primary mx-1  " onClick={() =>onSelectMedicament(medicament)} title='Modifier'><i className='fa fa-edit'></i></button>
                  <button className='btn btn-outline-danger' onClick={()=> supprimerMedicament(medicament.id)} title='Supprimer'><i className='fa fa-trash'></i></button>
                  <a href={`/DetailsMedicament/${medicament.id}`} className="btn btn-outline-success mx-1 "><i className='fa fa-eye' title='Voir Détails'></i></a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        
				 
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
                { selectedMedicament !== null ? <img width={30} src={`${BASE_URL}/images/${selectedMedicament.photo}`}  alt={selectedMedicament.nom}/> : null}
                <span>{ selectedMedicament !== null ? "Changer l'image" : "Ajouter une image"} </span>
            </ label>
					<input  
          {...register('photo')} // Register the 'image' field with react-hook-form
          onChange={handleImageChange}
          ref={(e) => {
            setValue('photo', e) // Register the input and assign the ref to access it later
            fileInputRef.current = e;
          }}
          className='form-control w-100'  type='file'  />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		</div>

		<div className='row'>
		   <div className='col-12 col-md-6'>
				<div className='form-group mb-3'>
					<label className='form-label'>Prix</label>
					<input  className='form-control w-100' placeholder='Entrez le prix'  type='number' {...register("prix")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		   <div className='col-12 col-md-6'>
				   <div className='form-group mb-3'>
					<label className='form-label'>Quantite</label>
					<input  className='form-control w-100' placeholder='Entrez la quqntite ' type='number' {...register("quantite")} />
					{errors.non && <span>champs obligatoire</span>}
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
        <Button variant="secondary" onClick={modalClose}>Annuler</Button> 
        <input className='btn btn-secondary' type="submit" value="Valider" /> 
      </Modal.Footer>  
      </form>

    </Modal> 
	</div>
  )
}
export default ListeProduit
// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Button, Modal } from 'react-bootstrap';
// import { Php } from '@mui/icons-material';
// import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
// import { AgentService } from '../../../../services/agent.service';
// import { BASE_URL } from '../../../../constants/app-constant';
// import Swal from 'sweetalert2';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { UserService } from '../../../../services/user.service';

// function ListeProduit() {

//   const [pharmacieId, setPharmacieId] = useState(18);
// 	const [medicaments, setMedicaments] = useState([]);
//   const [photo, setPhoto] = useState();

//   const { register, handleSubmit, setValue, watch, formState: { errors }, reset} = useForm();
//   const [show, setShow] = useState(false);  
//   const [selectedMedicament, setSelectedMecicament] = useState(null);
//   const [pharmacies, setPharmacies] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const fileInputRef = useRef(null); 

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(photo);
//     setValue('photo', file); // Set the file value in the form data
//   };

//   const clearImageField = () => {
//     setValue('photo', null); // Clear the file value in the form data
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ''; // Reset the file input
//     }
//   };


//   const modalClose = () => {
//     reset();
//     setShow(false);
//     setSelectedMecicament(null);
//   };  
//   const modalShow = () => setShow(true); 
  
//     useEffect(() => {
//         loadMedicaments();
//         loadCategoriesList(); 
//     }, []);



//   const   loadMedicaments = () => {
//     AgentService.listeMedicament()
//     .then(response => {
//       setMedicaments(response.data.produits);
//       console.log(response);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//     }

//     const onSelectMedicament = med => {
//       setSelectedMecicament(med);
//       setShow(true);
//       setValue('nom', med.nom);
//       setValue('description', med.description);
//       setValue('categorie_id', med.categorie_id);
//       setValue('prix', med.prix);
//       setValue('quantite', med.quantite);
//     };

//     const onSubmit = data => {
//       if(selectedMedicament === null){
//         AgentService.ajouterMedicament()
//         .then(
//           (response) => {
//            loadMedicaments();
//           setShow(false);
//           reset();
//           setSelectedMecicament(false);
//           }
//         ).catch((error) => {
//           console.log(error)
//         })
//       } else{
//         AgentService.modifierMedicament(data, selectedMedicament)
//         .then(
//           (response) => {
//           loadMedicaments();
//           modalClose();
//           reset();
//           setSelectedMecicament(false);
//           }
//         ).catch((error) => {
//           console.log(error)
//         })
//       }
      
//     }

//     const loadCategoriesList = () =>{
//       AgentService.listeCategorie(pharmacieId)
//       .then(response => {
//         setCategories(response);
//         console.log(response);
//       })
//       .catch(error => {
//       console.error(error);
//       });
  
//       }

//     const supprimerMedicament = ( id) => {
//     AgentService.supprimerMedicamet( id)
//     .then(response =>{
//       console.log(response)
//       loadMedicaments();
//     })
//     .catch(error => console.log(error))
//     }
//   return (
//     <div className="PartnerHomePage container-fluid p-0 m-0">
// 		<div className='d-flex'>
// 		  <SideNavBarAgent />
// 		  <div className='body mx-3 p-4'>
// 				 <div className='mb-5 d-flex justify-content-between'>
// 					<h2>Liste des medicament</h2>
// 			    <a href={'/account/agent/'+ UserService.getCurrentUser()?.id +'/ajouterProduit'} className="btn btn-success mx-1 "> Ajouter <i className='fa fa-plus' title='Ajouter'></i></a>
        
// 				 </div>
// 				 <div className="ProprietaireList">
//       <table className="table  table-striped table-hover table-responsive">
//         <thead>
//           <tr className='w-100' style={{position: 'relative'}}>
// 		  	<th scope="col">Image</th>
//             <th scope="col">Nom</th>
//             <th scope="col">Description</th>
//             <th scope="col">Quantite</th>
//             <th scope="col">Categorie</th>
//             <th scope="col">Prix</th>
//             <th scope="col " className='text-end' style={{position: 'absolute',right: 0}}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicaments.map(medicament => (
//             <tr key={medicament.id}>
//               <td>
//                 <img width={60} src={`${BASE_URL}/images/${medicament.photo}`}  alt={medicament.photo}/>
//               </td>
//               <td>{medicament.nom}</td>
//               <td>{medicament.description}</td>
//               <td>{medicament.quantite}</td>
//               <td>{medicament.categorie_nom}</td>
//               <td>{medicament.prix}</td>
//               <td>{medicament.telephone}</td>
//               <td className='text-end'>
//               <button className="btn btn-outline-primary mx-1  " onClick={() =>onSelectMedicament(medicament)} title='Modifier'><i className='fa fa-edit'></i></button>
//               <a href={`/DetailsMedicament/${medicament.id}`} className="btn btn-outline-success mx-1 "><i className='fa fa-eye' title='Voir Détails'></i></a>
//                <Button
//                           className='btn btn-outline-danger'
//                           key="delete"
//                           variant="text"
//                           onClick={() => {
//                         Swal.fire({
//                           title: "Voulez-vous confirmer la suppression?",
//                           text: "Vous ne pourrez pas revenir en arrière !",
//                           icon: "warning",
//                           showCancelButton: true,
//                           confirmButtonColor: "#3085d6",
//                           cancelButtonColor: "#d33",
//                           confirmButtonText: "Supprimer",
//                           cancelButtonText: "Annuler",
//                         }).then((result) => {
//                           if (result.isConfirmed) {
//                             supprimerMedicament(medicament.id);
//                           }
//                         });
//                       }} >
//                     <DeleteIcon    style={{ color: '#d33' }} color="#d33" />
//               </Button>
// 			        </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
// 			  </div>
// 		</div>
    
// 	</div>
//   )
// }
// export default ListeProduit