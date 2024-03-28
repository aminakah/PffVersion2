import React, { useEffect, useState } from 'react';
import './ProprietaireList.css';
import { UserService } from '../../../../services/user.service';

export const ProprietaireList = () => {
  const [proprietaires, setProprietaires] = useState([]);

  useEffect(() => {
   UserService.getProprietaires()
      .then(response => {
          setProprietaires(response.data.proprietaires);
          console.log(response.data.proprietaires);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleBloquerDebloquer = async (agentId) => {
		try {
		  const response = await UserService.bloquerAgentPharmacie(agentId);
		  UserService.getProprietaires().then(response => setProprietaires(response.data.proprietaires));
		  console.log(response.data.proprietaires);
		} catch (error) {
		  console.error(error);
		}
	  };
  if (proprietaires === null) {
    // Loading state, you can render a loading spinner or message
    return <p>En chargement...</p>;
  }

  return (
    <div className="ProprietaireList">
    
      <div className='col-12 col-md-12'>
				   <div className='card'>
                  <div className='card-header'>Les Propritaire de pharmacies</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Prenom</th>
						<th scope="col">Nom</th>
						<th scope="col">Adresse Mail</th>
						<th scope="col">Adresse</th>
						<th scope="col">Telephone</th>
						<th scope="col">Statut </th>
						<th scope="col">Action </th>

						</tr>
					</thead>
					<tbody>
						{proprietaires.map((c) =><tr>
							<th>{c.prenom}</th>
							<th>{c.nom}</th>
							<th>{c.email}</th>
							<td>{c.adresse}</td>
							<td>{c.telephone}</td>
              <td>{c.status == 0 ?"actif":"inactif" }</td>
              <td>
               <a href={`/modifierProPhar/${c.id}`} className="btn btn-outline-success mx-2 "> <i className='fa fa-edit'></i></a>

                 {c.status==0?<button onClick={() => handleBloquerDebloquer(c.id)}className="btn btn-outline-primary">bloquer</button >:<button onClick={() => handleBloquerDebloquer(c.id)}className="btn btn-outline-danger">debloquer</button>}
			        </td>
						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
			</div>
    </div>
  );
};
