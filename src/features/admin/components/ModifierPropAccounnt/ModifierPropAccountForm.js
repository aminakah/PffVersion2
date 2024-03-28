import React from 'react';
import './ModifierPropAccountForm.css';
import { useForm } from 'react-hook-form';
import { UserService } from '../../../../services/user.service';

export const ModifierPropAccountForm  = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => {
		UserService.addProp(data)
		.then(
			(response) => {
              console.log(response)
			}
		).catch((error) => {
			console.log(error)
		})
	}
		return(
			<div className="LoginForm w-100">
				<form onSubmit={handleSubmit(onSubmit)} className='w-100'>
				<div className='row'>
                   <div className='col-12 col-md-6'>
						<div className='form-group mb-3'>
							<label className='form-label'>Votre prénom</label>
							<input  className='form-control w-100' placeholder='Entrez votre prénom' type='text' {...register("prenom")} />
							{errors.prenom && <span>Veillez renseigner votre email</span>}
						</div>
				   </div>
                   <div className='col-12 col-md-6'>
				   		<div className='form-group mb-3'>
							<label className='form-label'>Votre nom</label>
							<input  className='form-control w-100' placeholder='Entrez votre nom' type='text' {...register("nom")} />
							{errors.nom && <span>Veillez renseigner votre nom</span>}
						</div>
				   </div>
				</div>

				<div className='row'>
                   <div className='col-12 col-md-6'>
						<div className='form-group mb-3'>
							<label className='form-label'>Numéro de téléphone</label>
							<input  className='form-control w-100' placeholder='Entrez votre téléphone' type='tel' {...register("telephone")} />
							{errors.telephone && <span>Veillez renseigner votre téléphone</span>}
						</div>
				   </div>
                   <div className='col-12 col-md-6'>
				   		<div className='form-group mb-3'>
							<label className='form-label'>Votre adresse</label>
							<input  className='form-control w-100' placeholder='Entrez votre adresse ' type='text' {...register("adresse")} />
							{errors.adresse && <span>Veillez renseigner votre adresse</span>}
						</div>
				   </div>
				</div>
				<div className='form-group mb-3'>
					<label className='form-label'>Votre adresse email</label>
					<input  className='form-control w-100' placeholder='Entrez votre adresse email' type='email' {...register("email")} />
					{errors.email && <span>Veillez renseigner votre email</span>}
				</div>
				
				<div className='form-group mb-4'>
					<label>Mot de passe</label>
					<input className='form-control w-100' placeholder='Entrez votre mot de passe' type='password' {...register("password", { required: true })} />
					{errors.password && <span>Veillez renseigner votre mot de passe</span>}
				</div>

				<div className='form-group mb-4'>
					<label>Mot de passe</label>
					<input className='form-control w-100' placeholder='Confirmer votre mot de passe' type='password' {...register("password_confirmation", { required: true })} />
					{errors.password_confirmation && <span>Veillez confirmer votre mot de passe</span>}
				</div>
				
				<div className='text-center'>
					<input className='btn btn-success' type="submit" value="Modifier Propretaire" />
				</div>
				</form>
			</div>
		)
		
}