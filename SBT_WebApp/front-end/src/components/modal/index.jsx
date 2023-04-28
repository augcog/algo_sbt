import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

import "./index.css";
import { saveContributions } from "../../services";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function AppModal({ open, handleOpen, handleClose, row, handleSaveContrib }) {
	const [assignees, setAssignees] = useState([]);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		setAssignees(
			row?.assignees?.map((assignee) => {
				return { ...assignee, value: "" };
			}) || []
		);
	}, [row]);

	const handleAssigneeValueChange = (event, assigneeId) => {
        const newValue = event.target.value;
        const newAssignees = assignees.map((assignee) =>
          assignee.id === assigneeId ? { ...assignee, value: newValue } : assignee
        );
        setAssignees(newAssignees);
        setFormData((prevFormData) => ({ ...prevFormData, [newAssignees.find(a => a.id === assigneeId).username]: newValue }));
      };

	const handleSaveButtonClick = async () => {
		const contributons = assignees.map(({ username, value }) => ({ [`${username}`]: value }));
		const body = {
            wrokspaceId:row?.team_id,
            spaceId:row?.list?.id,
            taskId:row?.id,
            contributons
        }

		handleSaveContrib(body)

		await saveContributions(body)

		handleClose()
        

	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						Specify Contributon
					</Typography>
					<div className="app-modal-body-assignees">
						{assignees.map((assignee) => (
							<div className="modal-assignees-container">
								<Typography variant="overline" display="block" gutterBottom>
									{assignee.username}
								</Typography>
								<Input
									placeholder="0.0"
									type="number"
									min="0"
									max="1"
									className="app-input"
									value={assignee.value}
									onChange={(event) =>
										handleAssigneeValueChange(event, assignee.id)
									}
								/>
							</div>
						))}
					</div>

					<div className="app-modal-footer">
						<Button onClick={handleClose}>Cancel</Button>
						<Button variant="contained" onClick={handleSaveButtonClick}>
							Save
						</Button>
					</div>
				</Box>
			</Fade>
		</Modal>
	);
}

