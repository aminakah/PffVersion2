import React, { Component } from 'react';
import './ContactUs.css';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { NavBarTop } from '../NavBarTop/NavBarTop';
import NosServices from '../NosServices/NosServices';
import Apropos from '../Apropos/Apropos';

export const ContactUs = () => {

	const { register, handleSubmit, reset, formState: { errors } } = useForm();


	const onSubmit = (data) => {
       console.log(data)

	   Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Bravo ! votre message a été envoyé avec succès! Notre équipe vous recontactera plus tard',
      })

	  reset();

	}


		return(
			<div>
        <NavBarTop></NavBarTop>
		{/* <NosServices/> */}
		{/* <Apropos/> */}

		<div className="row bg-white" style={{margin: '40px 60px'}}>
				<div className='contact-info col-5 text-center'>
                    <h3>Rejoignez-nous</h3>
					<p className=' mt-2 text-white'>
						Contactez nous pour inscrire votre pharmacie <br /> ou trouver plus d'informations
					</p>
					<ul className='list-unstyled'>
						<li className='d-flex justify-content-start align-items-center'>
							<div  className='icon-circle'><i className='fa fa-map-marker'></i></div>
							<div className='pt-4'>Adresse : Diamniadio, Dakar, Sénégal</div>
						</li>
						<li className='d-flex justify-content-start align-items-center'>
							<div  className='icon-circle'><i className='fa fa-phone'></i></div>
							<div className='pt-4'>Tél : 33 554 44 54</div>
						</li>
						<li className='d-flex justify-content-start align-items-center'>
							<div className='icon-circle'><i className='fa fa-message'></i></div>
							<div className='pt-4'>Email : senpharmacie@contactgmail.com</div>
						</li>
						<li className='d-flex justify-content-start align-items-center'>
							<div  className='icon-circle'><i className='fa fa-globe'></i></div>
							<div className='pt-4'>Site : www.senpharmacie.sn</div>
						</li>
					</ul>
				</div>
				<div className='contact-form col-7'>
					<h2 className='my-5 ms-3  text-center mes'>Envoyez-nous un message</h2>
                   <div className='mt-4 px-4'>
					 <form  onSubmit={handleSubmit(onSubmit)}>
						<div className='row mt-3'>
							<div className='form-group col-6'>
                               <label className='form-label'>Nom</label>
							   <input {...register('nom', {required: true})} type='text' className='form-control w-100'  />
							</div>
							<div className='form-group col-6 '>
                               <label className='form-label'>Prénom</label>
							   <input {...register('prenom', {required: true})}  type='text' className='form-control w-100'  />
							</div>
						</div>
						<div className='row mt-3'>
							<div className='form-group col-6'>
                               <label className='form-label'>Email</label>
							   <input {...register('email', {required: true})}  type='email' className='form-control w-100'   />
							</div>
							<div className='form-group col-6'>
                               <label className='form-label'>Téléphone</label>
							   <input {...register('telephone', {required: true})}  type='tel' className='form-control w-100 contact-input'  />
							</div>
						</div>
						<div className='row mt-3'>
                           <div className='col-12'>
                               <div className='form-group'>
                                  <label className='form-label'>Votre message</label>
                                  <textarea {...register('message', {required: true})}  rows={6} className='form-control w-100' ></textarea>
							   </div>
						   </div>
						</div>

						<button type='submit' className='btn contact-btn mt-3'>Envoyer</button>
					 </form>
				   </div>
				</div>

			</div>
			</div>
			
		)
	
}