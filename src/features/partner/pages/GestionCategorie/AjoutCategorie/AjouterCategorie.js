import { useForm } from 'react-hook-form';
import React from 'react';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../../services/user.service';
import { ProprietaireService } from '../../../../../services/propretaire.service';
import axios from 'axios'; // Importez Axios

function AjouterCategorie() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (id) => {
    // Utilisez Axios pour envoyer les données au serveur
    axios.post(`http://localhost:8000/api/ajouterCategorie/${id}`, id)
      .then((response) => {
        console.log(response.data);

        // Ajoutez ici le code pour gérer la réponse réussie (redirection, affichage de messages, etc.)
        navigate(`/account/partner/${UserService.getCurrentUser()?.id}/listeCategorie`);
      })
      .catch((error) => {
        console.error(error);

        // Ajoutez ici le code pour gérer les erreurs (affichage de messages, etc.)
      });
  };

  return (
    <div className="AdminHomePage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarPro />
        <div className='body mx-3 p-4'>
          <div className='mb-5 d-flex justify-content-between px-5'>
            <h2>Ajouter une categorie</h2>
            <Link to={'/account/partner/' + UserService.getCurrentUser()?.id + '/listMedicament'}>
              <button className='btn btn-outline-dark'>Voir la liste</button>
            </Link>
          </div>
          <div className='px-5'>
            <div className="LoginForm w-100">
              <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                {/* ... (champs de formulaire) */}
                <div className='text-center'>
                  <input className='btn btn-success' type="submit" value="Valider" />
                  <Link to={'/account/partner/' + UserService.getCurrentUser()?.id + '/listeCategorie'}>
                    <button className='btn btn-danger mx-3'>Annuler</button>
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

export default AjouterCategorie;
