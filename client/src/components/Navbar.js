import React,{useContext} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


export default function Navbar() {
  const h = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{

    if(state){
      if(state.email==="admin@gmail.com"){
        return[
          <li> <button className='btn waves-light pink' style={{
            width:'90px',
            marginRight:'5px'
          }} onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            h('/signin')
          }}>LogOut</button></li>
        ]
      }
      else{
        return[
          <li><NavLink to="/find">Find Tutor</NavLink></li>,
          <li><NavLink to="/createpost">Register As Tutor</NavLink></li>,
          <li> <button className='btn waves-light pink' style={{
            width:'90px',
            marginRight:'5px'
          }} onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            h('/signin')
          }}>LogOut</button></li>
        ]
      }
    }
    else{
    return [
      <li><NavLink to="/signin">Signin</NavLink></li>,
      <li><NavLink to="/signup">Signup</NavLink></li>
    ]
    }
  }

  return (
    <div> 
        <nav style={{
          top:"0",
          position:"absolute",
          zIndex:"99"
        }}>
           <div className="nav-wrapper white" style={{
            background: "linear-gradient(to left,rgb(255, 183, 183),rgb(214, 214, 214),rgb(145, 229, 255))",
            display:"flex",
            justifyContent:"space-around",
            flexWrap:"wrap",
            width:"100%",
            height:"auto"
           }}>
             <div style={{
              width:"50%"
             }}><NavLink to={state?"/":"/signin"} className="brand-logo left" style={{marginLeft:'20px'}}>Tutor'S Point</NavLink></div>
             <div style={{
              width:"50%"
             }}> <ul id="nav-mobile" className="right" style={{
              display:"flex",
              flexWrap:"wrap"
             }} >
                 {renderList()}
              </ul></div>
            </div>
        </nav>
    </div>
  )
}
