
import React, { useEffect, useState } from 'react';
// import './PartnerHomePage.css';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { SideNavBar } from '../../../common/components/SideNavBar/SideNavBar';
import { UserService } from '../../../../services/user.service';
import { ProprietaireList } from '../../components/ProprietaireList/ProprietaireList';
import { Link } from 'react-router-dom';

export const  AdminHomePage = () => {

	

	const [proprietaires, setProprietaires] = useState([]);
	const [client, setClient] = useState([]);
	const [nombreProprietaires, setNombreProprietaires] = useState({
		status_code: null,
		status_message: '',
		nombre_proprietaires: null,
	  });
	  const [nombreClients, setNombreClients] = useState({
		status_code: null,
		status_message: '',
		nombre_clients: null,
	  });
	
	
	useEffect(() => {
		listeProprietaires();
		   nombrePropretaire();
		   nombreClient();
		   listeClient();
	   }, []);

	const nombrePropretaire=()=>{
		PharmacieService.nombrePropretairePharmacie()
		.then(response => {
			setNombreProprietaires(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
	const nombreClient=()=>{
		PharmacieService.nombreClient()
		.then(response => {
			setNombreClients(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
	const listeProprietaires=()=>{
		UserService.getProprietaires()
		   .then(response => {
			   setProprietaires(response.data.proprietaires);
			   console.log(response.data.proprietaires);
		   })
		   .catch(error => {
			 console.error(error);
		   });
	}
	const listeClient=()=>{
		PharmacieService.listeClient()
		   .then(response => {
			setClient(response.data.client);
			   console.log(response.data.client);
		   })
		   .catch(error => {
			 console.error(error);
		   });
	}
	return(
		
		<div className="GestionPropPage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBar/>
			  <div className='body mx-3 p-4'>
				 <div className='mb-5 d-flex justify-content-between'>
					<h2>Liste des proprietaires de pharmacie</h2>
					<Link to={'/account/admin/'+ UserService.getCurrentUser()?.id +'/add/prop'}>
						<button className='btn btn-success'> <i className='fa fa-plus'></i>Ajouter poprietaire</button>
					</Link>
				 </div>
				<ProprietaireList/>
			  </div>
			</div>
		</div>
	)
	
}