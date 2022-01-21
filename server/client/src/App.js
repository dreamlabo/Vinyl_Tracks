
import './App.css';
import './header_styles.css'
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Axios from 'axios';

import Home from './pages/home/Home';
import Register from './pages/Register';
import Testpage from './pages/Testpage';
import Signin from './pages/Signin';
import { UserContext, LoadingContext } from './hooks/UserContext';
import AddAlbumToCollection from './pages/AddAlbumToCollection';
import ViewCollection from './pages/viewAlbumCollection/ViewCollection';
import CollectionsView from './pages/collectionsView/CollectionsView';
import PrivateRoute from './pages/PrivateRoute';
function App() {

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








  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const providerUserValue = useMemo(() => ({user, setUser}), [user, setUser]);
  const providerIsLoading = useMemo(() => ({isLoading, setIsLoading}), [isLoading, setIsLoading]);



  // const [data, setData] = React.useState(null);



  // React.useEffect(() => {
  //   fetch("http://localhost:5000/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <Router>
    {/* <LoadingContext.Provider value={providerIsLoading}> */}
 
     

      <UserContext.Provider value={providerUserValue}>
       
     
          <nav className='main-nav-bar__container'> 
          <div className='main-nav-bar__links-container flex'>

              <div className='main-nav-bar__logo'>
                <Link to="/">Vinyl Tracks</Link>
              </div>

            <ul className='main-nav-bar__links'>
              
              

                  <li className='main-nav-bar__link'>
                    <Link to="/test">Test</Link>
                  </li>

                  {!user ? 
                          <li className='main-nav-bar__link'>
                            <Link to="/signin">Signin</Link>
                          </li>
                        : 
                          <></>
                  }
                  {user ? 
                          <div>
                            <li>
                              <Link to="/addAlbumToCollection">Add Album to Collection</Link>
                            </li>
                            <li>
                              <Link to="/albumCollections">Collections</Link>
                            </li>
                          </div>
                        :
                          <></>
                  }
                  {user ? 
                          <li>
                            <Link to="/signin">Signout</Link> 
                          </li>
                        :  
                          <button className='main-nav-bar__signin-button'><Link to="/register">Signup</Link> </button>
                        
                  }
            

            </ul>
            </div>
          </nav>
       

     
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/albumCollections' element={<PrivateRoute/>}>
                  <Route path='/albumCollections' element={<CollectionsView/>}/>
          </Route>
          <Route path='/register' element={<Register/>} />
          <Route path='/test' element={<Testpage/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/addAlbumToCollection' element={<AddAlbumToCollection/>} />
          {/* <Route path='/viewAlbumCollection' element={<ViewCollection/>} /> */}
        </Routes>
      </UserContext.Provider>
      {/* </LoadingContext.Provider> */}
      
    </Router>

  );
}

export default App;
