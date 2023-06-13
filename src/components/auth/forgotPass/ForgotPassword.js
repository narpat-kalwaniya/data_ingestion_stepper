import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [storedotp,setStoredOtp] = useState('23456')
    const [otp,setOtp] = useState('')
    const [password,setPassword] = useState("")
    const [otpVerified,setOtpVerified] = useState(null)
  return (
    <div> <main class="main">
    <div class="container">
      <section class="wrapper">
        <div class="heading">
          <h1 class="text text-large">Forgot Password</h1>
         
        </div>
        <form name="signin" class="form">
          <div class="input-control">
            <label for="email" class="input-label" hidden>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="input-field"
              placeholder="Email Address"
              value={email}
              onChange={e=>{setEmail(e.target.value)}}
            />
            <div>
                {otpVerified && <VerifiedIcon style={{color:"green"}}/>}
                {otpVerified===false && <CancelIcon style={{color:"red"}}/>}
            </div>
          </div>
          <div class="input-control">
            <label for="password" class="input-label" hidden>
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              class="input-field"
              placeholder="Enter OTP"
              value={otp}
              onChange={e=>{
                setOtp(e.target.value)
                if(e.target.value === storedotp){
                    setOtpVerified(true)
                }
                else{
                    setOtpVerified(false)
                }
                }}
            />
          </div>
       
          <div class="input-control">
            <label for="password" class="input-label" hidden>
             New Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="input-field"
              placeholder="New Password"
              value={password}
              onChange={e=>{setPassword(e.target.value)}}
            />
          </div>
          <div class="input-control">
          <Link to="/login" class="text text-links">
              Login
            </Link>
            <input
              type="submit"
              name="submit"
              class="input-submit"
              value="Change Password"
              
            />
          </div>
        </form>
       
     
      </section>
    </div>
  </main></div>
  )
}

export default ForgotPassword