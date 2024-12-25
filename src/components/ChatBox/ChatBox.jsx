/* eslint-disable no-unused-vars */
import "./ChatBox.css";
import assets from "./../../assets/assets";
import { useContext } from "react";
import { AppContext } from "./../../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import handleImageUpload from './../../lib/upload';

const ChatBox = () => {
  const {
    userData,
    messages,
    setmessages,
    messagesId,
    setMessagesId,
    chatUser,
    setchatUser,
  } = useContext(AppContext);

  const [input, setinput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        const userIds = [chatUser.rId, userData.id];
        userIds.forEach(async (id) => {
          console.log("inside this");
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();

            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }

    setinput("");
  };

  const sendImage = async (e) => {
    try {
      console.log("image uploading")
      const url = await handleImageUpload(e.target.files[0]);
      if(url && messagesId){
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image:url,
            createdAt: new Date(),
          }),
        });

        const userIds = [chatUser.rId, userData.id];
        userIds.forEach(async (id) => {
          console.log("inside this");
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();

            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = 'Image'
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }

    } catch (error) {
      toast.error('error in sending image')
    }
  }

  const convertTimeStamp = (timeStamp)=>{
let date = timeStamp.toDate();
const hour = date.getHours();
const minute = date.getMinutes();
if(hour > 12){
  return hour-12+":"+(minute>9 ? minute :'0'+minute)+"PM"
}
return  hour+":"+(minute>9 ? minute :'0'+minute)+"AM"
  }

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setmessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div className="chat-box">
      {/* user section */}
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}{" "}
          <img src={assets.green_dot} alt="" className="dot" />
        </p>
        <img src={assets.help_icon} alt="" className="help" />
      </div>

      {/* chat section  */}
      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sId === userData.id ? "s-msg" :'r-msg'}>

            {msg["image"] ? (
              <img className="msg-img"src={msg.image} alt="" />
            ): (
             <> 
              <p className="msg">{msg.text}</p>
             </>
            )}
             <div>
                <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="" />
                <p>{convertTimeStamp(msg.createdAt)}</p>
              </div>
           
          </div>
        ))}

       

       
      </div>

      {/* input section */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="send a message"
          onChange={(e) => setinput(e.target.value)}
          value={input}
        />
        <input onChange={sendImage} type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" onClick={sendMessage} />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo_icon} alt="" />
      <p>Chat anytime, any where</p>
    </div>
  );
};

export default ChatBox;
