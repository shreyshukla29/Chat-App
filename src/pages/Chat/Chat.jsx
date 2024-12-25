import  './Chat.css'
import LeftSidebar from './../../components/LeftSidebar/LeftSidebar';
import ChatBox from './../../components/ChatBox/ChatBox';
import RightSidebar from './../../components/RightSidebar/RightSidebar';
import { useContext, useEffect } from 'react';
import {AppContext} from './../../context/AppContext';
import { useState } from 'react';

export const Chat = () => {

  const {chatData , userData} = useContext(AppContext);

  const [loading, setloading] = useState(true);

  useEffect(()=>{
    if(chatData && userData){
      setloading(false)
    }
  },[chatData, userData])

  return (
    <div className="chat">
      {loading ? (<p
      className="loading">Loading... </p>):(<div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>) }
      
    </div>
  )
}
