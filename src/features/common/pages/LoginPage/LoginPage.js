import React from 'react';
import './LoginPage.css';

import TeamImg from '../../../../assets/images/small-team.png';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { NavBarTop } from '../../components/NavBarTop/NavBarTop';

export  const LoginPage = () =>{

	return(
		<div>
		<NavBarTop/>
		<div className=" pt-5  mt-2 LoginPage">
			<div className='col-4 col-md-4  form-section border p-4 bg-white container  '>
				<LoginForm />
			</div>
			{/* <div className='col-12 col-md-7'>
			<img src={TeamImg} alt='team' className='img-fluid' />
			</div> */}
		</div>
		</div>
		
	)

}