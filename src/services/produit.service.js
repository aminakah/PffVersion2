import api  from './api';


const getPublicListMedicaments = (pharmacieId) =>{
 return api.get(`/public/listerProduits/${pharmacieId}`);
}
const rechercheProduit = (pharmacieId) =>{
    return api.get(`/public/rechercheProduit/${pharmacieId}`);
   }


export const  ProduitService = {
 getPublicListMedicaments,rechercheProduit,
}