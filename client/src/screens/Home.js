import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const emailAddress = 'khasimsharif12@gmail.com';

  useEffect(() => {
    fetch('http://localhost:5000/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const likePost = (id) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => (item._id === result._id ? result : item));
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => (item._id === result._id ? result : item));
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="home"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {data.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              marginTop: '50px',
              fontSize: '18px',
              color: '#555',
            }}
          >
            <p>No posts available</p>
          </div>
        ) : (
          data.map((item) => {
            return (
              <div
                className="card home-card"
                data-aos="fade-right"
                key={item._id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '1200px',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  border: '1px solid rgba(209, 213, 219, 0.3)',
                  backgroundColor: 'rgba(255,255,255,0.75)',
                  boxShadow: '0px 0px 2px 0px',
                  backdropFilter: 'blur(16px)',
                  margin: '20px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <div>
                    <img
                      src={item.photo}
                      alt={item.photo}
                      style={{
                        width: '400px',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                  <div className="card-text">
                    <p>
                      <b>Name</b>: {item.fullname}
                    </p>
                    <p>
                      <b>Subject</b>: {item.subject}
                    </p>
                    <p>
                      <b>Description</b>: {item.description}
                    </p>
                    <p>
                      <b>E-mail</b>:{' '}
                      <a href={`mailto:${emailAddress}`}>{item.email}</a>{' '}
                    </p>
                    <p>
                      <b>Address</b>: {item.location}
                    </p>
                    <p
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {item.likes.includes(state._id) ? (
                        <i
                          className="material-icons"
                          onClick={() => unlikePost(item._id)}
                        >
                          thumb_down
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          onClick={() => likePost(item._id)}
                        >
                          thumb_up
                        </i>
                      )}
                      <b>{item.likes.length} likes</b>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
