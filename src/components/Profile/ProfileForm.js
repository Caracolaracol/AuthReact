import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  const authCtx = useContext(AuthContext)
  const submitHandler = event => {
    event.preventDefault()
    
    const enteredNewPassword = newPasswordInputRef.current.value


    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7dAosA0pvmqx0SG6E1vq6oRC-OAgwVLw', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // assumption: always succeds!
      history.replace('/')


    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} minLength='7' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
