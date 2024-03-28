import api from "./api";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}

const goToAccount = (navigate) => {
  const user = getCurrentUser();
  if(user?.profile === 'admin'){
    navigate('/account/admin/'+ user?.id);
  } 
  else if(user?.profile === 'client'){
    navigate('/');
  }
  else if(user?.profile === 'agentPharmacie'){
    navigate('/account/agent/'+ user?.id);
  }
   else if(user?.profile === 'proprietaire' ){
    navigate('/account/partner/'+ user?.id);
  } else{
    navigate('/')
  }
   }
//ADMIN
const getProprietaires = () => {
  return api.get('admin/listeProprietaires');
}
const bloquerAgentPharmacie = (id) =>{
  return api.post(`/admin/bloquer/${id}`);
 }
const ModifierPropAccounnt = () => {
  return api.put('/modifierProprietaire');
}

const addProp = (data) => {
 return api.post('/admin/ajouterProprietaire', data);
}

export const  UserService = {
   getCurrentUser,
   goToAccount,
   getProprietaires,bloquerAgentPharmacie,
   addProp,
   ModifierPropAccounnt,
  }
  