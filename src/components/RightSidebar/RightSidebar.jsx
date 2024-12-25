import  './RightSidebar.css'
import assets from './../../assets/assets';
import {logout} from '../../config/firebase'
import { useContext } from 'react';
import {AppContext} from './../../context/AppContext';
import { useEffect } from 'react';
import { useState } from 'react';


const RightSidebar = () => {

  const {chatUser , messages } = useContext(AppContext)
const [messageImages, setmessageImages] = useState([]);
  useEffect(() => {
    
    let tempVar = [];

    messages.map((msg)=>{

      if(msg.image){
        tempVar.push(msg.image)
      }

    })
    console.log(tempVar)
    setmessageImages(tempVar)
   
  }, [messages,chatUser])
  
  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>{chatUser.userData.name}
        {Date.now()-chatUser.userData.lastSeen <= 70000 &&   <img src={assets.green_dot} alt="" className="dot" />}
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />

      <div className="rs-media">
        <p>Media</p>
        <div>

          {messageImages?.map((url,index)=>(
            <img key={index} src={url} alt=""
            onClick={()=> window.open(url)} />
          ))}
          {/* <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" /> */}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>

    </div>
  ) : 
  <div className="rs">
    <button onClick={()=>logout()}>Logout</button>
  </div>
}

export default RightSidebar