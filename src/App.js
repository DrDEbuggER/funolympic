import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { FunLandingPage } from './Container';
import { FunBroadcast } from './Container';
import { SignupComponent, LoginComponent, VerifyComponent } from './Components';
import { FunAuthContextProvider } from './FunContext';
import { FunProtectedRoute, FunRestrictedRoute } from './FunProtectedRoute';
import { FunRestrictVerificationRoute } from './FunProtectedRoute/FunRestrictVerificationRoute';

function App() {
  return (
    <div className="App__container">
      <FunAuthContextProvider>
        <Router>
          <Routes>
            <Route element={<FunProtectedRoute/>} >
              {/* For broadcast */}
              <Route path="/broadcast" element={<FunBroadcast pageName="home"/>}/> 
              <Route path="/score" element={<FunBroadcast pageName="score"/>}/> 
              <Route path="/news" element={<FunBroadcast pageName="news"/>}/> 
              <Route path="/highlights" element={<FunBroadcast pageName="highlights"/>}/> 
              <Route path="/profile" element={<FunBroadcast pageName="profile"/>}/> 
              <Route path="/broadcast/watch" element={<FunBroadcast pageName="watch"/>}/> 
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
          </Routes>
        </Router>
      </FunAuthContextProvider>
    </div>
  );
}

export default App;
