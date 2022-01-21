import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import Axios from 'axios';


const AddAlbumToCollection = () => {

    const { user, setUser } = useContext(UserContext);

const addAlbum =  async () => {

    await Axios.post('http://localhost:5000/api/addAlbumToCollection', {
            artistName: "Dream Theater",
            albumName: "Images and Words"  
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(response => {
                console.log(response)
                setUser(response.data.userInfo)
            })
            .catch(error => {
                console.log(error)
            })
}




    return (
        <div>
            <h1>Add Album to Collection</h1>
            <button onClick={addAlbum} >Add Album</button>
        </div>
    )
}


export default AddAlbumToCollection;
