import React, { useState } from 'react'
import './AdminNavBar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { ChatBubbleOutlineOutlined, NotificationAddOutlined } from '@mui/icons-material';
import { FunDropDown, FunMessageDropDown } from '../../CommonComponents';
import { collection, limitToLast, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
export const AdminNavBar = () => {
  const queryRef = collection(firestore, "BadActivity")
  // const queryRef = collection(firestore, "livechat","Ju6NdmCCF23yOq8xSqbJ","football")
  
  const chatQuery = query(queryRef)
  const [badComment, loading] = useCollection(chatQuery);
  console.log("badcomment",badComment)
  const [hideMessage, setHideMessage] = useState()
  const HandleMessageBox = () => {
    setHideMessage(!hideMessage)
  }
  return (
    <div className='fun_adminNavbarContainer'>
      <div className="fun_adminNavbarWrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className='icon'/>
        </div> */}
        <div className="fun__adminNavbarItems">
          <div className="fun__adminNavbarItem">
            <LanguageOutlinedIcon/>
            English
          </div>
          <div className="fun__adminNavbarItem">
            <NotificationAddOutlined className='icon'/>
          </div> 
          <div className={`fun__adminNavbarItem fun__adminMessageBox`} onClick={HandleMessageBox}>
            <ChatBubbleOutlineOutlined className='icon'/>
            <FunMessageDropDown className={hideMessage ? `hideMsgBox`:""} loading={loading} data={badComment}/>
          </div>  
          <div className="fun__adminNavbarItem">
            <div className="fun__profileCircle">
                <img src='https://avatars.dicebear.com/api/adventurer/hackerworld.svg' alt='' className='avatar' />
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}
