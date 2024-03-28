import React, { useEffect, useState } from 'react';

import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
import { Link } from 'react-router-dom';
import { UserService } from '../../../../../services/user.service';
import { ProprietaireService } from '../../../../../services/propretaire.service';
import ChoixPharmacie from '../../../../common/components/choixPharmacie/choixPharmacie'

function ListeAgent() {
	const [agents, setAgent] = useState([{}]);
	const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));
	
	  useEffect(() => {
	   ProprietaireService.ListeAgentParPharmacie(pharmacie?.id)
		  .then(response => {
			  setAgent(response.data.agents_pharmacie);
			  console.log(response.data);
		  })
		  .catch(error => {
			console.error(error);
		  });
	  }, []);

	  const handleBloquerDebloquer = async (agentId) => {
		try {
		  const response = await ProprietaireService.bloquerAgentPharmacie(agentId);
		  ProprietaireService.listeAgentPharmacie().then(response => setAgent(response.data.items));
		  console.log(response);
		} catch (error) {
		  console.error(error);
		}
	  };
	
	  if (agents === null) {
		// Loading state, you can render a loading spinner or message
		return <p>En chargement...</p>;
	  }
  return (
    <div className="GestionPropPage container-fluid p-0 m-0">
			<div className='d-flex'>
              <SideNavBarPro />
			 <div className='body mx-3 p-4'>
			   <ChoixPharmacie /> 
			   { pharmacie !== null ?  
				<div>
				 <div className='mb-5 d-flex justify-content-between'>
					<h2 className='titre'>Liste des agents de la pharmacie:<span className='majuscule '> {pharmacie.nom}</span> </h2>
					<Link to={'/account/partner/'+ UserService.getCurrentUser()?.id +'/AjoutAgentPharmacie'}>
						<button className='btn btn-success'>  <i className='fa fa-plus'></i>Ajouter un agent</button>
					</Link>
				 </div>
				 <div className="ProprietaireList">
				<table className="table">
					<thead>
					<tr>
						<th scope="col">Nom</th>
						<th scope="col">Prénom</th>
						<th scope="col">Email</th>
						<th scope="col">Adresse</th>
						<th scope="col">Téléphone</th>
						<th>Etat</th>
						<th scope="col">Actions</th>
					</tr>
					</thead>
					<tbody>
					{agents.map(agent => (
						<tr key={agent.id}>
						<td>{agent.nom}</td>
						<td>{agent.prenom}</td>
						<td>{agent.email}</td>
						<td>{agent.adresse}</td>
						<td>{agent.telephone}</td>
						<td>{agent.status == 0 ?"actif":"inactif"}</td>
						<td>
						{agent.status==0?<button onClick={() => handleBloquerDebloquer(agent.id)} className="btn btn-primary">Bloquer</button >:<button onClick={() => handleBloquerDebloquer(agent.id)}className="btn btn-danger">Debloquer</button>}
						<a className="btn btn-outline-success mx-1  "> <i className='fa fa-edit '></i></a>
						</td>
						</tr>
					))}
					</tbody>
				</table>
				</div>
				</div> : null }
			  </div>
			</div>
		</div>
  )
}

export default ListeAgent