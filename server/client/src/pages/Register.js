import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import Axios from 'axios';


const Register = () => {
   

    const { user, setUser } = useContext(UserContext);





    
    useEffect(() => {

        Axios.post("http://localhost:5000/api/signup", {
            username: 'Todd',
            email: 'todd@mail.com',
            password: '1234'
        }, {
        headers: {
            'Content-Type': 'application/json'
          },
           withCredentials: true
        })
        .then(response => {
            // console.log(response.data)
            console.log(response.data.userInfo)
            setUser(response.data.userInfo)
        })
        .catch(error => {
            console.log(error.message)
        })

    },[])


    return (
        <div>
            <div>
                <h2>Register Page</h2>
                
            
            </div>
                <h1>{!user ? 'Loading...' : 'welcome ' + user.user.username}</h1>   
            </div>
    )
}

export default Register;
