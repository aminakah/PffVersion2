import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
import { UserService } from '../../../../../services/user.service'
import { ProprietaireService } from '../../../../../services/propretaire.service';

function AjouterMedicament() {

	const [pharmacieId, setPharmacieId]  = useState(18);
	const [photo, setPhoto] = useState();
	const [categories,setCategories] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => {
		 console.log(data)
		ProprietaireService.ajouterMedicament(data)
		.then(
			(response) => {
              console.log(response)
			}
		).catch((error) => {
			console.log(error)
		})
	}

	useEffect(() => {
      ProprietaireService.listeCategorie(pharmacieId)
	  .then(
		(response) => {
		  setCategories(response?.data);
		}
	).catch((error) => {
		console.log(error)
	})
	},[])
  return (
	<div className="AdminHomePage container-fluid p-0 m-0">
	<div className='d-flex'>
	  <SideNavBarPro />
	  <div className='body mx-3 p-4'>
		 <div className='mb-5 d-flex justify-content-between px-5'>
			<h2>Ajouter du medicament</h2>
			<Link to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listMedicament'}>
			 <button className='btn btn-outline-dark'>Voir la liste</button>
			</Link>
		 </div>
		 <div className='px-5'>
			
		 <div className="LoginForm w-100">
		<form onSubmit={handleSubmit(onSubmit)} className='w-100'>
		<div className='row'>
		   <div className='col-12 col-md-6'>
				<div className='form-group mb-3'>
					<label className='form-label'>Nom du medicament</label>
					<input  className='form-control w-100' placeholder='Entrez le nom pharmacie' type='text' {...register("nom")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		   <div className='col-12 col-md-6'>
				   <div className='form-group mb-3'>
					<label className='form-label'>Image</ label>
					
					<input  className='form-control w-100' placeholder='Entrez adresse de la pharmacie' type='file' {...register("photo")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		</div>

		<div className='row'>
		   <div className='col-12 col-md-6'>
				<div className='form-group mb-3'>
					<label className='form-label'>Prix</label>
					<input  className='form-control w-100' placeholder='Entrez le téléphone de la pharmacie'  type='tel' {...register("prix")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		   <div className='col-12 col-md-6'>
				   <div className='form-group mb-3'>
					<label className='form-label'>Quantite</label>
					<input  className='form-control w-100' placeholder='Entrez votre adresse ' type='text' {...register("quantite")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		</div>
		<div className='row'>
		   <div className='form-group mb-6'>
			<label className='form-label'>Categorie</label>
			<select class="form-select"  {...register("categorie_id")} onChange={(e)=> setPhoto(e.target.value)}>
			<option selected disabled value={''}>Selectionner une catégorie</option>
			{categories.map((cat)=> <option key={cat.id} value={cat.id}>{cat.nom}</option>)}
			</select>
			{errors.email && <span>Veillez renseigner une catégorie</span>}
		   </div>
		   
		</div>
	   
		<div className='row'>
		  
		<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Description </label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...register('description')}></textarea>
</div>
</div>
		
		
		<div className='text-center'>
			<input className='btn btn-success' type="submit" value="Valider" />
			<   Link to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listMedicament'}>
				 <button className='btn btn-danger mx-3'>Annuler la modification</button>
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

export default AjouterMedicament