import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import { Chat } from './pages/Chat/Chat';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer, toast }from'react-toastify';
function App() {
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
