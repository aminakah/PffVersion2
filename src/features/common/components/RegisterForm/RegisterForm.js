import React, { useState } from 'react';
import './RegisterForm.css';
import { useForm } from 'react-hook-form';
import { AuthService } from '../../../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';



export const RegisterForm  = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');
	const [errorEmail, setErrorEmail] = useState('');
	const [errorPassWord, setErrorPassWord] = useState('');
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	const onSubmitd = data => {
		AuthService.register(data)
		.then(
			(response) => {
				if (response?.data?.status_code === 200) {
					const user = response?.data?.user;
				  console.log(user)
		  
					localStorage.setItem('token', response?.data?.token);
					localStorage.setItem('user', JSON.stringify(user));
					UserService.goToAccount(navigate);
				  }
              console.log(response)
			}
		).catch((error) => {
			console.log(error)
		})
	}
 const onSubmit = (data) => {
    AuthService.register(data)
      .then((response) => {
        console.log(response.data)
        if (response?.data?.status_code === 200) {
          const user = response?.data?.users;
        console.log(user)

          localStorage.setItem('token', response?.data?.token);
          localStorage.setItem('user', JSON.stringify(user));
          UserService.goToAccount(navigate);
        }
        else if(response?.data?.status_code === 401){
        console.log();
        setErrorMessage(response?.data.status_message);
        }

        else if(response?.data?.status_code === 403){
          console(response?.data.status_message);
          setErrorMessage(response?.data.status_message);
  
          }
        else if(response?.data?.error === true){
          console.log(response?.data.message);
          setErrorMessage(response?.data.message);
          setErrorEmail(response?.data.message);
          }
          
      } 
      
      )
    // ...

.catch((errors) => {
  console.log(errors.response?.data?.status_code);
  if (errors.response?.data?.status_code === 422) {
    setErrorMessage(errors.response?.data.status_message);
  } else {
    setErrorMessage('Informations incorrectes. Veuillez réessayer.');
  }
});

// ...

  };
		return(
 			 <div className="w-100">
				<h4 className=' text-center text-decoration-underline'>Inscription</h4>

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
				
				<div className='form-group mb-3'>
					<label>Mot de passe</label>
					<input className='form-control w-100' placeholder='Entrez votre mot de passe' type='password' {...register("password", { required: true })} />
					{errors.password && <span>Veillez renseigner votre mot de passe</span>}
				</div>

				<div className='form-group mb-3'>
					<label>Mot de passe</label>
					<input className='form-control w-100' placeholder='Confirmer votre mot de passe' type='password' {...register("password_confirmation", { required: true })} />
					{errors.password_confirmation && <span>Veillez confirmer votre mot de passe</span>}
				</div>
				
				<div className='text-center'>
					<input className='btn btn-success' type="submit" value="S'inscrire" />
				</div>
				</form>
                <p className='m-1 text-center' >Déjà un compte ?  <Link className='link' to={'/auth/login'} ><span className='link fw-bolder'> Se Connecter </span></Link></p>

			</div>

  
		)

}