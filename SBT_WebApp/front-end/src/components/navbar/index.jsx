import React from 'react'
import Logo from "../../assets/logo.svg"
import Dots from "../../assets/dots.svg"
import UserProfile from "../../assets/user-profile.png"
import "./index.css"
import AppTab from '../tabs'

export default function Navbar({PAGES=[],activeTab,handleTabClick}) {

  return (
    <nav className="app-navbar">
      <div className="app-navbar__left" >
          <div className="app-logo">
              <img src={Logo} alt="" />
          </div>
          <div className="navbar-tabs-container" >
            {
              PAGES.map((page)=>(
                  <AppTab tab={page} activeTab={activeTab} handleClick={handleTabClick} key={page.id} />
              ))
            }
          </div>
      </div>
        <div className="navbar-settings">
                <div>
                    <img src={UserProfile} alt="" />
                </div>
                <div>
                    <img src={Dots} alt="" />
                </div>
        </div>
    </nav>
  )
}
