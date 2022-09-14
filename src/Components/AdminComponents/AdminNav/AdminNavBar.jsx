import React from 'react'
import './AdminNavBar.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { ChatBubbleOutlineOutlined, NotificationAddOutlined } from '@mui/icons-material';
export const AdminNavBar = () => {
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
          <div className="fun__adminNavbarItem">
            <ChatBubbleOutlineOutlined className='icon'/>
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
