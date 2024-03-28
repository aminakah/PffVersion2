import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserService } from '../../../../../services/user.service';
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro';
import { ProprietaireService } from '../../../../../services/propretaire.service';

function ModifierCategorie() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {selectedCategorie, setSelectedCategorie} = useState();
	const onSubmit = data => {
		ProprietaireService.modifierCategorie(data)
		.then(
			(response) => {
              console.log(response)
			}
		).catch((error) => {
			console.log(error)
		})
	}
	
  return (
	<div className="AdminHomePage container-fluid p-0 m-0">
	<div className='d-flex'>
	  <SideNavBarPro />
	  <div className='body mx-3 p-4'>
		 <div className='mb-5 d-flex justify-content-between px-5'>
			<h2>Ajouter une categorie</h2>
			<Link to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listMedicament'}>
			 <button className='btn btn-outline-dark'>Voir la liste</button>
			</Link>
		 </div>
		 <div className='px-5'>
			
		 <div className="LoginForm w-100">
		<form onSubmit={handleSubmit(onSubmit)} className='w-100'>
		<div className='col'>
		   <div className='col-12 '>
				<div className='form-group mb-3'>
					<label className='form-label'>Nom du categorie</label>
					<input  className='form-control w-100' placeholder='Entrez le nom pharmacie' type='text' {...register("nom")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		   <div className='col-12 '>
				   <div className='form-group mb-3'>
					<label className='form-label'>Description de la categorie</ label>
					<input  className='form-control w-100' placeholder='Entrez adresse de la pharmacie' type='text' {...register("nom")} />
					{errors.non && <span>champs obligatoire</span>}
				</div>
		   </div>
		</div>


		
		
		
		
		<div className='text-center'>
			<input className='btn btn-success' type="submit" value="Valider" />
			
			<button className='btn btn-danger mx-3'  >Annuler la modification</button>
				
		</div>
		</form>
	</div>
		 </div>
	  </div>
	</div>
</div>
  )
}

export default ModifierCategorie