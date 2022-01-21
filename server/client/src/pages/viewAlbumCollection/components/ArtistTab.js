import React, { useEffect, useState } from 'react'
import '../viewAlbumCollection_styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import AlbumTab from './AlbumTab'


const ArtistTab = ({artistName, albums}) => {

    const [albumIsShown, setAlbumIsShown] = useState(false)

    const artistAlbumsObj = {
        artistName: '',
        albums: []
    }

    const setIsShown = () => {
        setAlbumIsShown(albumIsShown => !albumIsShown)
    }

    const displayAlbumsTab = () => {
        // console.log(albums)
        albums.sort(sortByAlbumName);

        return albums.map(album => {       
            return ( 
                <AlbumTab albumInfo={album} key={album._id}/>
            )
        })
    }



    const sortByAlbumName = ((a, b) => {
        const artistA = a.albumName.toUpperCase();
        const artistB = b.albumName.toUpperCase();
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


    useEffect(() => {

    },[albumIsShown]);


    return (
        <div className='viewAlbumCollection__artist-wrapper' >
            <h1 onClick={setIsShown}>  
                <span tabIndex='0'
                      className='viewAlbumCollection__span-icon'>
                      {albumIsShown ?  <FontAwesomeIcon icon={faCaretUp}/>:  <FontAwesomeIcon icon={faCaretDown}/>} 
                </span>
                {artistName}
            </h1>
            {albumIsShown ? <div>{displayAlbumsTab()}</div> : null}
        </div>
    )
}

export default ArtistTab
