import React, { useRef, useState, useEffect}  from "react";

import axios from 'axios'

import { useHistory } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';

import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";


export default function Chats() {
  const history = useHistory();
  const { user } = useAuth();
  const [ loading, setLoading ] = useState(true)

  console.log(user);

  const handleLogout = async () => {
      await auth.signOut();
      history.push("/");
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect (() => {
      if(!user) {
          history.push('/');
          return;

      }

      axios.get(
        'https://api.chatengine.io/users/me/',
        { headers: { 
          "project-id": '64704114-5665-484f-ab04-8c7a5f7eb44f',
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
            .then(avatar => {
                formdata.append('avatar', avatar, avatar.name)

                axios.post(
                    'https://api.chatengine.io/users/',
                    formdata,
                    { headers: { "private-key": "5b5cbd1e-08f4-4b0c-9532-76a028459aa7"}}
                )
                .then(() => setLoading(false))
                .catch(e => console.log('e', e.response))
            })
    }) 
  } , [user, history]);

  if (!user || loading) return <div />
    return (
    <div className='chats-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
            Chat-App
            </div>

            <div onClick={handleLogout} className='logout-tab'>
            Logout
            </div>
        </div>

        <ChatEngine 
            height='calc(100vh - 66px)'
            projectID='64704114-5665-484f-ab04-8c7a5f7eb44f'
            userName= {user.email}
            userSecret= {user.uid}
        />
        </div>
    )
}