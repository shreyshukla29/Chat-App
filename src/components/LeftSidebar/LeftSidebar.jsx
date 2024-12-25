/* eslint-disable no-unused-vars */
import "./LeftSidebar.css";
import assets from "./../../assets/assets";
import { useNavigate } from "react-router-dom";
import { query, collection, where } from "firebase/firestore";
import { db ,logout} from "../../config/firebase";
import { getDocs,setDoc,doc,serverTimestamp ,updateDoc,arrayUnion} from "firebase/firestore";
import { AppContext } from "./../../context/AppContext";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import { getDoc } from 'firebase/firestore';
import { useEffect } from 'react';



const LeftSidebar = () => {
  const navigate = useNavigate();
  const { userData, chatData,messages,
    setmessages,
    messagesId,
    setMessagesId,
    chatUser,
    setchatUser ,
    chatVisible, setchatVisible} = useContext(AppContext);
  const [user, setUser] = useState(null); // Fixed the destructuring here
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));

        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData?.id) {
          let userExist = false;
          chatData.map((user)=>{
            console.log(user)
            if(user.rId === querySnap.docs[0].data().id){
             
              userExist = true;
            }
          })

        if(!userExist){
          setUser(querySnap.docs[0].data());
        }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error("error in query", error);
    }
  };

  const addChat =async () => {
    const messagesRef = collection(db,"messages"
    );
    const chatsRef = collection(db,'chats');

    try{
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef,{
        createdAt : serverTimestamp(),
        messages:[]
      })

      await updateDoc(doc(chatsRef,user.id),{
        chatsData:arrayUnion({
          messageId: newMessageRef.id,
          lastMessage:"",
          rId:userData.id,
          updatedAt:Date.now(),
          messageSeen:true,

        })
      })

      await updateDoc(doc(chatsRef,userData.id),{
        chatsData:arrayUnion({
          messageId: newMessageRef.id,
          lastMessage:"",
          rId:user.id,
          updatedAt:Date.now(),
          messageSeen:true,

        })
      })
      const uSnap = await getDoc(doc(db,'users',user.id));
      const uData = uSnap.data();
      setChat({
        messageId: newMessageRef.id,
        lastMessage:'',
        rId:user.id,
        updatedAt:Date.now(),
        messageSeen:true,
        userData:uData
      })

      setShowSearch(false);
      setchatVisible(true);
    }catch(error){
      toast.error('error in adding friend')
    }
  }

  useEffect(() => {
    
  const updateChatUserData = async () => {
    if(chatUser){
      const userRef = doc(db,'users',chatUser.userData.id);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setchatUser(prev=> ({
        ...prev,
        userData
      }))
    }
  }

  updateChatUserData()
   
  }, [chatData])
  

  const setChat= async(item)=>{

    setMessagesId(item.messageId);
    setchatUser(item);

    const userChatsRef = doc(db,'chats',userData.id);
    const  userChatsSnapshot = await getDoc(userChatsRef);

    const userChatData = userChatsSnapshot.data();

    const chatIndex = userChatData.chatsData.findIndex((c)=> c.messageId === item.messageId );

    userChatData.chatsData[chatIndex].messageSeen = true;
    await updateDoc(userChatsRef,{
      chatsData : userChatData.chatsData
    })
    setchatVisible(true)
   
  }


  return (
    <div className={`ls  ${chatVisible ? 'hidden':''}`}>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            type="text"
            placeholder="search here"
            onChange={inputHandler}
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div className="friends add-user"
          onClick ={addChat}>
            <img src={user.avatar} alt="user profile" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData?.map((item, index) => (
              <div key={index} className={`friends ${item.messageSeen
                || item.messageId === messagesId ?"":"border" }`}
              onClick={()=>setChat(item)}>
                <img src={item.userData?.avatar} alt="" />
                <div>
                  <p>{item.userData?.name}</p>
                  <span>{item.lastMessage}</span>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
