import './ChatBox.css';
import assets from './../../assets/assets';

const ChatBox = () => {
  return (
    <div className="chat-box">

      {/* user section */}
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Richard Sanford <img src={assets.green_dot} alt=""
        className="dot" /></p>
        <img src={assets.help_icon} alt="" 
        className="help"/>
      </div>


{/* chat section  */}
<div className="chat-msg">
  <div className="s-msg">
    <p className="msg">Hello bro, How are you?</p>
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:30 pm</p>
    </div>
  </div>

  <div className="s-msg">
    <img className="msg-img" src={assets.pic1} alt="" />
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:30 pm</p>
    </div>
    </div>

  <div className="r-msg">
    <p className="msg">I am fine, what about you?</p>
    <div>
    <img src={assets.profile_img} alt="" />
    <p>2:35 pm</p>
    </div>

  </div>

  
 
</div>

{/* input section */}
      <div className="chat-input">
        <input type="text" placeholder="send a message" />
        <input type="file"  id="image"
        accept="image/png, image/jpeg" hidden/>
        <label htmlFor="image" >
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
      </div>
  )
}

export default ChatBox