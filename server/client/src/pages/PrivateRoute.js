import React, { useContext, useState, useEffect } from 'react'
import { Route, Navigate, Outlet} from 'react-router-dom'
import { UserContext } from '../hooks/UserContext'
import Axios  from 'axios'






const PrivateRoute = (props) => {
    
    const refreshUser =   () =>  {
        Axios.get("http://localhost:5000/api/isUserLoggedIn",
         { withCredentials: true,  
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(response => {
            // console.log(response.data)
            console.log('response: ' + JSON.stringify(response.data));
    
            // if(response.data.success === true){
                setUser(response.data.userInfo);
            //   setIsLoading(false)
    
            // }else {
            //      setUser(null)
            // //   setIsLoading(true)
            // }
    
            // return;
        })
        .catch(error => {
            // console.log(error.message);
            setUser(null)
            // setIsLoading(true)
            // return null
        })
    };

    

    const { user, setUser } = useContext(UserContext)
    const { component: Component, ...rest } = props;

    useEffect(() => {
        // refreshUser();
        

    }, [])
    

    return user ? <Outlet /> :  <Navigate to='/signin' />
}

export default PrivateRoute



