import './FunNavBar.css';
import Logo from "../../../assets/images/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { FunDropDown } from '../../CommonComponents';
import { Link } from 'react-router-dom';

export const FunBroadcastNavBar = ({navColor, btnText, toPage, userName}) => {
    let funNavStyle = {
        backgroundColor: navColor
    }
    const [showProfileDrop, setShowProfileDrop] = useState(false)
    const HandleProfileDrop = () => {
        setShowProfileDrop(!showProfileDrop)
    }
    return (
        <div className='fun__navBar'>
            <div className="fun__navBarContainer" style={funNavStyle}>
                <div className='fun__navWrapper'>
                    <div className='fun__navBarStart'>
                        <div className='fun__navLogo'>
                            <img src={Logo}/>
                        </div>
                    </div>
                    <div className='fun__navBarMid'>
                        <div className='fun__navItems'>
                            <ul>
                                <li><Link to={`/broadcast`}>Home</Link></li>
                                <li><Link to={`/livegames`}>Live Games</Link></li>
                                <li><Link to={`/highlights`}>Highlights</Link></li>
                                <li><Link to={`/news`}>News</Link></li>
                                <li><Link to={`/score`}>Score</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className='fun__navBarEnd'>
                        <div className='fun__navEndItems'>
                            <div className='fun__liveProfileBtn' onClick={HandleProfileDrop}>
                                <div className='fun__profileBtn'>
                                    <AccountCircleIcon sx={{width: 35, height: 35, color: "white"}}/>
                                    <p>{userName}</p>
                                    <KeyboardArrowDownOutlined sx={{color: "whitesmoke"}}/>
                                </div>
                                {
                                showProfileDrop ? 
                                    <div className='fun__dropWrapper'>
                                        <FunDropDown />
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}