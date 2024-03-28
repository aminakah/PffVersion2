import React, { useState } from 'react';
import './LoginForm.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassWord, setErrorPassWord] = useState('');

  const onSubmit = (data) => {
    AuthService.login(data)
      .then((response) => {
        console.log(response.data)
        if (response?.data?.status_code === 200) {
          const user = response?.data?.user;
        console.log(user)

          localStorage.setItem('token', response?.data?.token);
          localStorage.setItem('user', JSON.stringify(user));
          UserService.goToAccount(navigate);
        }

        else if(response?.data?.status_code === 403){
          console(response?.data.status_message);
          setErrorMessage(response?.data.status_message);
  
          }
        else if(response?.data?.status_code === 401){
        console.log();
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
    setErrorMessage("Votre compte a été bloqué. Veuillez contacter le gestionnaire de votre compte");
  }
});

// ...

  };

  return (

      <form onSubmit={handleSubmit(onSubmit)} className="w-100">
				<h4 className='mt-3 text-center text-decoration-underline'>Connexion</h4>

        <div className="form-group mb-3">
          <label className="form-label">Adresse Email</label>
          <input className="form-control w-100" placeholder="Entrez votre adresse email" type="email" {...register('email')} />
          {errorEmail && <span>Veillez renseigner votre email</span>}
        </div>

        <div className="form-group mb-4">
          <label>Mot de passe</label>
          <input className="form-control w-100" placeholder="Entrez votre mot de passe" type="password" {...register('password', { required: true })} />
          { errorPassWord&& <span>Veillez renseigner votre mot de passe</span>}
        </div>

        {errorMessage && <div className="text-danger">{errorMessage}</div>}

        <div className="text-center">
          <input className="btn btn-success w-60" type="submit" value="Connexion" />
        </div>
        <div className='text-center '>
			   		
          <p className='m-1 text-center' >Pas de  compte ?  <Link className='link' to={'/auth/Register'} ><span className='link fw-bolder'> Inscrivez-vous </span></Link></p>
			   </div>
      </form>
    
  );
};
