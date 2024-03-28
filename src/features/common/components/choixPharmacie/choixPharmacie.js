import React, { useEffect, useState } from 'react';
import './choixPharmacie.css';
import { BASE_URL } from '../../../../constants/app-constant';
import { ProprietaireService } from '../../../../services/propretaire.service';


 const ChoixPharmacie = () => {

	const [pharmacies, setPharmacies] = useState([]);
	const [pharmacie, setPharmacie] = useState(JSON.parse(localStorage.getItem('pharmacie')));


	useEffect(() => {
		
		ProprietaireService.listMesPharmacie()
		  .then(response => {
			setPharmacies(response.data.data);
			if(response.data.data?.length === 1 || localStorage.getItem('pharmacie') === null){
              onSelect(response.data.data[0]);
			}
		  })
		  .catch(error => {
			console.error(error);
		  });
	  }, []);


	const  onSelect = (pharmacie) => {
		setPharmacie(pharmacie);
         localStorage.setItem('pharmacie', JSON.stringify(pharmacie));
		 window.location.reload();
	  }
	const onChange = (pharmacie) => {
		localStorage.setItem('pharmacie',pharmacie);
		setPharmacie(JSON.parse(pharmacie));
		window.location.reload();
	}

	return(
		 
		<div className="choix-pharmacie p-1 mb-3">
			 
			<div className='card card-body d-flex justify-content-between'>
			  <div className='row'>
				<div className='col-9'><h4>{pharmacie?.nom} </h4></div>
				<div className='col-3'>
					<select className='form-control' onChange={(e) => onChange(e.target.value)} >
						{pharmacies.map((phar) => <option value={JSON.stringify(phar)} selected={pharmacie?.id === phar?.id} >{phar?.nom}</option>)}
				    </select>
				</div>
				</div>	
              
			  
			</div>
			{/* {pharmacie === null ?  
			<div className='container p-5'>
				<h4>Choisir une pharmacie</h4>
               <div className='row'>
                   {pharmacies.map((phar) => 
				   <div className='col-12 col-md-3'>
                       <div className='card' onClick={() => onSelect(phar)}>
                         <div className='card-header'>
							<img  src={BASE_URL+'/images/'+phar?.photo} alt={phar?.name} className='img-fluid' />
						 </div>
						 <div className='card-body'>
                           <p>{phar?.nom}</p>
						</div>
					   </div>
				   </div>)}
			   </div>
			</div> : null} */}
		</div>
	)

}

export default ChoixPharmacie;