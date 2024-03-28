import React, { Component, useEffect, useState } from 'react';
import './Horraire.css';
import { PharmacieService } from '../../../../services/pharmacie.service';

export const Horraire = (props) => {

	const [horaires, setHoraires] = useState([]);


	useEffect(() => {
		PharmacieService.getPublicPharmacieHoraires(props.pharmacie.id)
		.then((response) =>{
			setHoraires(response?.data?.horaires);
		})
		.catch(error => console.log(error))

	},[])
	if(horaires.length === 0){
		return<h2 className='color text-center'>Il n'a pas d'horaires disponible dans cette pharmacie ...</h2>

	   }
	
		return(
			<div className="Horraire">
			 <ul class="list-group">
				{horaires.map((h) =><div>
					{/* <div>{h.status}</div> */}
					{h.status==0?<h1 className="text-danger">EN GARDE</h1 >:<h1 className="text-success">PAS EN GARDE</h1>}

				<li class="list-group-item">
                   <span>Lundi</span>
                   <span className='ms-5'>{h.j1}</span>
				</li>
				<li class="list-group-item">
                   <span>Mardi</span>
                   <span className='ms-5'>{h.j2}</span>
				</li>
				<li class="list-group-item">
                   <span>Mercredi</span>
                   <span className='ms-5'>{h.j3}</span>
				</li>
				<li class="list-group-item">
                   <span>Jeudi</span>
                   <span className='ms-5'>{h.j4}</span>
				</li>
				<li class="list-group-item">
                   <span>Vendredi</span>
                   <span className='ms-5'>{h.j5}</span>
				</li>
				<li class="list-group-item">
                   <span>Samedi</span>
                   <span className='ms-5'>{h.j6}</span>
				</li>
				<li class="list-group-item">
                   <span>Dimance</span>
                   <span className='ms-5'>{h.j7}</span>
				</li>
				{/* {h.status == 0 ?<h1 className='text-danger'>La pharmacie n'est pas en garde aujourd'hui.<h1/>:<h1>La pharmacie est en garde aujourd'hui.</h1>} */}

				</div>
				)}
			</ul>
			</div>
		)

}