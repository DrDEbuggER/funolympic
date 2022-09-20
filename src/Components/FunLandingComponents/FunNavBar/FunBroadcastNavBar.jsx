import './FunNavBar.css';
import Logo from "../../../assets/images/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { FunDropDown } from '../../CommonComponents';

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
                                <li><a href='/'>Home</a></li>
                                <li><a href='/'>Live Games</a></li>
                                <li><a href='/'>Highlights</a></li>
                                <li><a href='/'>News</a></li>
                                <li><a href='/'>Score</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='fun__navBarEnd'>
                        <div className='fun__navItems'>
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