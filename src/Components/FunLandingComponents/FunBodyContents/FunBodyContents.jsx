import './FunBodyContents.css';
import { FunButton, FunVideoPlayer } from '../../CommonComponents';
export function FunBodyContents() {
    return (
        <div className="fun__bodySections">
            <section className="fun__bodyHome" id="fun__bodyHome">
                <div className="fun__bodyHomeContainer">
                    <div className="fun__bodyHomeDesc">
                        <div className="fun__descText">
                            <h1>Bayjing Fun Olympics 2022</h1>
                            <p>We provide you a online broadcast platform to watch live events from fun FunOlympic 2022</p>
                        </div>
                        <div className="fun__descBtn">
                            <FunButton text={"Login"} toPage="/login"/>
                            <FunButton text={"Register"} toPage="/signup"/>
                        </div>
                    </div>
                    <div className="fun__bodyHomePromo">
                        {/* <FunVideoPlayer url="https://youtu.be/Rwk5PdpTxSU" 
                        type="promo" 
                        width="100%"
                        height="100%"
                        control= {false}
                        /> */}
                        <FunVideoPlayer url="https://firebasestorage.googleapis.com/v0/b/bayjingfunolympic2022.appspot.com/o/files%2Fjohn_sherchan%20.mp4?alt=media&token=29e605ab-f063-46e4-80c8-4d163487ff95" 
                        type="promo" 
                        width="100%"
                        height="100%"
                        control= {true}
                        />
                        
                    </div>
                </div>
            </section>
            <section className="fun__bodyScore" id="fun__bodyScore">
            </section>
        </div>
    )
}