import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../App'
import "../App.css"
import M from 'materialize-css'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Admin () {
  const [data,setData]=useState([]);
  const [d,setD] = useState([1]);

  useEffect(()=>{
   fetch('https://tutorspoint-backend.onrender.com/allpost',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem("jwt")
    }
   }).then(res=>res.json())
   .then(result=>{
    setData(result.posts)
   })
  },[d]);

  useEffect(()=>{
    AOS.init({duration:2000});
 },[]);

 
  return (
    <div style={{
        marginTop:"80px"
    }}>
            <div className='home' style={{
        display:"flex",
        flexDirection:"column"
      }}>
  
        {
          data.map(item=>{
            return(
              <div className='card home-card'  data-aos="fade-right" key={item._id} style={{
                display:"flex",
                flexDirection:"column",
                maxWidth:"1200px",
                alignItems:"center",
                justifyContent:"space-around",
                border:"1px solid rgba(209, 213, 219, 0.3)",
                backgroundColor:"rgba(255,255,255,0.75)",
                boxShadow:"0px 0px 2px 0px",
                backdropFilter:"blur(16px)"
              }}>
              <div style={{
                display:"flex",
                flexWrap:"wrap",
                alignItems:"center",
                justifyContent:"space-around",
               
              }}>
                <div>
                    <img src={item.photo} alt={item.photo} style={{
                      width:"400px",
                      borderRadius:"3px"
                    }}/>
                </div>
                <div className='card-text'>
                     <p><b>Name</b> : {item.fullname}</p>
                     <p><b>Subject</b> : {item.subject}</p>
                     <p><b>Description</b> : {item.description}</p>
                     <p><b>E-mail</b> : {item.email}</p>
                     <p><b>Address</b> : {item.location}</p>
                    <p style={{
                      cursor:"pointer",
                      display:"flex",
                      justifyContent:"center"
                    }}>
                       <b>{item.likes.length} likes</b></p>
                       <button className='btn waves-light red' onClick={()=>{
                                     fetch(`/delete/${item._id}`,{
                                      method:"delete",
                                      headers:{
                                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                                      }
                                     }).then((response) => {
                                     if(response.status==200){
                                      M.toast({html: "Deleted successfully",classes:"green"});
                                      setD([0])
                                     }
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                    });    
                        }}>Delete</button>
                </div>
               
              </div>
        
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Admin