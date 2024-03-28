import React, { useEffect, useState } from 'react';
import './PartnerHomePage.css';
import { SideNavBarPro } from '../../../common/components/SideNavBarPro/SideNavBarPro';
import { ProprietaireService } from '../../../../services/propretaire.service';
import ChoixPharmacie from '../../../common/components/choixPharmacie/choixPharmacie';

export const  PartnerHomePage = () => {

	

	const [pharmacies, setPharmacies] = useState([]);
	const [agents, setAgents] = useState([]);
	const [medicaments, setMedicaments] = useState([]);
	const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));

	  const [nomMedicament, setNomMedicament] = useState({
		status_code: null,
		status_message: '',
		nombre_medicaments_pharmacie: null,
	  });
	  const [nompharmacies, setNomPharmacies] = useState({
		status_code: null,
		status_message: '',
		nombre_medicaments_total: '',
	  });
	  const [nombAgent, setNombAgent] = useState({
		status_code: null,
		status_message: '',
		nombre_medicaments_total: '',
	  });
	
	 
	
	useEffect(() => {
     listMesPharmacie();
     nombrePharmacie();
	 nomMedicaments();
	 nombreAgent();
	 listAgent();
	}, [])


	const listMesPharmacie=()=>{
		ProprietaireService.listMesPharmacie()
		.then(response => {
			setPharmacies(response.data.data);
			// console.log(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
	   const listAgent=()=>{
		ProprietaireService.ListeAgentParPharmacie(pharmacie?.id)
		.then(response => {
			setAgents(response.data.agents_pharmacie);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
	   const listMedicaments=()=>{
		ProprietaireService.listeMedicament()
		.then(response => {
			setPharmacies(response.data.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
	   const nombrePharmacie=()=>{
		ProprietaireService.nombrePharmacie()
		.then(response => {
			setNomPharmacies(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }

	   const nomMedicaments=()=>{
		ProprietaireService.nombreMedicamet(pharmacie?.id)
		.then(response => {
			setNomMedicament(response.data);
			console.log(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }

	 
	   const nombreAgent = () => {
		ProprietaireService.nombreAgent(pharmacie?.id)
		  .then(response => {
			setNombAgent(response.data);
			console.log(response.data);
		  })
		  .catch(error => {
			console.error(error);
		  });
	  };

	return(
		<div className="PartnerHomePage container-fluid p-0 m-0">
		<div className='d-flex'>
		  <SideNavBarPro />
		  <div className='body mx-3 p-4'>
                <div className='row'>
			   <ChoixPharmacie /> 
				   {nompharmacies.status_code !== null && (
       				 <>
					<div className='col-12 col-md-4'>
				 	  <div className='card card-body card-info  bg-danger'>
						   <h1>Nombre de pharmacies </h1>
						    <p className='nb'>{nompharmacies.nombre_pharmacies}</p>
						</div>
				   </div>
					</>
					)}
					{nombAgent.status_code !== null && (
       				 <>
					<div className='col-12 col-md-4'>
				 	  <div className='card card-body card-info  bg-primary'>
						   <h1>Nombre d'agent de la pharmacie :  {pharmacie?.nom}</h1>
						    <p className='nb'>{nombAgent.nombre_agents_pharmacie}</p>
						</div>
				   </div>
					</>
					)}
					{nomMedicament.status_code !== null && (
       				 <>
					<div className='col-12 col-md-4'>
				 	  <div className='card card-body card-info  bg-warning'>
						   <h1>Nombre de médicaments: {pharmacie?.nom}</h1>
						    <p className='nb'>{nomMedicament.nombre_medicaments_pharmacie}</p>
						</div>
				   </div>
						</>
					)}
				</div>
			 <div className=' mt-5 commandes'>
				<div className='row'>
                   <div className='col-12 col-md-7'>
				   <div className='card'>
                  <div className='card-header'>Mes pharmacies</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Image</th>
						<th scope="col">Nom</th>
						<th scope="col">Adresse</th>
						<th scope="col">Telephone </th>
						<th scope="col">Quartier</th>
						</tr>
					</thead>
					<tbody>
						{pharmacies.map((c) =><tr>
							<th><img style={{width: 40,height:40}} src={"http://localhost:8000/images/"+c.photo} className=" imagePharmaci" alt={c.nom}></img></th>
							<th>{c.nom}</th>
							<td>{c.adresse}</td>
							<td>{c.telephone}</td>
							<td>{c.quartier.nom}</td>
						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
				   </div>
				   <div className='col-12 col-md-5'>
				   <div className='card'>
                  <div className='card-header'>Mes Agents de pharmacie</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Prenom</th>
						<th scope="col">Nom</th>
						<th scope="col">Adresse</th>
						<th scope="col">Telephone </th>
						</tr>
					</thead>
					<tbody>
						{agents.map((c) =><tr>
							<th>{c.prenom}</th>
							<th>{c.nom}</th>
							<td>{c.adresse}</td>
							<td>{c.telephone}</td>
							{/* <td>{c.status == 0 ?"actif":"inactif"}</td> */}

						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
				   </div>
				</div>
			 </div>
		  </div>
		</div>
	</div>
	)
	
}