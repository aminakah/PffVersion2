import React, { useState, useRef, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { MessageBox} from 'react-chat-elements';
import './ChatBox.css';
import { ChatService } from '../../../../services/chat.service';
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyC5I463PFKl3T2aEgcKi0iwYIp2CmikZkY",
  authDomain: "senpharmacie-d3bad.firebaseapp.com",
  projectId: "senpharmacie-d3bad",
  storageBucket: "senpharmacie-d3bad.appspot.com",
  messagingSenderId: "31136841878",
  appId: "1:31136841878:web:e29bab14f01386bc3cc2b7",
  measurementId: "G-L92M3EN6DD"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const ChatBox = ({pharmacie, currentUser}) => {

  const [messages, setMessages] = useState([]);
  const [isChatBoxOpened, setIsChatBoxOpened] =useState(false);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Function to handle sending messages
  const sendMessage = () => {
    const text = inputRef.current.value;

    // Push text message to Firebase
    firebase.database().ref('messages_'+ pharmacie.id+ '_'+ currentUser.id).push({
      text,
      type: 'text',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      senderName: currentUser.prenom,
      senderPhone: currentUser.telephone,
      position: 'right'
    });
    updateDataBase();
    // Clear input field after sending
    inputRef.current.value = '';
  };

  const updateDataBase  = () =>{
    const message = {
      pharmacie_id: pharmacie.id,
      expediteur_id: currentUser.id, 
      recepteur_id: pharmacie.id,
      messages: 'text'
      }
  
      ChatService.sendMessage(message)
      .then(response => {
        console.log(response)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  // Function to handle sending images
  const sendImage = (e) => {
   
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    // Upload image to Firebase Storage
    imageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        // Push image message to Firebase
        
    if(file.type.includes('image')){
      firebase.database().ref('messages_'+ pharmacie.id+ '_'+ currentUser.id).push({
        imageUrl: downloadURL,
        type: 'photo',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        senderName: currentUser.prenom,
        senderPhone: currentUser.telephone,
        position: 'right'
      });
    } else{
      firebase.database().ref('messages_'+ pharmacie.id+ '_'+ currentUser.id).push({
        imageUrl: downloadURL,
        type: 'file',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        senderName: currentUser.prenom,
        senderPhone: currentUser.telephone,
        position: 'right'
      });
    }
        updateDataBase();
      });
    });
    
  };

 
  useEffect(() => {
    if(currentUser){
    // Firebase listener for new messages
    firebase.database().ref('messages_'+ pharmacie.id+ '_'+ currentUser.id).on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messageList = Object.values(messagesData);
        setMessages(messageList);
        console.log(messageList);
      }
    });
    }
  

  }, []);
  


  return (
    <>
    {(isChatBoxOpened && currentUser) ? <div className='chat-box'>
      <div className='chat-header pt-2'>
        <div className='d-flex justify-content-between align-items-center'>
           <div>
            <span>{pharmacie.nom}</span>
            <span className='ms-2'>{pharmacie.telephone}</span>
           </div>
           <div>
            <button className='chat-button' style={{backgroundColor: 'orange'}} onClick={() => setIsChatBoxOpened(false)}>
            <i class="fa fa-times" aria-hidden="true"></i>
            </button>
           </div>
        </div>
        
      </div>
      <div className=''>
        {/* Display chat messages */}
        {messages.map((message, index) => 
          <>{message.type === 'text' && <MessageBox
            key={index}
            title={message.senderName}
            type={'text'}
            text={ message.text}
            position= {message.position}
            date={new Date(message.timestamp)}

          />}

          {message.type === 'photo'&&<MessageBox
            key={index}
            title={message.senderName}
            type={ 'photo'}
            
            data={{
              uri: message.imageUrl
          }}
            position= {message.sender === 'client' ? 'left': 'right'}
            date={new Date(message.timestamp)}
            styles={{ maxWidth: '220px'}}
          />}

          { message.type === 'file' && <MessageBox
              position= {message.sender === 'client' ? 'left': 'right'}
              type={"file"}
              title={message.senderName}
              text={message.text}
              date={new Date(message.timestamp)}

              data={{
                uri: message.imageUrl,
                status: {
                  click: false,
                  loading: 0,
                },
              }}
              
              onDownload={() => {
                window.open(message.imageUrl, '_blank');

              }}
            />

          }
          
          </>


        )}
      </div>
      <div className='chat-input d-flex'>
        <label for='upload-file'>
        <i class="fa fa-paperclip" aria-hidden="true"></i>
          <input id='upload-file' ref={fileInputRef} type="file" onChange={sendImage} />
        </label>
        <input className='input-text mx-2'  ref={inputRef} type="text" />
        <button className='chat-button' onClick={sendMessage}>
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
     
      
    </div> : 
     <button className='chat-btn' onClick={() => {
      if(currentUser){
        setIsChatBoxOpened(true);
      }else{
         navigate('/auth/login')
      }
     }}>
     <i className='fa fa-message'></i>
    </button>}
    </>);
};

export default ChatBox;
