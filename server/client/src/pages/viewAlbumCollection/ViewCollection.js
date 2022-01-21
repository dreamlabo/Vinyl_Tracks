import './viewAlbumCollection_styles.css'
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, LoadingContext } from '../../hooks/UserContext';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import ArtistTab from './components/ArtistTab';



class HashTable {
    constructor() {
        this._artistArray = [];
        this._length = 0;
        this._artistNameArray = []
    }

    set(key, value ) {
        if(!this._artistArray[key]){
            this._artistArray[key] = [];
            this._artistNameArray.push(key)
            this._length++;
        }

        this._artistArray[key].push(value);
        // console.log(this._artistArray[key])
    }

    get(key){
        return this._artistArray[key]
    }
}


const ViewCollection = ({viewTitle}) => {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { user, setUser } = useContext(UserContext);
    const [albums, setAlbums ] = useState([])
  

    // const VIEW_TITLE = 'Artist View';
    


    const mapAlbums = () => {
        if(user) {
            const albumMap = new HashTable;
            try{
            user.albums.map((album ) => {
                albumMap.set(album.artistName, album)
            })
            // console.log(albumMap);
            return albumMap;
        }
        catch(error){
            console.log(error)
        }
    }
    }

    const renderArtistTabs = () => {
        if(user) {
            const artistAlbums = mapAlbums();
            const artistKeys = artistAlbums._artistNameArray;

            return artistKeys.map((artist, index) => {
                 return <ArtistTab albums={artistAlbums._artistArray[artist]} 
                                   artistName={artist}
                                    key={index + artist}
                        />
            })        
        }
    }


    const sortByArtistName = ((a, b) => {
        const artistA = a.artistName.toUpperCase();
        const artistB = b.artistName.toUpperCase();
        // console.log('hello')
        
        if(artistA > artistB) {
            return 1;
        }
        else if (artistA < artistB){
            return -1
        }
        else {
            return 0;
        }
    });
        



    
    const refreshUser = async () => {
        // setUser(null);
        await Axios.get("http://localhost:5000/api/isUserLoggedIn", { withCredentials: true,  
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(response => {
            // console.log(response.data)
            // console.log('response: ' + JSON.stringify(response.data));
  
            if(response.data.success === true){
                setUser(response.data.userInfo);
                // let albumHash = new HashTable(user.albums.length);
                const artistAlbums = response.data.userInfo.albums.sort(sortByArtistName);
                console.log(artistAlbums);
                setAlbums(artistAlbums);
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

        
    useEffect(() => { 
        refreshUser();
    },[])

    return (
        <div className='viewAlbumCollection-outer-container'>

            <h1 className='viewAlbumCollection-header'>{viewTitle}</h1>
            
            <>
                {renderArtistTabs()}
            </>

        </div>
    )
}

export default ViewCollection;