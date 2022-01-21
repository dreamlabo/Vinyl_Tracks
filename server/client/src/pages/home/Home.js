import React, { useContext }  from 'react';
import { UserContext } from '../../hooks/UserContext';
import './home_style.css';
import RecordPlayerImage from '../../images/RecordPlayerBckd.jpg';


const Home = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <section className='home-page__main-container'>
            <div className='home-page__items-container'>
            <div className='home-page__left-side'>
                <h1 className='home-page__title'>Track <br/> All <br/> Things <br/> Vinyl</h1>
                <p className='home-page__sub-heading'>The best place to keep track of your vinyl collections.</p>
                <button className='home-page__button'>Signup</button>
            </div>

            <div className='home-page__right-side'>
                <div className='home-page__right-side__image-container'>
                    <img src={RecordPlayerImage} alt='turntable and record'/>
                </div>
            </div>
                {/* {user ? <>
                         {console.log('User: ' + JSON.stringify(user))}
                
                        <p>Hello {user.username}  </p>
                         </>
                     :  <p>No User</p>
                } */}
            </div>
        </section>
        
    )
}

export default Home
