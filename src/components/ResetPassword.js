import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {style} from  './style/reset.css'

const ResetPassword = () => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.put(`http://localhost:3000/user/updatePassword/${id}`, {
        password,
      });

      setSuccess(data.message);
      setError('');
      setNewPassword('');
      setConfirmPassword('');
      window.location = "/login";
        
    } catch (error) {
      setError(error.response.data.message);
      setSuccess('');
    }
  };

  return (
    
    <section>
<div className="mainDiv">
  <div class="cardStyle">
    <form action="" method="post" name="signupForm" id="signupForm" onSubmit={handleSubmit}>
      
      <img src="" id="signupLogo"/>
      
      <h2 class="formTitle">
        Reset your password
      </h2>
      
    <div class="inputDiv">
      <label class="inputLabel" for="password">New Password</label>
      <input type="password" id="password" name="password" value={password} onChange={(e) => setNewPassword(e.target.value)} required />
    </div>
      
    <div class="inputDiv">
      <label class="inputLabel" for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
    </div>
    {error && <p class="error">{error}</p>}
    
    <div class="buttonWrapper">
      <button type="submit" id="submitButton" className="submitButton pure-button pure-button-success    ">
        <span>submit</span>
        
      </button>
      
    </div>
    
      
  </form>
  </div>
</div>
</section>
  );
};

export default ResetPassword;
