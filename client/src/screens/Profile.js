import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="home">
     
      <div className="tutor" data-aos="fade-left">
        <div className="para" data-aos="fade-right">
          <h1>For Tutors</h1>
          <p>
            Welcome tutors! Join our platform to connect with eager students and
            share your expertise. Showcase your skills, manage sessions
            effortlessly, and grow your professional network.
          </p>
         
        </div>
      </div>

  
      <div className="student" data-aos="fade-right">
        <div className="para" data-aos="fade-left">
          <h1>For Students</h1>
          <p>
            Hello students! Looking for guidance in your studies or personal
            growth? Our platform connects you with experienced tutors who can
            help you achieve your goals.
          </p>
   
        </div>
      </div>
    </div>
  );
}
