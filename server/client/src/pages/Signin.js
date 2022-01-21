import React, { useState, useEffect, useContext } from 'react';
import { UserContext, LoadingContext} from '../hooks/UserContext';
import Axios from 'axios';

const Signin = () => {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { user, setUser } = useContext(UserContext);
    const [ currentUser, setCurrentUser ] = useState(null)




    const signOutUser = async () => {
        setUser(null);
        Axios.get("http://localhost:5000/api/logout", { withCredentials: true,  
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(response => {
            // console.log(response.data)
            console.log('response: ' + JSON.stringify(response.data))
            // setUser(null)
            // setIsLoading(true)
        })
        .catch(error => {
            console.log(error.message);
            
        })
       

    }

    const mapUser = () => {
        // if (user.albums === undefined) {
        //     return
        // }
        
        console.log(user.albums);
        return user.albums.map(albums => {
            console.log(albums.artistName)
            return <div>{albums.artistName}</div>
        
        
        })
        // for (let x = 0; x < user.albums.length; x++){
        //     console.log(user.albums[x].artistName)
            
        // }

    }

    const refreshUser =  async () =>  {
        await Axios.get("http://localhost:5000/api/isUserLoggedIn",
         { withCredentials: true,  
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(response => {
            // console.log(response.data)
            // console.log('response: ' + JSON.stringify(response.data));
  
            if(response.data.success === true){
                setUser(response.data.userInfo);
            //   setIsLoading(false)
  
            }else {
                 setUser(null)
            //   setIsLoading(true)
            }
  
            return;
        })
        .catch(error => {
            // console.log(error.message);
            setUser(null)
            // setIsLoading(true)
            // return null
        })
    };

    const getUser = async () => {
        // setUser(null);
        await Axios.post("http://localhost:5000/api/signin", {
            username: 'Todd',
            email: 'todd@mail.com',
            password: '1234'
        }, {
        headers: {
            'Content-Type': 'application/json'
          },
           withCredentials: true}
        )
        .then(response => {
            console.log('response: ' + JSON.stringify(response.data))
            // console.log(response.data.userInfo)
            setUser(response.data.userInfo)
            // refreshUser();
            
        })
        .catch(error => {
            console.log(error.message)
            // setIsLoading(true)
        })
    }

        
    useEffect(() => {
        refreshUser();




        // return () => {setIsLoading(true)}

    },[])





    return (
        <div>
        {!user ? 
            <button onClick={getUser}>Signin</button>
        : <button onClick={signOutUser}>Signout</button>    }
             {/* {user  && <>{mapUser()}</>} */}
        <h2>Signin Page</h2>
        <pre>{user ? JSON.stringify(user, null, 2): 'USER'}</pre>
        
     

        </div>

       
    )
}

export default Signin
