import api  from './api';


const getListPharmacie = () =>{
 return api.get('/pharmacie');
}
const getListRegion = () =>{
    return api.get('/public/listeRegions');
   }

const listeProprietaires = () =>{
    return api.get('/listeProprietaires');
   }
   const listeClient = () =>{
    return api.get('/admin/listeClient');
   }
   

const detailsPharmacie=(id)=>{
    return api.get(`/public/detailsPharmacie/${id}`)
       
   }
   const detailsPharmacies=(id)=>{
    return api.get(`/pharmacie/detailsPharmacie/${id}`)
       
   }

const listePublicAgentsPharmacie = (id) => {
 return api.get(`/public/agentsPharmacies/${id}`);
}

const getPublicPharmacieHoraires = (id) =>{
 return api.get(`/public/horairesPharmacie/${id}`);

}

const filtrePharmacieParRegion = (id) =>{
    return api.get(`/public/regions/${id}`);
   }

const nombrePropretairePharmacie = () => {
    return api.get(`/admin/nombreProprietaires`);
   }
const nombreClient = () => {
    return api.get(`/admin/nombreClients`);
   }   
   const pharmaciesDeGarde = () => {
    return api.get(`public/PharmaciesDeGarde`);
   }
const rechercherPharmacie = (nom) => {
    console.log(nom)
    return api.get(`public/rechercherPharmacie?nom=${nom}`);
   }
   const getListDepartements = (idRegion) =>{
    return api.get(`/admin/listerDepartements/${idRegion}`);
   }
export const  PharmacieService = {
 getListPharmacie,detailsPharmacie,listeProprietaires,getListRegion,
 listePublicAgentsPharmacie,getPublicPharmacieHoraires,
 filtrePharmacieParRegion,getListDepartements,
 nombrePropretairePharmacie,nombreClient,listeClient,detailsPharmacies,pharmaciesDeGarde,rechercherPharmacie

}