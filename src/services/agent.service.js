import api  from './api';

//Mediacament
const listeMedicament = () =>{
    return api.get(`agentPharmacie/listerProduits`);
   }
const modifierMedicament = (idMed) =>{
    return api.put(`agentPharmacie/modifierProduit/${idMed}`);}

// const ajouterMedicament = (data) =>{
//     return api.post(`agentPharmacie/ajouterProduit`,data);}
const ajouterMedicament = (data) =>{
    const formData = new FormData();
    formData.append('nom', data.nom);
    formData.append('photo', data.photo);
    formData.append('description', data.description);
    formData.append('categorie_id', data.categorie_id);
    formData.append('prix', data.prix);
    formData.append('quantite', data.quantite);
    
    return api.post(`agentPharmacie/ajouterProduit`,formData,{headers: {
        "Content-Type": "multipart/form-data"
    }});
   }

const supprimerMedicamet = (idMed) => {
    return api.delete(`/agentPharmacie/supprimerProduit/${idMed}`);
   }
//CATEGORIES
const listeCategorie = () =>{
    return api.get(`/agentPharmacie/listerCategories`);
   }
const modifierCategorie = (idCat) =>{
    return api.put(`/agentPharmacie/modifierCategorie/${idCat}`);

   }
const supprimerCatergorie = (idCat) =>{
    return api.delete(`/agentPharmacie/supprimerCategorie/${idCat}}`);
   }
const ajouterCatergorie = (data) =>{
      return api.post(`agentPharmacie/ajouterCategorie/`,data);
     }
     
     export const AgentService= {
        listeCategorie,modifierCategorie,supprimerCatergorie,ajouterCatergorie,
        listeMedicament,ajouterMedicament,supprimerMedicamet,modifierMedicament
     }