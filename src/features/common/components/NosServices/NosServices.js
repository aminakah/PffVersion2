import React from 'react';
import './NosServices.css'

const  NosServices = () => {
  return (
   <div className='service p-5'>
     <div className='  mt-2 mx-5' >
     

     <h1 className='text-center mt-5 color text-decorationn-underline '>Nos Services</h1>
 <div class="row descripton">
 <div class="col-md-4 col-sm-6">
     <div class="serviceBox">
         <div class="service-icon">
             <span><i class="fa fa-globe"></i></span>
         </div>
         <h3 class="title">Recherche de Pharmacies</h3>
         <p class="description">Localisez instantanément les pharmacies les plus proches de vous, où que vous soyez, grâce à notre outil de géolocalisation précis.</p>
     </div>
 </div>
 <div class="col-md-4 col-sm-6">
     <div class="serviceBox pink">
         <div class="service-icon">
             <span><i class="fa fa-user-md" aria-hidden="true"></i></span>
         </div>
         <h3 class="title">Pharmacies de Garde</h3>
         <p class="description">Accédez à une liste actualisée des pharmacies de garde afin de répondre à vos besoins en dehors des heures d'ouverture habituelles.</p>
     </div>
 </div>
 
 <div class="col-md-4 col-sm-6">
     <div class="serviceBox purple">
         <div class="service-icon">
             <span><i class="fa fa-medkit" aria-hidden="true"></i></span>
         </div>
         <h3 class="title">Disponibilité des Médicaments</h3>
         <p class="description">
          Vérifiez en temps réel la disponibilité des médicaments dans les pharmacies à proximité, pour une gestion efficace de votre traitement.
         </p>
     </div>
 </div>
 </div>
 </div>
   </div>
     
  )
}

export default NosServices