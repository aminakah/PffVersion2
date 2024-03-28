import React, { useEffect, useRef, useState } from 'react';
import './ChatPage.css';
import { NavBarTop } from '../../components/NavBarTop/NavBarTop';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useParams } from 'react-router-dom';
import { PharmacieService } from '../../../../services/pharmacie.service';
import { ChatService } from '../../../../services/chat.service';
import { ChatItem, MessageBox } from 'react-chat-elements';
import { SideNavBarPro } from '../../components/SideNavBarPro/SideNavBarPro';

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

export const ChatPage = () => {
  const param = useParams();
  const [users, setUsers] = useState([]);
  const [pharmacie, setPharmacie] = useState(null);
  const [selectedUser, setSelctedUser] = useState(null);
  const [inputText, setInputText] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to handle sending messages
  const sendMessage = (user) => {
    console.log(user)
    const text = inputRef.current.value;

    // Push text message to Firebase
    firebase.database().ref('messages_' + pharmacie.id + '_' + user.id).push({
      text,
      type: 'text',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      senderName: currentUser.prenom,
      senderPhone: currentUser.telephone,
      position: 'left'
    });
    updateDataBase(user);
    // Clear input field after sending
    inputRef.current.value = '';
  };

  const updateDataBase = (user) => {
    const message = {
      pharmacie_id: pharmacie.id,
      expediteur_id: pharmacie.id,
      recepteur_id: user.id,
      messages: 'text'
    }

    ChatService.sendMessage(message)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Function to handle sending images
  const sendImage = (e, user) => {

    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${file.name}`);

    // Upload image to Firebase Storage
    imageRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        // Push image message to Firebase

        if (file.type.includes('image')) {
          firebase.database().ref('messages_' + pharmacie.id + '_' + user.id).push({
            imageUrl: downloadURL,
            type: 'photo',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderName: currentUser.prenom,
            senderPhone: currentUser.telephone,
            position: 'left'
          });
        } else {
          firebase.database().ref('messages_' + pharmacie.id + '_' + user.id).push({
            imageUrl: downloadURL,
            type: 'file',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderName: currentUser.prenom,
            senderPhone: currentUser.telephone,
            position: 'left'
          });
        }
        updateDataBase(user);
      });
    });

  };

  const loadMessageUsers = (id) => {
    ChatService.getMessagesUsers(id)
      .then(response => {
        setUsers(response.data.users_with_messages);
        console.log(users)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const loadSelectedUserMessage = () => {
    PharmacieService.detailsPharmacie(param.id)
      .then(response => {
        setPharmacie(response.data.pharmacie);
        // Firebase listener for new messages
        firebase.database().ref('messages_' + pharmacie.id + '_' + selectedUser.id).on('value', (snapshot) => {
          const messagesData = snapshot.val();
          if (messagesData) {
            const messageList = Object.values(messagesData);
            setMessages(messageList);
          }
        });
      })
      .catch(err => {

      })
  }

  const onSelectUser = (user) => {
    loadSelectedUserMessage();
    setSelctedUser(user);
  }


  useEffect(() => {
    loadMessageUsers(param.id);
  }, [])
  return (
    <div className="PartnerHomePage container-fluid p-0 m-0">
      <div className='d-flex'>
        <SideNavBarPro />
        < div className='body  m-t3 pt-4 d-flex chat-section'>
          <div className=' '>
            <div className='row  w-100'>
              <div className='col-9'>
                <div className='contact-list px-3 '>

                  <tr>
                    <td className='chat-section'> {users.map((user, index) => (
                      <ChatItem
                        key={index}
                        title={user.prenom}
                        type={'text'}
                        date={new Date(user.updatedAt)}
                        onClick={() => onSelectUser(user)}
                        className={(selectedUser && selectedUser.id === user.id) ? 'chat-item' : ''}

                      />
                    ))}</td>
                  </tr>
                </div>
              </div>
              <div className='col-9'>
                <div className=''>
                  {/* {selectedUser &&
                    <div className='p-5'>
                      {messages.map((message, index) =>
                        <>{message.type === 'text' && <MessageBox
                          key={index}
                          title={message.senderPrenom}
                          type={'text'}
                          text={message.text}
                          position={message.position}
                          date={new Date(message.timestamp)}

                        />} */}

                          {/* {message.type === 'photo' && <MessageBox
                            key={index}
                            title={message.senderPrenom}
                            type={'photo'}

                            data={{
                              uri: message.imageUrl
                            }}
                            position={message.position}
                            date={new Date(message.timestamp)}
                            styles={{ maxWidth: '220px' }}
                          />} */}

                          {/* {message.type === 'file' && <MessageBox
                            position={message.position}
                            type={"file"}
                            title={message.senderPrenom}
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
                    </div>} */}

                  {selectedUser && <div className='chat-input d-flex'>
                    <label for='upload-file'>
                      <i class="fa fa-paperclip" aria-hidden="true"></i>
                      <input id='upload-file' ref={fileInputRef} type="file" onChange={(event) => sendImage(event, selectedUser)} />
                    </label>
                    <input className='input-text mx-2' ref={inputRef} type="text" />
                    <button className='chat-button' onClick={(event) => sendMessage(selectedUser)}>
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}