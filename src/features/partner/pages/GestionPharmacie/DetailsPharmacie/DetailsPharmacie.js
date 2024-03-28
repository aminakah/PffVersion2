import React,{useState,useEffect} from 'react'
import { SideNavBarPro } from '../../../../common/components/SideNavBarPro/SideNavBarPro'
// import { Link } from 'react-router-dom'
import { useNavigate, useParams, Link } from "react-router-dom";

import { UserService } from '../../../../../services/user.service'
import { ProprietaireService } from '../../../../../services/propretaire.service';
import { BASE_URL } from '../../../../../constants/app-constant';

function DetailsDeMaPharmacies() {
  
  const { id } = useParams();

  const [pharmacieDetails, setPharmacieDetails] = useState({});
  const [horaires, setHoraires] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [medicament, setMedicaments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [pharmacie, setPharmacie] = useState([]);

  useEffect(() => {
    listerHorairesPharmacies();
    loadCategoriesList();
    loadMedicaments();
	listAgent();
    if (id) {
      ProprietaireService.detailsPharmacie(id)
        .then((response) => {
          console.log(response.data);
          setPharmacieDetails(response.data.pharmacie || {});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  const listerHorairesPharmacies = () => {
    ProprietaireService.listehoraire(id)
      .then(response => {
        console.log(response.data)
        const horaireData = response.data.horaires;

        if (Array.isArray(horaireData)) {
          setHoraires(horaireData);
        } else if (horaireData) {
          // Si c'est un objet unique, transformez-le en un tableau
          setHoraires([horaireData]);
        } else {
          console.error("Les données horaires ne sont pas valides :", horaireData);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const loadCategoriesList = () => {
    ProprietaireService.listeCategorie(id)
      .then(response => {
        setCategorie(response.data.categories);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
 
  const   loadMedicaments = () => {
    ProprietaireService.listeMedicament(id)
    .then(response => {
      setMedicaments(response.data.produits);
    })
    .catch(error => {
      console.error(error);
    });
    }
	const listAgent=()=>{
		ProprietaireService.ListeAgentParPharmacie(id)
		.then(response => {
			setAgents(response.data.agents_pharmacie);
			console.log(response.data);
		})
		.catch(error => {
		  console.error(error);
		});
	   }
  return (
    <div className="AdminHomePage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarPro />
        <div className='body mx-2 p-2 '>
          <div class=" text-start">
            <div class="row">
              <div class="col-sm-4 col-md-2 pt-2 ">
			  <Link to={'/account/partner/' + UserService.getCurrentUser()?.id + '/listMesPharmacie'}>
              <button className='btn btn-success'> <i className='fa fa-arrow-left'></i> Retour</button> </Link>
			  </div>
			  <div className='col-md-6'>
              <h5 className='text-center p-3'>Page details de la pharmacie :<span className='text-decoration-underline'>{pharmacieDetails.nom}</span></h5>
			  </div>
           	 <div className='col-12 col-md-8  p-3'>
				   <div className='card'>
           <div className='card-header'>Les horaire de :{pharmacieDetails.nom}</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">lundi</th>
						<th scope="col">Mardi</th>
						<th scope="col">Mercredi</th>
						<th scope="col">Jeudi</th>
						<th scope="col">vendredi</th>
						<th scope="col">Samedi</th>
						<th scope="col">Dimanche</th>
						<th scope="col">En garde </th>
						</tr>
					</thead>
					<tbody>
						{horaires.map((horaire) =><tr>
							<td>{horaire.j1}</td>
						<td>{horaire.j2}</td>
						<td>{horaire.j3}</td>
						<td>{horaire.j4}</td>
						<td>{horaire.j5}</td>
						<td>{horaire.j6}</td>
						<td>{horaire.j7}</td>
            <td>{horaire.status===1?<span className="btn btn-primary"> en garde</span>: <span className="btn btn-danger"> Non en garde</span>}</td>
						
							{/* <td>{c.status == 0 ?"actif":"inactif"}</td> */}

						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
			 </div>
			 <div className='col-12 col-md-4 p-3'>
				   <div className='card'>
                  <div className='card-header'> La Liste Des Agents De la Pharmacie:<span className='text-decoration-underline'>{pharmacieDetails.nom}</span></div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Prenom</th>
						<th scope="col">nom</th>
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

						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
			 </div>
            </div>
          </div>
          <div className='row '>
		  		<div className='col-12 col-md-8'>
				   <div className='card'>
                  <div className='card-header'>Les medicaments</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Image</th>
						<th scope="col">nom</th>
						<th scope="col">Categorie</th>
						<th scope="col">Prix</th>
						<th scope="col">Telephone </th>

						</tr>
					</thead>
					<tbody>
						{medicament.map((c) =><tr>
              <td>
                <img width={40} height={40} src={`${BASE_URL}/images/${c.photo}`}  alt={c.photo}/>
              </td>
							<th>{c.nom}</th>
							<th>{c.categorie.nom}</th>
							<td>{c.prix}</td>
							<td>{c.telephone}</td>

						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
			    </div>
				<div className='col-12 col-md-4'>
				   <div className='card'>
                  <div className='card-header'>La Liste Des Categories</div>
				  <div className='card-body'>
				  <table class="table">
					<thead>
						<tr>
						<th scope="col">Nom</th>
						<th scope="col">Description</th>

						</tr>
					</thead>
					<tbody>
						{categorie.map((c) =><tr>
							<th>{c.nom}</th>
							<td>{c.description}</td>

						</tr>)}
					</tbody>
					</table>
				  </div>
			   </div>
			    </div>
        		
          		
	      	</div>
          
		  <div>
		  
		  </div>
        </div>
      </div>
    </div>
  );
  
}





export default DetailsDeMaPharmacies

