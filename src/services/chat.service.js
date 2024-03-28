import api from './api';

const sendMessage = (data) => {
  return api.post(`/messages/send`, data);
}
const getMessage = (idPharmacie) => {
  return api.get(`/messages/${idPharmacie}`);
}


const getMessagesUsers = (pharmacieId) => {
  return api.get(`/pharmacies/${pharmacieId}/usersMessages`)
}




export const ChatService = {
  sendMessage,
  getMessage,
  getMessagesUsers
}