import Login from "./pages/login/Login";
import { Routes, Route ,useNavigate,useLocation} from "react-router-dom";
import { Chat } from './pages/Chat/Chat';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer }from'react-toastify';
import {useEffect , useContext} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './config/firebase'
import { AppContext } from './context/AppContext';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const {loadUserData} = useContext(AppContext)

  useEffect(() => {
   
    onAuthStateChanged(auth,async (user) => {
      if(user  && location.pathname === "/"){
        await loadUserData(user.uid)
        navigate('/chat')
      }
      else if(!user){
        navigate('/')
      }
    })
  
    return () => {
      
    }
  }, [])
  
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/profile" element={<ProfileUpdate/>}/>
      </Routes>
    </>
  );
}

export default App;
