import React from 'react';
import './Apropos.css';
import img from '../../../../assets/images/about.jpg'

const Apropos = () => {
	return (

		<div className='session '>

		<div className='mt-5'>
			<h1 className='text-center m-4 apropos'>A propos de nous</h1>

			<div className='row'>
				<div className='col-6'>
					<img src={img} alt='about' className='img-fluid' style={{ height: '430px', width: "100%" }} />
				</div>
				<div className='col-6 px-5'>
					{/* <h4 className='text-left'>A propos de nous</h4> */}
					<h5 className='mt-3'>Des médicaments à votre portée, où que vous soyez. Senpharmacie vous rend la vie plus facile.</h5>
					<p class=" text-left mt-5">
						Senpharmacie est née de la volonté de faciliter l'accès aux services pharmaceutiques essentiels. Notre application web a été conçue pour simplifier la recherche de pharmacies à proximité, qu'elles soient ouvertes ou en service de garde, offrant ainsi une solution pratique pour répondre aux besoins de santé urgents. Notre mission est d'offrir aux utilisateurs un accès transparent et rapide aux informations concernant les pharmacies et la disponibilité des médicaments, améliorant ainsi leur accès aux soins de santé. Chez Senpharmacie, nous nous engageons à fournir un service fiable et à contribuer à la santé et au bien-être de nos utilisateurs, en rendant la recherche de soins pharmaceutiques plus efficace et accessible
					</p>
				</div>
			</div>
		</div>
	
		</div>

	)
}

export default Apropos