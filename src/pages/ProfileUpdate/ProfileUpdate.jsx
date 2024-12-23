import './ProfileUpdate.css'
import assets from './../../assets/assets';

const ProfileUpdate = () => {
  return (
    <div className="profile">
      <div className="profile-container">

        <form >
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input type="file" id='avatar' accept='.png , .jpg , .jpeg' hidden  />

            <img src={assets.avatar_icon} alt="" />
            Upload profile image
          </label>
          <input type="text" placeholder="your name" required />
          <textarea  placeholder='write profile bio' required></textarea>
          <button type='submit'>save</button>
        </form>
        <img className="profile-pic" src={assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate