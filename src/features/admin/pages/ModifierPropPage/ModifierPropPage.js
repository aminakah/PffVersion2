import React from 'react';
import './AddPropPage.css';
import { Link } from 'react-router-dom';
import { UserService } from '../../../../services/user.service';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';


export const ModifierPropPage =  () => {

	return  (<div className="AdminHomePage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBar/>
			  <div className='body mx-3 p-4'>
				 <div className='mb-5 d-flex justify-content-between px-5'>
					<h2>Modifier un propriétaire de pharmacie</h2>
					<Link to={'/account/admin/'+UserService.getCurrentUser()?.id+'/gestion/prop'}>
					 <button className='btn btn-outline-dark'>Voir la liste</button>
					</Link>
				 </div>
				 <div className='px-5'>
					
				   <ModifierPropPage/>
				 </div>
			  </div>
			</div>
		</div>)
}