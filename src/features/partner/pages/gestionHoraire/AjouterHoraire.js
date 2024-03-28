import React from 'react'
import { useForm } from 'react-hook-form';
import { SideNavBarPro } from '../../../common/components/SideNavBarPro/SideNavBarPro';
import { UserService } from '../../../../services/user.service';
import { Link } from 'react-router-dom';

function AjouterHoraire() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  return (
   
    <div className="AdminHomePage container-fluid p-0 m-0 ">
    <div className="d-flex">
      <SideNavBarPro />
      <div className="body mx-3 p-4 pb-5">
        <div className="mb-5 d-flex justify-content-between px-5">
          <h2>Ajouter Horaire</h2>
          {/* <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`}>
            <button className="btn btn-outline-dark">Voir la liste</button>
          </Link> */}
        </div>
        <div className="px-5">
          <div className="LoginForm w-100">
            <form  className="w-100">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du lundi</label>
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
                    <label className="form-label">Entrez L'Heure d'ouverture et fermuture du Mardi</label>
                    <input
                      className="form-control w-100"
                      type="text"
                      {...register("adresse")}
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
                      {...register("nom")}
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
                      {...register("adresse")}  
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
                      {...register("nom")}
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
                      {...register("adresse")}
                    />
                    {errors.adresse && <span>Champ obligatoire</span>}
                  </div>
                  
                </div>
              </div>
            

              <div className="text-center mt-4">
                <input className="btn btn-success valider" type="submit" value="Valider" />
                <Link to={`/account/partner/${UserService.getCurrentUser()?.id}/listMesPharmacie`}>
                  <button className="btn btn-danger mx-3">Annuler l'ajout</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AjouterHoraire

