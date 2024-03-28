import React, { useState } from 'react';
import './SideNavBarPro.css';
import LogoImg from '../../../../assets/logo.svg';
import Logo from '../../../../assets/images/logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

export const SideNavBarPro = () => {
	const navigate = useNavigate();
	const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));

	return(
		<div className="SideNavBarPro">
				<div className='p-4 text-left border-bottom d-flex justify-content-start align-items-center'>
					<div>
						<Link className='link' to={'/'} >
						<img src={LogoImg} height={50} alt='Logo' />
						</Link>
					</div>
				
					

				</div>
			<div className='p-3'>
				<ul className='list-unstyled'>
				   <Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id} >
					<li className='mt-2 p-2'>
							{/* <img src={HomeImg} alt='account' /> */}
							<i className='fa fa-home'></i>
							<span className='ms-2'>Tableau de bord</span>
					</li>
					</Link>
					<Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listMesPharmacie'}>
					<li className='mt-2 p-2'>
							{/* <img src={PropImg} alt='account' /> */}
							<i className='fa fa-medkit'></i>

							<span className='ms-2'>Gestion pharmacie</span>
					</li>
					</Link>

					<Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listAgentPharmacie'}>
					<li className='mt-2 p-2'>
						<i className='fa fa-user'></i>
							{/* <img src={AccountImg} alt='account' /> */}
							<span className='ms-2'>Gestion Agents</span>
					</li>
					</Link>

					<Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listMedicament'}>
					<li className='mt-2 p-2'>
						<i className='fa fa-pills'></i>
							{/* <img src={PropImg} alt='account' /> */}
							<span className='ms-2'>Gestion medicaments</span>
					</li>
					</Link>

					<Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listeCategorie'}>

					<li className='mt-2 p-2'>
							{/* <img src={PropImg} alt='account' /> */}
							<i className='fa fa-tags'></i>
							<span className='ms-2'>Gestion Categorie</span>
					</li>
					</Link>

					<Link className='link' to={'/account/partner/'+UserService.getCurrentUser()?.id+'/listehoraire'}>
					<li className='mt-2 p-2'>
							{/* <img src={PropImg} alt='account' /> */}
							<i className='fa fa-clock'></i>

							<span className='ms-2'>Gestion Horaire</span>
					</li>
					</Link>

					{pharmacie && 
					<Link className='link' to={'/chat/'+pharmacie.id} >
					<li className='mt-2 p-2 mb-2'>
							{/* <img src={SimpleImg} alt='User' /> */}
							<i className='fa fa-comment'></i>

							<span className='ms-2'>Chat</span>
					</li>
					</Link>}


				</ul>
			</div>

			<div className='p-3 BottomSection w-100 mt-5'>
				<ul className='list-unstyled w-100'>
				<li className='mt-2 p-2'>
					   <Link className='link' to={''} >
							<i className='fa fa-user-circle'></i>
							<span className='ms-2'>{UserService.getCurrentUser()?.profile}</span>
					   </Link>
					</li>
					<li className='mt-2 p-2 link' onClick={() => AuthService.logout(navigate)}>
						{/* <img src={LogoutImg} alt='logout' /> */}
						<i className='fa fa-sign-out-alt'></i>

						<span className='ms-2 '>Déconnexion</span>
					</li>
				</ul>
			</div>
		</div>
	)
	
}