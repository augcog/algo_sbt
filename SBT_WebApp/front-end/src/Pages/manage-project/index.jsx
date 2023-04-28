import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AppSelect from "../../components/select";
import AppTable from "../../components/table";
import AppModal from "../../components/modal";
import "./index.css";
import Card from "../../components/card";
import { saveProject } from "../../services/manage-project";

const column = () => [
	{
		id: "checkbox",
		width: 35,
		align: "center",
		Header: (props) => {
			return (
				<div>
					{" "}
					<input type="checkbox" name="" id="" />{" "}
				</div>
			);
		},
		Cell: ({ row }) => (
			<div style={{ width: "35px" }}>
				{" "}
				<input type="checkbox" name="" id="" />{" "}
			</div>
		),
	},
	{
		Header: "Task",
		disableSortBy: true,
		accessor: "name",
		align: "left",
		alignHeader: "left",
	},
	{
		Header: "Sub - Task",
		disableSortBy: true,
		accessor: "subTask",
		align: "left",
		alignHeader: "left",
	},
	{
		Header: "Weight",
		disableSortBy: true,
		accessor: "weight",
		align: "left",
		alignHeader: "left",
	},
	{
		Header: "Contribution Approach",
		disableSortBy: true,
		accessor: (row) => (
			<List
				list={row?.contribution}
				activeItem={{}}
				buttonPlaceholder=""
				selectCallback={() => {}}
			>
				{row?.contribution.map((item) => {
					return (
						<ListItem key={item._id} data={item}>
							{item.value}
						</ListItem>
					);
				})}
			</List>
		),
		align: "left",
		alignHeader: "left",
	},
	{
		Header: "Due Date",
		disableSortBy: true,
		width: 240,
		accessor: "due_date",
		alignHeader: "center",
	},
	{
		Header: "Assignee",
		disableSortBy: true,
		width: 240,
		accessor: (row) => (
			<List
				list={row?.assignees}
				activeItem={{}}
				buttonPlaceholder=""
				selectCallback={() => {}}
			>
				{row?.assignees.map((item) => {
					return (
						<ListItem key={item._id} data={item}>
							{item.value}
						</ListItem>
					);
				})}
			</List>
		),
		alignHeader: "center",
	},
	{
		Header: "Status",
		disableSortBy: true,
		width: 240,
		accessor: (row) => {
			const status = [{ _id: "askjdfh2323", value: row?.status.status }];
			return (
				<List list={status} activeItem={{}} buttonPlaceholder="" selectCallback={() => {}}>
					{status.map((item) => {
						return (
							<ListItem key={item._id} data={item}>
								{item.value}
							</ListItem>
						);
					})}
				</List>
			);
		},
		alignHeader: "right",
	},
];

export default function MangeProject({tasks=[], setTasks}) {

	const [activeRow, setActiveRow] = useState([])

	const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

	const handleContributonChange = (event, index) => {
		const value = event.target.value;

		const updatedTasks = [...tasks]; // create a copy of the tasks array in state

		// update the contribution_approach field for the task at the specified index
		updatedTasks[index].contribution_approach = value;

		setTasks(updatedTasks); // update the tasks state with the new array

	  };

	  const handleContributonClick = (event, row)=>{
		handleOpen()
		setActiveRow(row)
	  }

	  const handleSaveContrib = (contrib) =>{
		const updatedTasks = tasks?.map((task)=> {
			if(task?.id === contrib?.taskId){
				return {...task, ...contrib}
			}
			return task
		} )

		setTasks(updatedTasks)
	  }

	  const handleSaveTasks = async () =>{
			await saveProject(tasks)
	  }

	  const handleWeightChange = (row, weight) => {
		const updatedTasks = tasks?.map((task)=>{
			if(task?.id === row.id){
				return {...task, weight}
			}
			return task
		})
		setTasks(updatedTasks)
	  }

	return (
		<>
			<AppModal open={open} handleOpen={handleOpen} handleClose={handleClose} row={activeRow} handleSaveContrib={handleSaveContrib} />
				<div className="table-section">
					<AppTable rows={tasks} handleContributonChange={handleContributonChange} handleContributonClick={handleContributonClick} handleWeightChange={handleWeightChange} />
				</div>
			<div className="page-footer">
				<Card heading={'Balance'} />
				
				<div className="page-footer-action" >
                <Button variant="contained" style={{backgroundColor:"var(--dark)"}} size="large" onClick={handleSaveTasks} >Update Status on Blockchain</Button>
            </div>
			</div>
		</>
	);
}
