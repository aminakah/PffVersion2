import React, { useEffect, useState } from 'react';

import './PageDetPharmacie.css';
import ButtonMenu from "../../../common/components/button-menu-pharmacie/Button";
import { MedicamentList } from "../../components/MedicamentList/MedicamentList";
import { Horraire } from "../../components/Horraire/Horraire";
import { ContactList } from "../../components/ContactList/ContactList";
import { NavBarTop } from "../../../common/components/NavBarTop/NavBarTop";
import { Link, useParams } from "react-router-dom";
 import { PharmacieService } from "../../../../services/pharmacie.service";
import { Localisation } from '../../components/Localisation/Localisation';
import RechercheMedicament from '../../../common/components/Recherche/RechercheMedicament';
import { Widget, addResponseMessage } from 'react-chat-widget';
import ChatBox from '../../../common/components/ChatBox/ChatBox';

function PageDetailsPharmacie() {
  
  const param = useParams();
  const [tab, setTab] = useState(1);
  const [pharmacie, setPharmacie]=useState(null);
  const [currentUser, setCurrentUser]=useState(JSON.parse(localStorage.getItem('user')));

 useEffect(() =>
  {
 	   PharmacieService.detailsPharmacie(param.id)
 		  .then(response => {
 			  setPharmacie(response.data.pharmacie);
         addResponseMessage('Welcome to this **awesome** chat!');

		  })
		  .catch(error => {
			console.error(error);
		  });
  }, []);

 const handletabSelect = (tab) =>
 {
   setTab(tab);
 }

 const handleNewUserMessage = (newMessage) => {
  console.log(`New message incoming! ${newMessage}`);
  // Now send the message throught the backend API
};

  return (
    <>
   <div>{ pharmacie !== null ? 
      <div className="container-fluid p-0 m-0">
        <NavBarTop />
        <div className=' section container-fluid p-0 m-0 pt-5'>
          <div className='nomPharmacie text-center pt-5 text-white'>
            <h1>{pharmacie.nom}</h1>
          <Link to={`/`} className='retour'>RETOUR</Link>

            </div>
          <div className="buttons">
          <ButtonMenu onSelectTab={handletabSelect}></ButtonMenu>
          </div>
        </div>
        <div className="details-section container bg-white p-4">
          { tab === 1 ?   <MedicamentList pharmacie={pharmacie} />  : null}
          { tab === 2 ?    <ContactList    pharmacie={pharmacie} /> : null}
          { tab === 3 ?    <Horraire       pharmacie={pharmacie} /> : null}
          { tab === 4 ?    <Localisation   pharmacie={pharmacie} /> : null}
        </div>
      </div>: 
      <div>Loading ....</div>}

    </div> 
    {pharmacie  && <ChatBox pharmacie={pharmacie} currentUser={currentUser} />}
    </>
  )
}

export default PageDetailsPharmacie;