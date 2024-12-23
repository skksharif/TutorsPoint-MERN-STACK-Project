import React ,{ useState,useContext,useEffect}  from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Signin() {
  const {state,dispatch} =useContext(UserContext)
  const history= useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("") 
  
  const PostData = ()=>{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      M.toast({html: 'INVALID EMAIL',classes:"red"})
      return
    }
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
    }).then(res=> res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: 'Please enter valid details',classes:"red"})
      }
      else{
        if(data.user.email==="admin@gmail.com"){
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user});
          M.toast({html: "Sign in successful",classes:"green"});
          history("/admin");  
        }
        else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user});
          M.toast({html: "Sign in successful",classes:"green"});
          history("/");
        }
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
        <div className='mycard' data-aos='fade-up'>
          <div className="card auth-card">
             <h2 className='form-logo'>Tutor's Point</h2>
             <input type="text" placeholder='email' 
              value={email}
              onChange={(e)=>setEmail(e.target.value)} 
             />
             <input type="password" placeholder='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
             />
             <button className='btn waves-light blue' onClick={()=>PostData()}>Sign in</button>
             <h6><NavLink to='/signup'>Don't have an account?</NavLink></h6>
          </div>
        </div>
    </div>
  )
}
