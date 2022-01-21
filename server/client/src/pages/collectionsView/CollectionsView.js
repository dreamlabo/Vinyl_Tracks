import React, { useState, useEffect, useContext } from 'react';
import { UserContext, LoadingContext } from '../../hooks/UserContext';
import ViewCollection from '../viewAlbumCollection/ViewCollection';
import './collectionsView_styles.css';
import Axios from 'axios';



const CollectionsView = () => {

    const ARTIST_VIEW = 'Artist View';
    const ALBUM_VIEW = 'Album View';
    const GENRE_VIEW = 'Genre View';
    const RELEASE_YEAR_VIEW = 'Album Release Year View';
    const ARTIST_VIEW_WANTED_LIST = 'Wanted List Album View';
    const ALBUM_VIEW_WANTED_LIST = 'Wanted List Artist View';

    const [viewTitle, setViewTitle] = useState(ARTIST_VIEW);

    const { user, setUser } = useContext(UserContext);

    const setViewTitleHandler = (viewName => {
        // setViewTitle(viewName);
        console.log('clicked')
    });

    const refreshUser = async () => {
        await Axios.get("http://localhost:5000/api/isUserLoggedIn", { withCredentials: true,  
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
        .then(response => {
            // console.log(response.data)
            // console.log('response: ' + JSON.stringify(response.data));
  
            if(response.data.success === true){
                setUser(response.data.userInfo);
                // let albumHash = new HashTable(user.albums.length);
                // const artistAlbums = response.data.userInfo.albums.sort(sortByArtistName);
                // console.log(artistAlbums);
                // setAlbums(artistAlbums);
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
        // refreshUser();
    },[])
    

    return (
        
        <div className='collections-view__main-container'>
            <section className='collections-view__navigation-container'> 
                <nav className='collections-view__nav-links-container'>
                    <h3>Collection Views</h3>
                    <ul>
                        <li tabIndex='0' onClick={() => setViewTitle(ARTIST_VIEW)} className={`collectionView__li ${viewTitle === ARTIST_VIEW ? 'cv__active-li' : ''}`}>Artist</li>
                        <li tabIndex='0' onClick={() => setViewTitle(ALBUM_VIEW)}  className={`collectionView__li ${viewTitle === ALBUM_VIEW ? 'cv__active-li' : ''}`}>Album</li>
                        <li tabIndex='0' onClick={() => setViewTitle(GENRE_VIEW)} className={`collectionView__li ${viewTitle === GENRE_VIEW ? 'cv__active-li' : ''}`}>Genre</li>
                        <li tabIndex='0' onClick={() => setViewTitle(RELEASE_YEAR_VIEW)} className={`collectionView__li ${viewTitle ===RELEASE_YEAR_VIEW ? 'cv__active-li' : ''}`}>Release Year</li>
                    </ul>

                    <h3>Wanted List</h3>
                    <ul>
                        <li tabIndex='0' 
                            onClick={() => setViewTitle(ARTIST_VIEW_WANTED_LIST)} 
                            className={`collectionView__li ${viewTitle === ARTIST_VIEW_WANTED_LIST ? 'cv__active-li' : ''}`}>
                            Artist
                        </li>
                        <li tabIndex='0' 
                            onClick={() => setViewTitle(ALBUM_VIEW_WANTED_LIST)}  
                            className={`collectionView__li ${viewTitle === ALBUM_VIEW_WANTED_LIST ? 'cv__active-li' : ''}`}>
                            Album
                        </li>
                    </ul>

                </nav>
            </section>

            
            
            <section className='collection-view__view-main-container'>
                <ViewCollection viewTitle={viewTitle}/>
            </section>
            
        </div>
    )
}

export default CollectionsView
