import React from 'react';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import TeamImg from '../../../../assets/images/small-team.png';
import { NavBarTop } from '../../components/NavBarTop/NavBarTop';

export const RegisterPage = () =>  {

	return(
		<div>
		<NavBarTop/>
		<div className="mt-5">
			<div className='col-4 col-md-4  register-form-section border p-4 bg-white container  '>
				<RegisterForm />

			</div>
			{/* <div className='col-12 col-md-7'>
			<img src={TeamImg} alt='team' className='img-fluid' />
			</div> */}
		</div>
		</div>
		


	)
	
}