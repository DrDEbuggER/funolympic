import './FunBodyContents.css';
import { FunButton, FunLightButton, FunVideoCardBox, FunVideoPlayer } from '../../CommonComponents';
import { FunLandingScore } from '../../FunBroadcastComponents';
import { AdminAllNews } from '../../AdminComponents';
import { collection, getDocs, limitToLast, orderBy, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { firestore } from '../../../firebase';
import { useState } from 'react';
export function FunBodyContents() {
    const [newsData, setNewsData] = useState([])
    const [videoData, setVideoData] = useState([])
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    // Query Latest News
    const QueryLatestRecord = async(setData, docPath) => {
        const queryRef = query(collection(firestore, docPath), orderBy("uploadedAt","asc"), limitToLast(4))
        let vData = [];
        await getDocs(queryRef).then((snap)=>{
            snap.docs.forEach((doc)=> {
                vData.push(doc.data())
            })
            setData(vData)
        })
    }

    useEffect(()=>{
        QueryLatestRecord(setNewsData, "news")
        QueryLatestRecord(setVideoData, "highlights")
    },[])

    return (
        <div className="fun__bodySections">
            <section className="fun__bodyHome" id="home">
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
            <section className="fun__bodyScore" id="score">
                <div className='fun__landingScoreSection'>
                    <div className='fun__landingSectionTitle'>
                        <h3>Watch Game Results FunOlympic 2022</h3>
                    </div>
                    <FunLandingScore game={`football`}
                                     date={`2022-09-17`}   
                                     teamA={`Brazil`}
                                     teamB={`Germany`}
                                     scoreA={1}
                                     scoreB={0}
                                     flagA={`br`}
                                     flagB={`de`}
                                        />
                    <FunLandingScore game={`Hockey`}
                                     date={`2022-09-15`}   
                                     teamA={`India`}
                                     teamB={`Australia`}
                                     scoreA={5}
                                     scoreB={6}
                                     flagA={`in`}
                                     flagB={`au`}
                                        />
                    <FunLandingScore game={`Volleyball`}
                                     date={`2022-09-13`}   
                                     teamA={`Japan`}
                                     teamB={`England`}
                                     scoreA={2}
                                     scoreB={3}
                                     flagA={`jp`}
                                     flagB={`gb-eng`}
                                        />
                    <FunLandingScore game={`Basketball`}
                                     date={`2022-09-11`}   
                                     teamA={`USA`}
                                     teamB={`Greece`}
                                     scoreA={115}
                                     scoreB={99}
                                     flagA={`us`}
                                     flagB={`gr`}
                                        />
                </div>
                <p className='fun__seeMore'>See more</p>
            </section>
            <section className="fun__bodyNews" id="news">
                <div className='fun__landingNewsWrapper'>
                    <div className='fun__landingNewsBrief'>
                        <h3>News | FunOlympics 2022</h3>
                        <p>Discover all the latest updates of FunOlympic 2022 Bayjing games</p>
                    </div>
                    <div className='fun__landingNews'>
                        {
                            newsData && newsData.map((nDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    videoID={nDat.postID}
                                    thumbnail={nDat.thumbnail}
                                    vidTitle={nDat.newsTitle}
                                    newsDesc={nDat.newsDesc}
                                    vidEvent={nDat.eventType}
                                    category={nDat.category}
                                    isLanding={true}
                                    // onEditClick={HandleEdit}
                                    // onDeleteClick={HandleDelete}
                                    />
                            })
                        }
                    </div>
                </div>
                <h3>For More News Information</h3>
                <p className='fun__seeMore'>See more</p>
            </section>
            <section className="fun__bodyHighlights" id="highlights">
            <div className='fun__landingHighlightWrapper'>
                    <div className='fun__landingNewsBrief'>
                        <h3>Highlights | FunOlympics 2022</h3>
                        <p>Find all the latest Highlights of FunOlympic 2022 Bayjing games</p>
                    </div>
                    <div className='fun__landingNews'>
                        {
                            videoData && videoData.map((vDat, idx) => {
                                return <FunVideoCardBox key={idx}
                                    videoID={vDat.postID}
                                    thumbnail={vDat.thumbnail}
                                    vidTitle={vDat.videoTitle}
                                    vidEvent={vDat.eventType}
                                    category={vDat.category}
                                    isLanding={true}
                                    isVideo={true}
                                    // onEditClick={HandleEdit}
                                    // onDeleteClick={HandleDelete}
                                    />
                            })
                        }
                    </div>
                </div>
                <h3>For More Highlights Video</h3>
                <p className='fun__seeMore'>See more</p>
            </section>
            <section className="fun__bodyContactUs" id="contact">
                <div className='fun__bodyContactBrief'>
                    <p>hello</p>
                </div>
                <div className='fun__bodySpare'>
                    <img src='https://cdn.punchng.com/wp-content/uploads/2018/08/02121857/track-race.png' />
                    <div className='fun__contactUsOverlay'></div>
                </div>
                <div className="fun__contactWrapper">
                    <div className="fun__fixContactWidth">
                        <form className="fun__contactForm">
                            <h3>Contact US</h3>
                            <div className="vid__uploadInput">
                                <label>FullName</label>
                                <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setFullName(e.target.value)} value={fullName} required></input>
                            </div>
                            <div className="vid__uploadInput">
                                <label>Email</label>
                                <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                            </div>
                            <div className="vid__uploadInput">
                                <label>Description</label>
                                <textarea className='vid__uploadDesc'  rows={6} onChange={(e)=>setMessage(e.target.value)} value={message} required></textarea>
                            </div>
                            <div className="vid__sendReset">
                                <p>{error ? error : "" }</p>
                                <FunLightButton btnLabel={"Send Message"} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}