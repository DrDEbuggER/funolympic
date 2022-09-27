import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { FunLandingPage } from './Container';
import { FunBroadcast } from './Container';
import { SignupComponent, LoginComponent, VerifyComponent, FunForgotPassword } from './Components';
import { FunAuthContextProvider } from './FunContext';
import { FunBannedRoute, FunProtectedRoute, FunRestrictedAdminRoute, FunRestrictedRoute } from './FunProtectedRoute';
import { FunRestrictVerificationRoute } from './FunProtectedRoute/FunRestrictVerificationRoute';
import { FunAdminPanel } from './Container/FunAdminPanel/FunAdminPanel';

function App() {
  return (
    <div className="App__container">
      <FunAuthContextProvider>
        <Router>
          <Routes>
            <Route element={<FunBannedRoute />}>
              <Route path="/banned" element={<FunBroadcast pageName="banned"/>}/>   
              <Route path="/logout" element={<FunBroadcast pageName="logout"/>}/>
            </Route>

            <Route element={<FunProtectedRoute/>} >
              {/* For broadcast */}
              <Route path="/broadcast" element={<FunBroadcast pageName="home"/>}/>
              <Route path="/livegames" element={<FunBroadcast pageName="live"/>}/> 
              <Route path="/score" element={<FunBroadcast pageName="score"/>}/> 
              <Route path="/news" element={<FunBroadcast pageName="news"/>}/> 
              <Route path="/highlights" element={<FunBroadcast pageName="highlights"/>}/> 
              <Route path="/profile" element={<FunBroadcast pageName="profile"/>}/> 
              <Route path="/signout" element={<FunBroadcast pageName="logout"/>}/>
              <Route path="/broadcast/watch/:videoID" element={<FunBroadcast pageName="watch"/>}/>
              <Route path="/highlights/watch/:postID" element={<FunBroadcast pageName="hWatch"/>}/>
              <Route path="/news/post/:postID" element={<FunBroadcast pageName="hNews"/>}/>
              <Route path="/changepass" element={<FunBroadcast pageName="changepass"/>}/>  
            </Route>
            <Route element={<FunRestrictedRoute />}>
              {/* For Login Signup */}
              <Route path="/signup" element={<SignupComponent/>} />    
              <Route path="/login" element={<LoginComponent/>} />   
            </Route>
            <Route element={<FunRestrictVerificationRoute />}>
              {/* For Verification: seperate restricted route to fix unlimited useEffect call issue */}
              <Route path="/verify" element={<VerifyComponent/>} />
              
            </Route>
           
            <Route path="/" element={<FunLandingPage/>} />
            <Route path="/reset" element={<FunLandingPage pageName={"reset"}/>} />
            
            {/* Admin Route */}
            <Route element={<FunRestrictedAdminRoute />}>
              <Route path="/admin/dashboard" element={<FunAdminPanel pageName="dashboard"/>} />
              <Route path="/admin/users" element={<FunAdminPanel pageName="users"/>} />
              <Route path="/admin/highlights/upload" element={<FunAdminPanel pageName="uploadHighlights"/>} />
              <Route path="/admin/highlights/all" element={<FunAdminPanel pageName="allHighlights"/>} />
              <Route path="/admin/highlights/update/:videoID" element={<FunAdminPanel pageName="uploadHighlights"/>} />
              <Route path="/admin/live/upload" element={<FunAdminPanel pageName="uploadLive"/>} />
              <Route path="/admin/live/all" element={<FunAdminPanel pageName="allLives"/>} />
              <Route path="/admin/live/update/:videoID" element={<FunAdminPanel pageName="uploadLive"/>} />
              <Route path="/admin/news/post" element={<FunAdminPanel pageName="newsPost"/>} />
              <Route path="/admin/news/all" element={<FunAdminPanel pageName="allNews"/>} />
              <Route path="/admin/news/update/:postID" element={<FunAdminPanel pageName="newsPost"/>} />
              <Route path="/admin/profile" element={<FunAdminPanel pageName="adminProfile"/>} />
            </Route>
          </Routes>
        </Router>
      </FunAuthContextProvider>
    </div>
  );
}

export default App;
