import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { GuardedRoute } from './helper/GuardedRoute';
import { ClientHomePage } from './features/client/pages/ClientHomePage/ClientHomePage';
import { LoginPage } from './features/common/pages/LoginPage/LoginPage';
import { RegisterPage } from './features/common/pages/RegisterPage/RegisterPage';
import {ChatPage} from './features/common/pages/ChatPage/ChatPage';
import { AddPropPage } from './features/admin/pages/AddPropPage/AddPropPage';
import { AdminHomePage } from './features/admin/pages/AdminHomePage/AdminHomePage';
// import { GestionPropPage } from './features/admin/pages/GestionPropPage/GestionPropPage';
import { GestionPropPage } from './features/admin/pages/GestionPropPage/GestionPropPage';

import PageDetailsPharmacie from './features/client/pages/PageDetailsPharmacie/PageDetPharmacie';
import { PartnerHomePage } from './features/partner/pages/PartnerHomePage/PartnerHomePage';
import ListePharmacie from './features/partner/pages/GestionPharmacie/ListePharmacie/ListePharmacie';
import Listemedicament from './features/partner/pages/GestionMedicament/listeMedicament/Listemedicament';
import ListeCategorie from './features/partner/pages/GestionCategorie/ListeCategorie/ListeCategorie';
import ListeAgent from './features/partner/pages/GestionAgent/ListeAgent/ListeAgent';
import AjouterPharmacie from './features/partner/pages/GestionPharmacie/AjouterPharmacie/AjouterPharmacie';
import ModifierPharmacie from './features/partner/pages/GestionPharmacie/ModifierPharmacie/ModifierPharmacie';
import DetailsDeMaPharmacies from './features/partner/pages/GestionPharmacie/DetailsPharmacie/DetailsPharmacie';
import AjouterMedicament from './features/partner/pages/GestionMedicament/AjouterMedicament/AjouterMedicament';
import ModifierMedicament from './features/partner/pages/GestionMedicament/ModifierMedicament/ModifierMedicament';
import AjouterCategorie from './features/partner/pages/GestionCategorie/AjoutCategorie/AjouterCategorie';
import ModifierCategorie from './features/partner/pages/GestionCategorie/ModifierCategori/ModifierCategorie';
import AjouterAgent from './features/partner/pages/GestionAgent/AjouterAgent/AjouterAgent';
import ListeProduit from './features/AgentPharmacie/pages/gestionProduit/ListeProduit';
import ListeCategories from './features/AgentPharmacie/pages/GestionCategories/ListeCategories';
import { PageHome } from './features/AgentPharmacie/pages/pageHome/PageHome';
import AjouterProduit from './features/AgentPharmacie/pages/gestionProduit/AjouterProduit';
import ModifierProduit from './features/AgentPharmacie/pages/gestionProduit/ModifierProduit';
import AjouterCategories from './features/AgentPharmacie/pages/GestionCategories/AjouterCategories';
import PharmacieGarde from './features/client/pages/pharmacieGarde/PharmacieGarde';
import ListHoraire from './features/partner/pages/gestionHoraire/listHoraire';
import AjouterHoraire from './features/partner/pages/gestionHoraire/AjouterHoraire';
import ListeRegion from './features/admin/pages/gestionRegion/listeRegion';
import ListeDepartement from './features/admin/pages/DepartementQuartier/listeDepartement';
import ListeQuartier from './features/admin/pages/DepartementQuartier/listeQuartier';
import DetailsMedicament from './features/partner/pages/GestionMedicament/listeMedicament/DetailsMedicament';
import PageDetMedica from './features/client/pages/PageDetMedica/PageDetMedica';
import { ContactUs } from './features/common/components/ContactUs/ContactUs';
import NosServices from './features/common/components/NosServices/NosServices';


