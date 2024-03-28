import React from 'react';
import './GestionPropPage.css';
import { Link } from 'react-router-dom';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';
import { UserService } from '../../../../services/user.service';
import { ProprietaireList } from '../../components/ProprietaireList/ProprietaireList';


export const GestionPropPage = () => {

	return(
		<div className="GestionPropPage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBar/>
			  <div className='body mx-3 p-4'>
				 <div className='mb-5 d-flex justify-content-between'>
					<h2>Liste des proprietaires de pharmacie</h2>
					<Link to={'/account/admin/'+ UserService.getCurrentUser()?.id +'/add/prop'}>
						<button className='btn btn-success'>Ajouter poprietaire</button>
					</Link>
				 </div>
				<ProprietaireList/>
			  </div>
			</div>
		</div>
	)
	
}
