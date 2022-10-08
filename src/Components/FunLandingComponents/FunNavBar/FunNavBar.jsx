import { FunButton } from '../../CommonComponents';
import './FunNavBar.css';
import Logo from "../../../assets/images/logo.png"

export const FunNavBar = () => {
    return (
        <div className='fun__navBar'>
            <div className="fun__navBarContainer">
                <div className='fun__navWrapper'>
                    <div className='fun__navBarStart'>
                        <div className='fun__navLogo'>
                            <img src={Logo}/>
                        </div>
                        
                    </div>
                    <div className='fun__navBarMid'>
                        <div className='fun__navItems'>
                            <ul>
                                <li><a href='/#home'>Home</a></li>
                                <li><a href='/#score'>Score</a></li>
                                <li><a href='/#news'>News</a></li>
                                <li><a href='/#highlights'>Highlights</a></li>
                                <li><a href='/#contact'>Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='fun__navBarEnd'>
                        <div className='fun__navEndItems'>
                            <div className='fun__liveBtn'>
                                <FunButton 
                                    text={"Watch Live"}
                                    toPage={"/landing"}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}