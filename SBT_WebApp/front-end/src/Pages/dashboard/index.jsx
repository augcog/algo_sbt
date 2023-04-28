import React from 'react'
import './index.css'

export default function Dashboard() {

  const metrics = [
    {
    stat:"1", 
    label:"Organization"
  },
    {
    stat:"3", 
    label:"Initiatives"
  },
    {
    stat:"7", 
    label:"Projects"
  },
    {
    stat:"25", 
    label:"Tasks-In Progess"
  },
    {
    stat:"10", 
    label:"People"
  },
    {
    stat:"3", 
    label:"Teams"
  },
    {
    stat:"12", 
    label:"SBT Revoked"
  },
    {
    stat:"2", 
    label:"SBT Revoked"
  },
]

  return (
    <div className="dashboard-section" >
      <div className="metrics-card-wrapper">
        <div className="metrics-card-body">

            {
              metrics?.map((metric, idx)=>(
                <div className="metrics-card-row" key={idx}>
                  <div className="metrics-card-row__stat">{metric?.stat}</div>
                  <div className="metrics-card-row__label">{metric?.label}</div>
                </div>
              ))
            }

        </div>
      </div>
    </div>
  )
}
