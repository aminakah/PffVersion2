import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AgentService } from '../../../../services/agent.service';
import { ProprietaireService } from '../../../../services/propretaire.service';
import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
import Swal from 'sweetalert2';

function ListeCategories() {
  const [categories, setCategories] = useState([]);
  // const [pharmacies, setPharmacies] = useState([]);
	// const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));


  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [show, setShow] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const modalClose = () => {
    setShow(false);
    setSelectedCategorie(null);
    reset();
  };

  const modalShow = () => setShow(true);

 
 ;

 useEffect(() => {
        AgentService.listeCategorie()
           .then(response => {
               setCategories(response.data.categories);
           })
           .catch(error => {
             console.error(error);
           });
       }, []);

  const onSubmit = data => {
    console.log(data)
    if (selectedCategorie === null) {
      AgentService.ajouterCatergorie(data)
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

      AgentService.modifierCategorie(data, selectedCategorie.id)
        .then(response => {
         console.log(response)

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
  };

  async function supprimerCategorie(id) {
        try {
          await AgentService.supprimerCatergorie(id);
          const newCategories = categories.filter((Categorie) => Categorie.id !== id);
          setCategories(newCategories);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Categorie supprimée',
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur, categorie non supprimée',
          });
        }
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
 


  if (categories === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarAgent />
        <div className='body mx-3 p-4'>
			   
          <div className='mb-5 d-flex justify-content-between'>
            <h2>Liste de mes catégories </h2>
            <Button variant="success" onClick={modalShow}>
              Ajouter une catégorie
            </Button>
          </div>
          <div className="ProprietaireList">
            <table className="table">
              <thead>
              <tr className='w-100' style={{position: 'relative'}}>
                
                  <th scope="col">Nom</th>
                  <th scope="col">Description</th>
                      <th scope="col " className='text-end' style={{position: 'absolute',right: 10}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(categorie => (
                  <tr key={categorie.id}>
                    <td>{categorie.nom}</td>
                    <td>{categorie.description}</td>
                  
                    <td className='text-end'>
                  <button className="btn btn-outline-primary mx-1  "  onClick={() => onSelectCategorie(categorie)} title='Modifier'><i className='fa fa-edit'></i></button>
                  <button className='btn btn-outline-danger'onClick={() => supprimerCategorie(categorie.id)} title='Supprimer'><i className='fa fa-trash'></i></button>
                  <a href={`/DetailsMedicament/${categorie.id}`} className="btn btn-outline-success mx-1 "><i className='fa fa-eye' title='Voir Détails'></i></a>
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
          <Modal.Title>{selectedCategorie === null ? 'Ajouter une Catégorie' : 'Modifier la catégorie'}</Modal.Title>
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
            <Button variant="secondary" onClick={modalClose}>Annuler</Button>
            <input className='btn btn-secondary' type="submit" value="Valider" />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ListeCategories;

// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Icon from "@mui/material/Icon";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Swal from "sweetalert2";
// // import "./ListePharmacie"
// import { AgentService } from '../../../../services/agent.service';
// import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
// import { UserService } from '../../../../services/user.service';

// function ListeCategories() {
// 	const [categories, setCategories] = useState([]);
 
//   async function supprimerCategorie(id) {
//     try {
//       await AgentService.supprimerCatergorie(id);
//       const newCategories = categories.filter((Categorie) => Categorie.id !== id);
//       setCategories(newCategories);
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Pharmacie supprimée',
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Erreur, pharmacie non supprimée',
//       });
//     }
//   }
//     useEffect(() => {
//       AgentService.listeCategorie()
//          .then(response => {

//            // Check if the response data is an array before setting the state
//            // if (Array.isArray(response?.data.items)) {
//              // setProprietaires(response.data?.items);
//              setCategories(response.data.categories);
             
//            // } 
//            // else {
//            //   console.error('Data is not an array:', response?.data);
//            // }
//          })
//          .catch(error => {
//            console.error(error);
//          });
//      }, []);
   
//      if (categories === null) {
//        // Loading state, you can render a loading spinner or message
//        return <p>Loading...</p>;
//      }

   
    
//   return (
//     <div className="PartnerHomePage container-fluid p-0 m-0">
// 		<div className='d-flex'>
// 		  <SideNavBarAgent />
// 		  <div className='body mx-3 p-4'>
// 				 <div className='mb-5 d-flex justify-content-between'>
// 					<h2>Liste de nos categorie</h2>
// 					<Link to={'/account/agent/'+ UserService.getCurrentUser()?.id +'/ajouterCategories'}>
// 						<button  className="btn btn-success mx-1 ">  <i className='fa fa-plus' title='Ajouter'></i>
//                 Ajouter</button>
// 					</Link>
          
// 				 </div>
// 				 <div className="ProprietaireList">
//       <table className="table table-striped table-hover table-responsive">
//         <thead>
//           <tr>
//             <th scope="col">Nom</th>
//             <th scope="col">Description</th>
//             <th scope="col " className='text-end'>Actions</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map(categorie => (
//             <tr key={categorie.id}>
              
//               <td>{categorie.nom}</td>
//               <td>{categorie.description}</td>
//               <td className='text-end'>
//               <a href={`/AgntDetailsDeMaCategorie/${categorie.id}`}     className="btn btn-outline-primary mx-1" > <i className='fa fa-eye' title='Voir Détails'></i></a>
// 			  	    <a href={`AgentmodifierCategorie/${categorie.id}`} className="btn btn-outline-success mx-1 " >  <i className='fa fa-edit'></i> </a>
//               <Button
//                 className='btn btn-outline-danger'
//                 key="delete"
//                 variant="text"
            
//             onClick={() => {
//               Swal.fire({
//                 title: "Voulez-vous confirmer la suppression?",
//                 text: "Vous ne pourrez pas revenir en arrière !",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Supprimer",
//                 cancelButtonText: "Annuler",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   supprimerCategorie(categorie.id);
//                 }
//               });
//             }}
//           >
            
//       <DeleteIcon    style={{ color: '#d33' }} color="#d33" />
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

// export default ListeCategories