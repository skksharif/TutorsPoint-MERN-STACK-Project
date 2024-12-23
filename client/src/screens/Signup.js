import React, { useState,useEffect} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Signup() {
  const history= useNavigate()
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("") 
  
  const PostData = ()=>{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({html: 'INVALID EMAIL',classes:"red"})
      return
    }
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: 'Please enter valid details',classes:"red"})
      }
      else{
        M.toast({html: "Sign up successful",classes:"green"})
        history("/signin");
      }
    }).catch(err=>{
      console.log(err)
    })

  }
  useEffect(()=>{
    AOS.init({duration:2000});
 },[]);

  return (
    <div> 
        <div className='mycard'data-aos='fade-down'>
          <div className="card auth-card">
             <h2 className='form-logo'>Tutor's Point</h2>
             <input type="text" placeholder='Username' 
              value={name}
              onChange={(e)=>setName(e.target.value)}
             />
             <input type="text" placeholder='email' 
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
             />
             <input type="password" placeholder='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
             />
             <button className='btn waves-light blue' onClick={()=>PostData()}>Sign up</button>
             <h6><NavLink to='/signin'>Already have an account?</NavLink></h6>
          </div>
        </div>
    </div>
  )
}
