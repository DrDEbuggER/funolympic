import { FunButton } from '../../CommonComponents';
import './FunNavBar.css';
import Logo from "../../../assets/images/logo.png"

export const FunAuthNavBar = ({btnText, toPage}) => {
    return (
        <div className='fun__navBar'>
            <div className="fun__navBarContainer">
                <div className='fun__navWrapper'>
                    <div className='fun__navBarStart'>
                        <div className='fun__navLogo'>
                            <img src={Logo} alt=''/>
                        </div>
                        
                    </div>
                    <div className='fun__navBarMid'>
                        <div className='fun__navItems'>
                            <ul>
                                <li><a href='/'>Home</a></li>
                                <li><a href='/'>Score</a></li>
                                <li><a href='/'>News</a></li>
                                <li><a href='/'>Highlights</a></li>
                                <li><a href='/'>Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='fun__navBarEnd'>
                        <div className='fun__navEndItems'>
                            <div className='fun__liveBtn'>
                                <FunButton 
                                    text={btnText}
                                    toPage={toPage}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}