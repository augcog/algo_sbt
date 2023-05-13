import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";
import { saveRevoke } from "../../services";
import Card from "../../components/card";

export default function Revoke({workspaceId, spaceId, assignee}) {
	const [receiverWalletAddress, setWalletAddressR] = useState("");
	const [settingsID, setSettingsID] = useState("");
	const [issuerWalletAddress, setWalletAddressI] = useState("");
	const [privateKey, setPrivateKey] = useState("");

	const handleSubmit = async () => {
		await saveRevoke({
			receiverWalletAddress,
			settingsID,
			issuerWalletAddress,
			privateKey,
			workspaceId,
			spaceId,
            assignee:{ id:assignee?._id, username:assignee?.value }
		});

		setWalletAddressR("");
		setSettingsID("");
		setWalletAddressI("");
		setPrivateKey("");
	};

	return (
		<div className="mint-page-container">
			<div className="mint-page-input-wrapper">
				<div className="mint-page-input">
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
				<div className="mint-page-input">
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
				<div className="mint-page-input">
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
				<div className="mint-page-input">
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
						<Card />
			<div className="page-footer-action">
				<Button
					variant="contained"
					style={{ backgroundColor: "var(--dark)" }}
					size="large"
					onClick={handleSubmit}
				>
					Revoke SBT
				</Button>
			</div>
			</div>

		</div>
	);
}
