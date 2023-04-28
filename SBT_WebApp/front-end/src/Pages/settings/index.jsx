import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditIcon from  '../../assets/table/edit.svg'
import CheckIcon from  '../../assets/table/check.svg'
import "./index.css";

const DynamicInput = ({value}) => {

    const [isEdit, setIsEdit] = useState(false)
    const [val, setVal] = useState(value)

	return (
		<>
        <div className="dynamic-input-container" >
            <div className="dynamic-textfield__wrapper" >
        {
            isEdit ? <TextField id="outlined-basic" variant="outlined" placeholder="..." /> :<p>......</p>
        }			
            </div>
            <div className="dync-input-edit-icon" >
                {
                    isEdit ? <img src={CheckIcon} alt=""  onClick={()=>setIsEdit(false)}/> :  <img src={EditIcon} alt="" onClick={()=>setIsEdit(true)} />
                }
            </div>
        </div>
		</>
	);
};

export default function Settings() {
	return (
		<div>
			<div className="settings-view-contianer">
				<div className="settings-view-cards">
					<div className="settings-card">
						<div className="settings-card__heading">
							Paste your Clickup API Key here
						</div>
						<div className="settings-card__body">
                            <DynamicInput />
							{/* <p>......</p>
							<TextField id="outlined-basic" variant="outlined" placeholder="..." /> */}
						</div>
					</div>
					<div className="settings-card">
						<div className="settings-card__heading">
							Paste Issuer Wallet Address here
						</div>
						<div className="settings-card__body">
                        <DynamicInput />
							{/* <p>......</p>
							<TextField id="outlined-basic" variant="outlined" placeholder="..." /> */}
						</div>
					</div>
				</div>
			</div>

			<div className="page-footer-action">
				<Button variant="contained" style={{ backgroundColor: "var(--dark)" }} size="large">
					Save Settings
				</Button>
			</div>
		</div>
	);
}
