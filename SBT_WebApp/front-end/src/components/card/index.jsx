import React from 'react'
import WalletIcon from '../../assets/card/wallet.svg'
import CardIcon from '../../assets/card/card-input-icon.svg'
import './index.css'

export default function Card({heading='Balance' }) {
  return (
    <div className="app-card-wrapper" >
        <div className="app-card-head">
            <div className="card-heading-left">{heading}</div>
            <div className="card-heading-right">
                <div className="heading-input">
                    <input type="text" className="app-input no-border" />
                </div>
                    <img src={CardIcon} alt="" />
            </div>
        </div>
        <div className="app-card-body">
            <div className="wallet-icon">
                <img src={WalletIcon} alt="" />
            </div>
            <div className="wallet-input">
                <input type="text" className="app-input no-border" />
            </div>
        </div>
    </div>
  )
}