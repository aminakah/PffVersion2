import React from 'react';
import './AddPropPage.css';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';
import { AddPropAccountForm } from '../../components/AddPropAccountForm/AddPropAccountForm';


export const AddPropPage =  () => {

	return  (<div className="AdminHomePage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBar />
			  <div className='body mx-3 p-4'>
				 <div className='mb-5 d-flex justify-content-between px-5'>
					<h2>Ajouter un propriétaire de pharmacie</h2>
					{/* <Link to={'/account/admin/'+UserService.getCurrentUser()?.id+'/gestion/prop'}>
					 <button className='btn btn-success'>Voir la liste</button>
					</Link> */}
				 </div>
				 <div className='px-5'>
					
				   <AddPropAccountForm/>
				 </div>
			  </div>
			</div>
		</div>)
}