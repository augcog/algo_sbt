import React,{useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import TableSbtSettings from '../../components/table/sbt-settings'
import TableManageWallets from '../../components/table/manage-wallets'
import { saveManageWallets } from '../../services/manage-wallets';

export default function ManageWallets({assignees=[], workspaceId, spaceId, activeListId, setUserWallets, userWallets}) {

    const [rows, setRows] = useState(assignees)
    

    const handleRowDelete = (index)=>{
        const updatedRows = rows.filter((r,idx)=> idx !== index ) 
        setRows(updatedRows)   
    }

    const handleUpdateRow = (updatedRow)=>{
        const updatedRows = rows.map((row)=> {
            if(row?._id === updatedRow?._id){
                return  {...row,...updatedRow }
            }
            return row
        }  )
        const updatedUserWallets = {...userWallets}
        updatedUserWallets[updatedRow.email] = updatedRow.walletaddress
        setUserWallets(updatedUserWallets)
        setRows(updatedRows)
    }

    const handleSubmit = async ()=>{
        try {
            const newRows = rows.map((row)=> { return {...row,  workspaceId, spaceId, listId:activeListId} })
            await  saveManageWallets(newRows)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <div className="table-section">
        <TableManageWallets rows={rows} handleRowDelete={handleRowDelete} handleUpdateRow={handleUpdateRow}  />
    </div>

    <div className="page-footer-action" >
                <Button variant="contained" style={{backgroundColor:"var(--dark)"}} size="large" onClick={handleSubmit} >Save</Button>
            </div>
    </>
  )
}
