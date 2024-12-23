import React,{useEffect,createContext,useReducer, useContext} from 'react'
import Navbar from './components/Navbar'
import Home from './screens/Home'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import CreatePost from './screens/CreatePost'
import './App.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import {reducer,initialState} from './reducer/userReducer'
import Admin from './screens/Admin'


export const UserContext =createContext()

const Routing =()=>{
  const h = useNavigate()
  const {state,dispatch} =useContext(UserContext)
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    //  h('/')
    }
    else{
      h('/signin')
    }
  },[])
  return(
  <Routes>
    <Route exact path='/find' element={<Home />} />
    <Route path='/signin' element={<Signin />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/' element={<Profile />} />
    <Route path='/createpost' element={<CreatePost />} />
    <Route path='/admin' element={<Admin />} />
 </Routes>
  )
}

export default function App() {
   const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <div>
      <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
          <Navbar/>
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

