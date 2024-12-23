import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CreatePost() {
    const history= useNavigate()
    const [fullname,setFullname]=useState("");
    const [subject,setSubject]=useState("");
    const [description,setDescription]=useState("");
    const [email,setEmail]=useState("");
    const [location,setLocation]=useState("");
    const [file,setFile]=useState("");
    const [url,setUrl] = useState("")
    useEffect(()=>{
      AOS.init({duration:2000});
   },[]);
    useEffect(()=>{
      console.log("Posting data")
       if(url){
        fetch("http://localhost:5000/createpost",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            fullname,
            subject,
            description,
            email,
            location,
            photo:url
          })
        }).then(res=>res.json())
        .then(data=>{
          if(data.error){
            M.toast({html: data.error,classes:"green"})
          }
          else{
            M.toast({html: "Posted successfully",classes:"green"})
            history("/");
          }
        }).catch(err=>{
          console.log(err)
        })
       }
    },[url])
    
    const postDetails=()=>{
        const data=new FormData()
        data.append("file",file)
        data.append("upload_preset","gossip");
        data.append("cloud_name","dldysypoj");
        
        fetch("https://api.cloudinary.com/v1_1/dldysypoj/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err,"this")
        })

       
    }

  return (
    
    <>  <div className='card input-filed' id='card' data-aos="fade-left"
    style={{
     margin:"10px auto",
     maxWidth:"500px",
     padding:"20px",
     textAlign:"center"
 }}><h5>Register As Tutor</h5> </div>
        <div className='card input-filed'  data-aos="fade-right"
           style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center",
            marginTop:"30px ",
            border:"1px solid gray"
        }}> 
            <input type="text" name="full-name" placeholder="Enter your full name"  required
              value={fullname}
              onChange={(e)=>setFullname(e.target.value)}/>
        <br/>
            <input type="text" name="subject" placeholder="Enter the subject"  required
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}/>
        <br/>
      
          <input type="text" name="email" placeholder="Enter your E-mail"  
             value={email}
             onChange={(e)=>setEmail(e.target.value)} required/>
        <br/>
        <input type="text" name="location" placeholder="Enter your location" 
          value={location}
          onChange={(e)=>setLocation(e.target.value)}
        required/>
        <br/>
        <textarea name="description" placeholder="Enter a description"  required
               value={description}
               onChange={(e)=>setDescription(e.target.value)}style={{
                height:"200px"
               }}/>
        <br/>
         <div className="file-field input-field">
           <div  className='btn blue waves-light'>
               <span>Upload Image</span>
               <input type="file"
               onChange={(e)=>setFile(e.target.files[0])}
               />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
        </div>
        <button className='btn blue waves-dark  '
        onClick={()=>postDetails()}
        >Register</button>

        </div>
    </>
 
   
  )
}
