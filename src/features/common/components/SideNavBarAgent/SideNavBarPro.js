import React from 'react';
import './SideNavBarPro.css';
import LogoImg from '../../../../assets/images/logo.png';
import AccountImg from '../../../../assets/account.svg';
import HomeImg from '../../../../assets/home.svg';
import LogoutImg from '../../../../assets/logout.svg';
import ProfileImg from '../../../../assets/profile.svg';
import PropImg from '../../../../assets/prop.svg';
import SimpleImg from '../../../../assets/simple.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';

export const SideNavBarAgent = () => {
	const navigate = useNavigate();

	return(
		<div className="SideNavBarPro">
			<div className='p-4 text-left border-bottom'>
			<Link className='link' to={'/'} >
						<img src={LogoImg} height={50} alt='Logo' />
						</Link>
			</div>
			<div className='p-3'>
				<ul className='list-unstyled'>
					<li className='mt-2 p-2'>
						<Link className='link font' to={'/account/agent/'+UserService.getCurrentUser()?.id} >
							<i className='fa fa-home'></i>
							<span className='ms-2'>Tableau de bord</span>
						</Link>
					</li>
					
					
					<li className='mt-2 p-2'>
						<Link className='link' to={'/account/agent/'+UserService.getCurrentUser()?.id+'/listMedicament'}>
							<i className='fa fa-pills'></i>
							<span className='ms-2'>Gestion Medicaments</span>
						</Link>
					</li>
					<li className='mt-2 p-2'>
						<Link className='link' to={'/account/agent/'+UserService.getCurrentUser()?.id+'/listeCategorie'}>
							<i className='fa fa-tags'></i>
							<span className='ms-2'>Gestion Categories</span>
						</Link>
					</li>
					<li className='mt-2 p-2'>
						<Link className='link' to={''} >
							<i className='fa fa-comment'></i>
							<span className='ms-2'>Chat</span>
						</Link>
					</li>
				</ul>
			</div>

			<div className='p-3 BottomSection w-100'>
				<ul className='list-unstyled w-100'>
					<li className='mt-2 p-2'>
					   <Link className='link' to={''} >
							<i className='fa fa-user-circle'></i>
							<span className='ms-2'>{UserService.getCurrentUser()?.prenom}/agent</span>
					   </Link>
					</li>
					<li className='mt-2 p-2 link' onClick={() => AuthService.logout(navigate)}>
						<i className='fa fa-sign-out-alt'></i>
						<span className='ms-2 '>Déconnexion</span>
					</li>
				</ul>
			</div>
		</div>
	)
	
}