import React, { useState} from 'react'
import '../viewAlbumCollection_styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faStar, faStarHalf, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import AlbumCoverPicture from '../../../images/RageForOrder.jpg'
import useMediaQuery from '../../../hooks/UseMediaQuery'



const AlbumTab = ({ albumInfo }) => {

   const [isAlbumDetailsShown, setIsAlbumDetailsShown] = useState(false);
   const isDesktop = useMediaQuery('(min-width: 1300px)');
   

    const changeStateOnClick = () => {
        setIsAlbumDetailsShown(isAlbumDetailsShown => !isAlbumDetailsShown)
        // console.log('show album details')
    } 



    const renderAlbumTab = () => {
        return (
            <h2  className='albumTab__album-tab-closed__container'  
                 onClick={changeStateOnClick}> 
                 <span tabIndex='0'  className='viewAlbumCollection__span-icon'>
                     <FontAwesomeIcon icon={faCaretDown} />
                 </span>
                 {albumInfo.albumName}
            </h2>)

    }

    const renderAlbumDetailsDesktop = () => {
        return (
            <section className='albumTab__album-tab-open__container'  onClick={changeStateOnClick}>
                <span tabIndex='0' className='viewAlbumCollection__span-icon cursor'>
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>

                <div className='albumTab__album-details-main-container'> 
             
                    <img  className='albumTab__album-cover-picture' src={ AlbumCoverPicture} alt='album cover'></img>   
                  
                    <h2 className='albumTab__grid-row-one albumTab__font-size albumTab__font-weight__semi-bold'>{albumInfo.artistName}</h2>
                    <h2 className='albumTab__grid-row-one albumTab__font-size albumTab__font-weight__regular'> {albumInfo.albumName}</h2>

                    <div className='albumTab__stars-container albumTab__grid-row-one column-margin albumTab__font-size'>
                        <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                        <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                        <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                        <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                        <FontAwesomeIcon className='albumTab__star'icon={faStarHalfStroke} />
                    </div>

                    <p className='albumTab__release-year'>2015</p>

                    <div className='albumTab__grid-row-two'>
                        <h3>Purchase Info</h3>
                            <ul>
                                <li>Date: June 7, 2020</li>
                                <li>At: Twist and Shout</li>
                                <li>Price: $10.00</li>
                            </ul>
                    </div>

                    <div className='albumTab__grid-row-two' >
                        <h3>Condition</h3>
                            <ul>
                                <li>Vinyl: Fair</li>
                                <li>Sleeve: Fair</li>
                            </ul>   
                    </div> 
                
                    <div className='albumTab__grid-row-two column-margin'>
                        <h3>Genre</h3>
                            <ul>
                                <li>Progressive Metal</li>
                                <li>Rock</li>
                                <li>Metal</li>
                            </ul>
                    </div>

                    <div className='albumTab__notes-container albumTab__grid-row-three' >
                        <h3>Notes</h3>
                        <ul>
                            <li>Here are some additional notes about the album or artist or release information, etc.</li>
                        </ul> 
                    </div>

                    <div className='albumTab__button-container albumTab__grid-row-three column-margin '>
                        <button className='albumTab__button'>Edit Album</button>
                        <button className='albumTab__button'>Delete Album</button>
                    </div>

                </div> 
        </section>)

    }

    const renderAlbumDetailsMobile = () => {
        return (
        <section className='albumTab__album-tab-open__container'  onClick={changeStateOnClick}>
                <span className='viewAlbumCollection__span-icon cursor'>
                    <FontAwesomeIcon icon={faCaretUp} />
                </span>

                <div className='albumTab__album-details__mobile-container'>
                      
                    <div className='albumTab__album-header-info'>
                    <img  className='albumTab__album-cover-picture-mobile' src={ AlbumCoverPicture} alt='album cover'></img>
                      
                        <h2 className='albumTab__artist-name__mobile albumTab__font-weight__semi-bold'>{albumInfo.artistName}</h2>
                        <h2 className='albumTab__album-name__mobile albumTab__font-weight__regular'>{albumInfo.albumName}</h2>
                        <div  className='albumTab__stars__mobile-container'>
                            <span>
                                <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                                <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                                <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                                <FontAwesomeIcon className='albumTab__star' icon={faStar} />
                                <FontAwesomeIcon className='albumTab__star'icon={faStarHalfStroke} />
                            </span>
                            <span>1986</span>
                        </div>
                    </div>

                    
                    <div className=''>
                        <h3 className='albumTab__list-headings__mobile'>Genre</h3>
                            {/* <ul>
                                <li>Progressive Metal</li>
                                <li>Rock</li>
                                <li>Metal</li>
                            </ul> */}
                            <div className='albumTab__list-items__mobile'>
                                <span>Progressive Metal, </span>
                                <span>Rock, </span>
                                <span>Metal</span>
                            </div>
                    </div>

                    <div className='' >
                        <h3 className='albumTab__list-headings__mobile'>Condition</h3>
                            <ul className='albumTab__list-items__mobile'>
                                <li>Vinyl: Fair</li>
                                <li>Sleeve: Fair</li>
                            </ul>   
                    </div> 

                    <div className=''>
                        <h3 className='albumTab__list-headings__mobile'>Purchase Info</h3>
                            <ul className='albumTab__list-items__mobile'>
                                <li>Date: June 7, 2020</li>
                                <li>At: Twist and Shout</li>
                                <li>Price: $10.00</li>
                            </ul>
                    </div>

                    
                    <div className='' >
                        <h3 className='albumTab__list-headings__mobile'> Notes</h3>
                        <ul className='albumTab__list-items__mobile' >
                            <li>Here are some additional notes about the album or artist or release information, etc.</li>
                        </ul> 
                    </div>

                    <div className='albumTab__button-container__mobile'>
                        <button className='albumTab__button__mobile'>Edit </button>
                        <button className='albumTab__button__mobile'>Delete</button>
                    </div>

               
               
               
                </div>
            
        </section>
        )

    }

    const determineRender = () => {
        if(isAlbumDetailsShown && isDesktop) {
            return renderAlbumDetailsDesktop();

        }
        else if(isAlbumDetailsShown && !isDesktop) {
            return renderAlbumDetailsMobile();
        }
        return renderAlbumTab();
    }



    return (
        <>
            {determineRender()}
            
            {/* {isAlbumDetailsShown && isDesktop ? 
                        <div>{renderAlbumDetailsDesktop()}</div>
                       
                        : 
                        <div>{renderAlbumTab()}</di
        } */}
        </>
     
    )
}

export default AlbumTab
