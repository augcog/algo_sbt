import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./index.css"
import { saveMint } from "../../services";
import Card from "../../components/card";
import { saveMintSBT } from "../../services/mint";

export default function Mint({workspaceId, spaceId, assignee}) {

    const [receiverWalletAddress, setWalletAddressR] = useState("")
    const [settingsID, setSettingsID] = useState("")
    const [issuerWalletAddress, setWalletAddressI] = useState("")
    const [privateKey, setPrivateKey] = useState("")
	const [assetid, setAssetid] = useState("")

    const handleSave = async ()=>{
		try {
			
			await saveMint({
				receiverWalletAddress, settingsID, issuerWalletAddress, privateKey, workspaceId, spaceId, assignee:{ id:assignee?._id, username:assignee?.value }
			})
	
			const mintResp = await saveMintSBT({
				receiverWalletAddress, settingsID, issuerWalletAddress, privateKey, workspaceId, spaceId, assignee:{ id:assignee?._id, username:assignee?.value }
			})

			setAssetid(mintResp || true)

	
			setWalletAddressR("")
			setSettingsID("")
			setWalletAddressI("")
			setPrivateKey("")
		} catch (error) {
			console.log(error)
		}
       
    }

	return (
		<div className="mint-page-container">
			<div className="mint-page-input-wrapper">
				<div className="mint-page-input" >
					<TextField
						id="outlined-basic"
						variant="outlined"
						placeholder="Receiver's Wallet Address"
                        value={receiverWalletAddress}
                        onChange={(event) => {
                            setWalletAddressR(event.target.value);
                          }}
						// label="Receiver's Wallet Address"
					/>
				</div>
				<div className="mint-page-input" >
					<TextField
						id="outlined-basic"
						variant="outlined"
						placeholder="SBT Settings ID"
                        value={settingsID}
                        onChange={(event) => {
                            setSettingsID(event.target.value);
                          }}
						// label="SBT Settings ID"
					/>
				</div>
				<div className="mint-page-input" >
					<TextField
						id="outlined-basic"
						variant="outlined"
						placeholder="Issuer's Wallet Address"
                        value={issuerWalletAddress}
                        onChange={(event) => {
                            setWalletAddressI(event.target.value);
                          }}
						// label="Issuer's Wallet Address"
					/>
				</div>
				<div className="mint-page-input" >
					<TextField
						id="outlined-basic"
						variant="outlined"
						placeholder="Issuer Private Key"
                        value={privateKey}
                        onChange={(event) => {
                            setPrivateKey(event.target.value);
                          }}
                        // label="Issuer Private Key"
					/>
				</div>
			</div>

			<div className="page-footer">
						
            <div className="page-footer-action" >
                <Button variant="contained" style={{backgroundColor:"var(--dark)"}} size="large" onClick={handleSave} >Mint SBT</Button>
            </div>
			</div>

			{assetid && <div className="footer-card">
				{assetid?.toString()}
			</div>}

		</div>
	);
}