function App() {
  
  return (
    <Router>
      <div className='container-fluid p-0'>
      <Routes>
        <Route path='/' Component={ClientHomePage} />
        <Route path='/pharmacieEngarde' Component={PharmacieGarde} />
        <Route path='/auth/login' Component={LoginPage} />
        <Route path='/Contact' Component={ContactUs} />
        <Route path='/Services' Component={NosServices} />
        <Route path='/auth/register' Component={RegisterPage} />
        <Route path='/detailsPharmacie/:id' Component={PageDetailsPharmacie} />
        <Route path='/detailsMedicament/:id' Component={PageDetMedica} />

                  {/* ROUTES POUR LE CLIENT */}
        <Route exact path='/account/client/:id'  element={
        <GuardedRoute>
         <ClientHomePage />
        </GuardedRoute>} />
        {/* <Route exact path='/account/client/:id/detailsMedicamet'  element={
        <GuardedRoute>
         <DetailsDeMaPharmacies />
        </GuardedRoute>} /> */}
        <Route path='/pharmacieEngarde' element={
          <GuardedRoute>
            <PharmacieGarde />
          </GuardedRoute>
        } />
        <Route path='/chat/:id' element={
            <GuardedRoute>
            <ChatPage />
            </GuardedRoute>
        } />
                  {/* ROUTES POUR ADMIN  */}
        <Route exact path='/account/admin/:id'  element={
        <GuardedRoute>
         <AdminHomePage />
        </GuardedRoute>} />
        <Route exact path='/account/admin/:id/gestion/prop'  element={
        <GuardedRoute>
         <GestionPropPage />
        </GuardedRoute>} />
        <Route exact path='/account/admin/:id/add/prop'  element={
        <GuardedRoute>
         <AddPropPage />
        </GuardedRoute>} />
        <Route exact path='/account/admin/:id/region'  element={
        <GuardedRoute>
         <ListeRegion />
        </GuardedRoute>} />
        <Route exact path='/account/admin/:id/departement'  element={
        <GuardedRoute>
         <ListeDepartement />
        </GuardedRoute>} />
        <Route exact path='/account/admin/:id/quartier'  element={
        <GuardedRoute>
         <ListeQuartier />
        </GuardedRoute>} />
        
                          {/* ROUTE POUR PROPRETAIRE PHARMACIE */}
        <Route exact path='/account/partner/:id'  element={
        <GuardedRoute>
         <PartnerHomePage />
        </GuardedRoute>} />
          {/* ROUTE PHARMACIE */}
        <Route exact path='/account/partner/:id/listMesPharmacie'  element={
        <GuardedRoute>
         <ListePharmacie />
        </GuardedRoute>} />
        <Route exact path='/account/partner/:id/AjouterPharmacie'  element={
        <GuardedRoute>
         <AjouterPharmacie />
        </GuardedRoute>} />
        <Route exact path='/ModifierPharmacie/:id'  element={
        <GuardedRoute>
         <ModifierPharmacie />
        </GuardedRoute>} />
        <Route exact path='/DetailsDeMaPharmacie/:id'  element={
        <GuardedRoute>
         <DetailsDeMaPharmacies />
        </GuardedRoute>} />
          {/* ROUTE AGENT PHARMACIE */}
        <Route exact path='/account/partner/:id/listAgentPharmacie'  element={
        <GuardedRoute>
         <ListeAgent />
        </GuardedRoute>} />
        <Route exact path='/account/partner/:id/AjoutAgentPharmacie'  element={
        <GuardedRoute>
         <AjouterAgent />
        </GuardedRoute>} />
        
          {/* ROUTE MEDICAMENT */}
        <Route exact path='/account/partner/:id/listMedicament'  element={
        <GuardedRoute>
         <Listemedicament />
        </GuardedRoute>} />
        <Route exact path='/account/partner/:id/AjouterMedicament'  element={
        <GuardedRoute>
         <AjouterMedicament />
        </GuardedRoute>} />
        <Route exact path='/ModifierMedicament/:id'  element={
        <GuardedRoute>
         <ModifierMedicament />
        </GuardedRoute>} />
        <Route exact path='/DetailsMedicament/:id'  element={
        <GuardedRoute>
         <DetailsMedicament />
        </GuardedRoute>} />

        {/* ROUTE  GESTION CATEGORIE */}
        <Route exact path='/account/partner/:id/listeCategorie'  element={
        <GuardedRoute>
         <ListeCategorie />
        </GuardedRoute>} />
        <Route exact path='/account/partner/:id/AjouterCategorie'  element={
        <GuardedRoute>
         <AjouterCategorie />
        </GuardedRoute>} />
        <Route exact path='/ModifierCategorie/:id'  element={
        <GuardedRoute>
         <ModifierCategorie />
        </GuardedRoute>} />

        {/* ROUTES POUR GESTION HORAIRES */}
        <Route exact path='/account/partner/:id/listeHoraire'  element={
        <GuardedRoute>
         <ListHoraire />
        </GuardedRoute>} />

        <Route exact path='/account/partner/:id/AjouterHoraire'  element={
        <GuardedRoute>
         <AjouterHoraire />
        </GuardedRoute>} />
            {/* ROUTES POUR AGENTS */}
       
         <Route exact path='/account/agent/:id'  element={
        <GuardedRoute>
         <PageHome />
        </GuardedRoute>} />
        
        <Route exact path='/account/agent/:id/listeCategorie'  element={
        <GuardedRoute>
         <ListeCategories />
        </GuardedRoute>} />

        <Route exact path='/account/agent/:id/ajouterCategories'  element={
        <GuardedRoute>
         <AjouterCategories />
        </GuardedRoute>} />

        <Route exact path='AgentmodifierCategorie/:id'  element={
        <GuardedRoute>
         <ModifierCategorie />
        </GuardedRoute>} />
        
        <Route exact path='/account/agent/:id/listMedicament'  element={
        <GuardedRoute>
         <ListeProduit />
        </GuardedRoute>} />

        <Route exact path='/account/agent/:id/ajouterProduit'  element={
        <GuardedRoute>
         <AjouterProduit />
        </GuardedRoute>} />

       
        <Route exact path='/account/agent/:id/modifierProduit'  element={
        <GuardedRoute>
         <ModifierProduit />
        </GuardedRoute>} />

       
      </Routes>
      </div>
    </Router>
  );
}

export default App;
