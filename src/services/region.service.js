import api  from './api';

//region
const getListRegion = () =>{
    return api.get('/public/listeRegions');
   }
const ajouterRegion = () =>{
    return api.post('admin/ajoutRegion');
   }
const modifierRegion = (id) =>{
    return api.put(`admin/modifierRegion/${id}`);
   } 
const supprimerRegion = (id) =>{
    return api.delete(`admin/supprimerRegion/${id}`);
   }
//quartier
const getListQuartier = (id) =>{
    return api.get(`/admin/listerQuartiers/${id}`);
   }
const ajouterQuartier = (id) =>{
    return api.post(`/admin/ajouterQuartier/${id}`);
   }
const modifierQuartier = (id) =>{
    return api.put(`admin/modifierQuartier/${id}`);
}
const supprimerQuartier = (id) =>{
    return api.delete(`admin/supprimerQuartier/${id}`);
   }
//departement
const getListDepartements = (idRegion) =>{
    return api.get(`/admin/listerDepartements/${idRegion}`);
   }
const ajouterDepartement = () =>{
    return api.post(`/admin/ajouterDepartement}`);
   }
const modifierDepartement = (id) =>{
    return api.put(`/admin/modifierDepartement/${id}`);

   }
const supprimerDepartement = (id) =>{
    return api.get(`/admin/supprimerDepartement/${id}`);
   }
   export const  RegionService ={
   getListQuartier,ajouterQuartier,modifierQuartier,supprimerQuartier,
 getListRegion,ajouterRegion,modifierRegion,supprimerRegion,
 getListDepartements,ajouterDepartement,modifierDepartement,supprimerDepartement,
}