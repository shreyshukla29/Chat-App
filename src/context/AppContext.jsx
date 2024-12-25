/* eslint-disable react/prop-types */

import { createContext } from "react";
import { useState } from "react";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AppContext = createContext();
export { AppContext };

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setmessages] = useState([]);
  const [chatUser, setchatUser] = useState(null);
  const [chatVisible, setchatVisible] = useState(false);
  const navigate = useNavigate();
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const UserData = userSnap.data();
      setUserData(() => UserData);
      if (!UserData.avatar || !UserData?.name) {
        navigate("/profile");
        toast("please update your profile");
      }
      setInterval(async () => {
        if (auth) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatsData;
        console.log("chat item", res.data());
        const tempData = [];

        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log("setChataData", chatData, tempData);
      });

      return () => {
        unSub();
      };
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setmessages,
    messagesId,
    setMessagesId,
    chatUser,
    setchatUser,
    chatVisible,
    setchatVisible,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
