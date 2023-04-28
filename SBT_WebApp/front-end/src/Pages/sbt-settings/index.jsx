import React,{useState} from 'react'
import TableSbtSettings from '../../components/table/sbt-settings'

export default function SBTSettings() {

    const [rows, setRows] = useState([
        {
            jsonString:'{"Project": "ROAR","Issuer": "FHL Vive Center for Enhanced Reality, UCB","Term": "S23","URL": "https://sbt-cs294-137.infura-ipfs.io/ipfs/QmRCkZ3GmBUpceGrpyGiwXF4ipite6KSrvVBB9vkDnYZui"}',
            description:"SBT for ROAR, S23",
            createdOn:"12/15/2022",
    
        },
        {
            jsonString:'{"Project": "ROAR","Issuer": "FHL Vive Center for Enhanced Reality, UCB","Term": "S23","URL": "https://sbt-cs294-137.infura-ipfs.io/ipfs/QmRCkZ3GmBUpceGrpyGiwXF4ipite6KSrvVBB9vkDnYZui"}',
            description:"SBT for OpenARK, S23",
            createdOn:"5/15/2023"
        },
    ])

    const handleRowDelete = (index)=>{
        const updatedRows = rows.filter((r,idx)=> idx !== index ) 
        setRows(updatedRows)   
    }

  return (
    <>
    <div className="table-section">
        <TableSbtSettings rows={rows} handleRowDelete={handleRowDelete}  />
    </div>
    </>
  )
}
