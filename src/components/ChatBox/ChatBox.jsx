/* eslint-disable no-unused-vars */
import './ChatBox.css';
import assets from './../../assets/assets';
import { useContext } from 'react';
import {AppContext} from './../../context/AppContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import {db} from '../../config/firebase'
const ChatBox = () => {

  const {userData, messages,
    setmessages,
    messagesId,
    setMessagesId,
    chatUser,
    setchatUser} = useContext(AppContext);

    const [input, setinput] = useState('');

    useEffect(() => {
      if(messagesId){
        const unSub = onSnapshot(doc(db,'messages',messagesId), (res)=>{
          setmessages(res.data.messages.reverse())
        })

        return () => {
        unSub();
        }
      }
    
     
    }, [messagesId])
    

    
  return chatUser ? (
    <div className="chat-box">

      {/* user section */}
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>{chatUser.userData.name} <img src={assets.green_dot} alt=""
        className="dot" /></p>
        <img src={assets.help_icon} alt="" 
        className="help"/>
      </div>


{/* chat section  */}
<div className="chat-msg">
  <div className="s-msg">
    <p className="msg">Hello bro, How are you?</p>
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:30 pm</p>
    </div>
  </div>

  <div className="s-msg">
    <img className="msg-img" src={assets.pic1} alt="" />
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:30 pm</p>
    </div>
    </div>

  <div className="r-msg">
    <p className="msg">I am fine, what about you?</p>
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:35 pm</p>
    </div>

  </div>

  
 
</div>

{/* input section */}
      <div className="chat-input">
        <input type="text" placeholder="send a message" />
        <input type="file"  id="image"
        accept="image/png, image/jpeg" hidden/>
        <label htmlFor="image" >
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
      </div>
  )
: <div className='chat-welcome'>
  <img src={assets.logo_icon} alt="" />
  <p>Chat anytime, any where</p>
</div>

}

export default ChatBox