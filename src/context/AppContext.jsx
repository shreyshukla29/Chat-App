/* eslint-disable react/prop-types */

import { createContext } from "react";
import { useState } from "react";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { db,auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AppContext = createContext();
export { AppContext };

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const UserData = userSnap.data();
      setUserData(UserData);
      console.log(UserData)

      if (!UserData.avatar || !UserData?.name) {
        navigate("/profile");
        console.log('profile')
        toast('please update your profile')
      }

      setInterval(async() => {
        if(auth){
          await updateDoc(userRef,{
            lastSeen : Date.now(),
          })
        }
        
      }, 60000);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
