import React from 'react';
import './SideNavBar.css';
import Logo from '../../../../assets/logo.svg';
import AccountImg from '../../../../assets/account.svg';
import HomeImg from '../../../../assets/home.svg';
import LogoutImg from '../../../../assets/logout.svg';
import ProfileImg from '../../../../assets/profile.svg';
import PropImg from '../../../../assets/prop.svg';
import SimpleImg from '../../../../assets/simple.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';


export const SideNavBar = () => {
	const navigate = useNavigate();

	return(
		<div className="SideNavBar">
			<div className='p-4 text-left border-bottom'>
			<Link className='link' to={'/'} >
						<img src={Logo} height={60} alt='Logo' />
						</Link>

			</div>
			<div className='p-3'>
				<ul className='list-unstyled'>
					<li className='mt-2 p-2'>
						<Link className='link' to={'/account/admin/'+UserService.getCurrentUser()?.id} >
							<i className='fa fa-home'></i>
							<span className='ms-2'>Gestion proprietaire</span>
						</Link>
					</li>
					
					
					
					{/* <li className='mt-2 p-2'>
						<Link className='link' to={'/account/admin/'+UserService.getCurrentUser()?.id+'/region'}>
							<i className='fa fa-map'></i>
							<span className='ms-2'>Gestion Region</span>
						</Link>
					</li> */}
					{/* <li className='mt-2 p-2'>
						<Link className='link' to={'/account/admin/'+UserService.getCurrentUser()?.id+'/departement'}>
							<i className='fa fa-globe'></i>

							<span className='ms-2'>Gestion Departement</span>
						</Link>
					</li> */}
					{/* <li className='mt-2 p-2'>
						<Link className='link' to={'/account/admin/'+UserService.getCurrentUser()?.id+'/quartier'}>
							<i className='fa fa-building'></i>

							<span className='ms-2'>Gestion Quartier</span>
						</Link>
					</li> */}
					
					
				</ul>
			</div>

			<div className='p-3 BottomSection w-100'>
				<ul className='list-unstyled w-100'>
				<li className='mt-2 p-2'>
					   <Link className='link' to={''} >
							<i className='fa fa-user-circle'></i>
							<span className='ms-2'>{UserService.getCurrentUser()?.prenom}/{UserService.getCurrentUser()?.profile}</span>

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