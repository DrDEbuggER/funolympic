import { Navigate } from 'react-router-dom';
import { FunNavBar, FunBodyContents } from '../../Components';
import { auth } from '../../firebase';
import { FunUserAuth } from '../../FunContext';
import './FunLandingPage.css';
export function FunLandingPage(props) {
  const {funUser, loading} = FunUserAuth();
  const ReloadPage = () => {
    auth.signOut()
    return <Navigate to="/" />
  }
  return (
    loading? "" :
    funUser && !funUser.emailVerified ? ReloadPage():
    funUser && funUser.emailVerified? <Navigate to="/broadcast" />:
    <div className="fun__landingPage">
        <FunNavBar />
        <FunBodyContents />
    </div>
  );
}