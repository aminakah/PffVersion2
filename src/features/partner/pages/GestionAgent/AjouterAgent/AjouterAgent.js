import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../../services/user.service';
import { ProprietaireService } from '../../../../../services/propretaire.service';
import Swal from 'sweetalert2';
import ChoixPharmacie from '../../../../common/components/choixPharmacie/choixPharmacie';

function AjouterAgent() {
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieId, setPharmacieId] = useState([]);
  useEffect(() => {
    ProprietaireService.listMesPharmacie()
      .then(response => {
        console.log(response.data.data[0])
        setPharmacies(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // console.log(pharmacieId);
    ProprietaireService.ajoutAgentPharmacie(data)
    .then((response) => {
      if(response.data.succes=== false){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue, veuillez réessayer!',
        });
      }
      else{
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Agent de pharmacie ajouté avec succès!',
        }).then(() => {
          navigate(`/account/partner/${UserService.getCurrentUser()?.id}/listAgentPharmacie`);
        });
      }
     
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

  return (
    <div className="AdminHomePage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarPro />
        <div className='body mx-3 p-4'>
          <div className='   border rounded m-5 p-5'>

          <h2 className='p-2 color text-center'>Ajouter un agent de pharmacie</h2>

              <form onSubmit={handleSubmit(onSubmit)} className=' m-0 w-100'>
                
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Votre prénom</label>
                      <input
                        {...register('prenom', { required: 'Veillez renseigner votre prénom' })}
                        className="form-control w-100"
                        type="text"
                        placeholder='Entrez votre prénom'
                        
                        
                      />
                      {errors.prenom && <span>{errors.prenom.message}</span>}
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Votre nom</label>
                      <input
                        {...register('nom', { required: 'Veillez renseigner votre nom' })}
                        className="form-control w-100"
                        type="text"
                        placeholder='Entrez votre nom'
                        
                      />
                      {errors.nom && <span>{errors.nom.message}</span>}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Numéro de téléphone</label>
                      <input
                        {...register('telephone', { required: 'Veillez renseigner votre téléphone' })}
                        className="form-control w-100"
                        type="text"
                        placeholder='Entrez votre téléphone'
                       
                      />
                      {errors.telephone && <span>{errors.telephone.message}</span>}
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Votre adresse</label>
                      <input
                        {...register('adresse', { required: 'Veillez renseigner votre adresse' })}
                        className="form-control w-100"
                        type="text"
                        placeholder='Entrez votre adresse'
                        
                       
                      />
                      {errors.adresse && <span>{errors.adresse.message}</span>}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Sélectionner une pharmacie</label>
                      <select
                        {...register('pharmacie_id', { required: 'Sélectionnez une pharmacie' })}
                        className='form-control w-100'
                        onChange={e=>setPharmacieId(e.target.value)}
                      >
                        <option value="">Sélectionner une pharmacie</option>
                        {pharmacies.map((pharmacie) => (
                          <option key={pharmacie.id} value={pharmacie.id}>
                            {pharmacie.nom}
                            
                          </option>
                        ))}
                      </select>
                      {errors.pharmacie_id && <span>{errors.pharmacie_id.message}</span>}
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Votre adresse Email</label>
                      <input
                        {...register('email', { required: 'Veillez renseigner votre adresse email' })}
                        className="form-control w-100"
                        type="text"
                        placeholder='Entrez votre adresse email'
                       
                      />
                      {errors.email && <span>{errors.email.message}</span>}
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Mot de passe</label>
                      <input
                        {...register('password', { required: 'Veillez renseigner votre mot de passe' })}
                        className="form-control w-100"
                        type="password"
                        placeholder='Entrez votre mot de passe'
                       
                      />
                      {errors.password && <span>{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className='col-12 col-md-6'>
                    <div className='form-group mb-3'>
                      <label className='form-label'>Confirmez le mot de passe</label>
                      <input
                        {...register('password_confirmation', { required: 'Confirmez votre mot de passe' })}
                        className="form-control w-100"
                        type="password"
                        placeholder='Confirmez votre mot de passe'
                        
                      />
                      {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <input className="btn btn-success valider p-2 w-10" type="submit" value="Valider" />
                  <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listAgentPharmacie`}>
                    <button className="btn btn-danger w-40 mx-2 px-5 p-2">Annuler </button>
                  </Link>
                </div>
              </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterAgent;
