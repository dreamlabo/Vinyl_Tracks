import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import Axios from 'axios';

const Testpage = () => {

    const msg = useContext(UserContext);


    useEffect(() => {

        Axios.get("http://localhost:5000/api/isUserLoggedIn", { withCredentials: true,})
        .then(response => {
            // console.log(response.data)
            console.log('response: ' + JSON.stringify(response))
            // setUserData(response.data.userInfo)
        })
        .catch(error => {
            console.log(error.message)
        })

    },[])

    return (
        <div>
            <h2>TestPage</h2>
            {/* <div>{msg}</div> */}
            
        </div>
    )
}

export default Testpage
