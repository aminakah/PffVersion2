

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import './AjouterPharmacie.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { SideNavBarAgent } from '../../../common/components/SideNavBarAgent/SideNavBarPro';
import { AgentService } from '../../../../services/agent.service';

function AjouterCategories() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [produit, setProduit] = useState([]);
  
 


  // ... (Votre code existant)


const onSubmit = (data) => {
  console.log(data);
  // console.log(pharmacieId);
  AgentService.ajouterCatergorie(data)
  console.log(data)

  .then((response) => {
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'categories de pharmacie ajouté avec succès!',
    }).then(() => {
      navigate(`/account/agent/${UserService.getCurrentUser()?.id}/listeCategorie`);
    });
    console.log(response.data);
  }).catch((error) => {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Une erreur est survenue, veuillez réessayer!',
    });
  });
};
// ... (Le reste de votre code)


 

  

  return (
    <div className="AdminHomePage container-fluid p-0 m-0 ">
      <div className="d-flex">
        <SideNavBarAgent />
        <div className="body mx-3 p-4 pb-5">
          <div className="mb-5 d-flex justify-content-between px-5">
            <h2>Ajouter une pharmacie</h2>
            {/* <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`}>
              <button className="btn btn-outline-dark">Voir la liste</button>
            </Link> */}
          </div>
          <div className="px-5">
            <div className="LoginForm w-100">
              <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Nom categorie</label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("nom")}
                      />
                      {errors.nom && <span>Champ obligatoire</span>}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">Description de la categorie </label>
                      <input
                        className="form-control w-100"
                        type="text"
                        {...register("description")}
                      />
                      {errors.adresse && <span>Champ obligatoire</span>}
                    </div>
                  </div>
                </div>

                

                

                <div className="text-center mt-4">
                  <input className="btn btn-success valider" type="submit" value="Valider" />
                  <Link to={`/account/agent/${UserService.getCurrentUser()?.id}/listeCategorie`}>
                    <button className="btn btn-danger mx-3">Annuler l'ajout</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterCategories;
