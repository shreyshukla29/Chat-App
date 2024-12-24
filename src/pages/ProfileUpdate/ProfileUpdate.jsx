import './ProfileUpdate.css'
import assets from './../../assets/assets';
import { useState, useEffect } from 'react';
import handleImageUpload from './../../lib/upload';
import { onAuthStateChanged } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import {db,auth} from '../../config/firebase'
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDoc } from 'firebase/firestore';
const ProfileUpdate = () => {
  const [image, setImage] = useState(false);
  const [avatarURL , setAvatarURL] = useState('');
  const [name, setName]= useState('')
  const [bio, setBio] = useState('');
  const navigate= useNavigate()
const [uid, setuid] = useState('');

const profileUpdate = async (e) => {

  e.preventDefault()

  try {
    if(!avatarURL && !image){
      toast.error('upload profile image')
    }

    const docRef = doc(db,'users',uid);
    if(image){
      const imgurl = await handleImageUpload(image);
      setAvatarURL(imgurl);
      await updateDoc(docRef,{
        avatar:imgurl,
        bio,
        name
      })
    }else{
      await updateDoc(docRef,{
        bio,
        name
      })
    }

  } catch (error) {
    console.error('error occur',error)
    toast.error('error in updating profile')
  }

  
}

  useEffect(() => {
    
    onAuthStateChanged(auth,async (user) => {
      if(user){
        setuid(user.uid);
        const docRef =doc(db,'users',user.uid);
        const docSnap = await 
        getDoc(docRef);
        if(docSnap.data().name){
          setName(docSnap.data().name)
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio)
        }
        if(docSnap.data().avatar){
          setAvatarURL(docSnap.data().avatar)
        }
      }else{
        navigate('/')
      }
    })
  
    return () => {
      
    }
  }, [])
  



  return (
    <div className="profile">
      <div className="profile-container">

        <form  onSubmit={profileUpdate} >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input type="file" id='avatar' accept='.png , .jpg , .jpeg' hidden 
            onChange={(e)=> setImage(e.target.files[0])} />
            <img src={image? URL.createObjectURL(image) : avatarURL?avatarURL:assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input type="text" placeholder="your name" required value={name}
          onChange={(e)=> setName(e.target.value)}/>
          <textarea  placeholder='write profile bio' required value={bio}
          onChange={(e)=> setBio(e.target.value)}></textarea>
          <button type='submit'>save</button>
        </form>
        <img className="profile-pic" src={image? URL.createObjectURL(image) :avatarURL?avatarURL:assets.logo_icon} alt="profile photo" />
      </div>
    </div>
  )
}

export default ProfileUpdate