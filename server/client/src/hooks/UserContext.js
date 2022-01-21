import { createContext } from "react";
import Axios from 'axios';

const logged = async () => {
    await Axios.get("http://localhost:5000/api/isUserLoggedIn", { withCredentials: true,  
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
    .then(response => {
        // console.log(response.data)
        console.log('response: ' + JSON.stringify(response.data));

        if(response.data.success === true){
          return(response.data.userInfo);
         

        }

        
    })
    .catch(error => {
        console.log(error.message);
        
        
        return null
    })
}



export const UserContext = createContext(logged);

export const LoadingContext = createContext(false)









