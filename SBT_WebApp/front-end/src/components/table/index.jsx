import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import Chip from "../chip";
import AppSelect from "../select";
import EmptyBox from "../../assets/table/empty-box.svg"
import { formatUnixTimestamp, getRandomHexCode } from "../../utils/helpers";
import "./index.css";

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const getChipVariant = (status) => {
	switch (status) {
		case "to do":
			return "outline";
			break;

		case "in progress":
			return "";
			break;

		case "on hold":
			return "outline";
			break;

		default:
			return "";
	}
};

const getChipColor = (status) => {
	switch (status) {
		case "to do":
			return "pending";
			break;

		case "in progress":
			return "warning";
			break;

		case "on hold":
			return "danger";
			break;

		default:
			return "pending";
	}
};

function enforceMinMax({target}) {
	// if (target.value != "") {
	  if (parseInt(target.value) < parseInt(target.min)) {
		target.value = target.min;
	  }
	  if (parseInt(target.value) > parseInt(target.max)) {
		target.value = target.max;
	  }
	// }
  }

const ca = [
	{ _id: "asdfj23j", value: "Peer Review" },
	{ _id: "23ejkd", value: "1/N" },
];

export default function AppTable({ rows, handleContributonChange, handleContributonClick, handleWeightChange }) {
	return (
		<>
	{ 
	rows?.length ?
	<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							<Checkbox
								color="primary"
								className="app-checkbox"
								// indeterminate={numSelected > 0 && numSelected < rowCount}
								// checked={rowCount > 0 && numSelected === rowCount}
								// onChange={onSelectAllClick}
								// inputProps={{
								// 'aria-label': 'select all desserts',
								// }}
							/>
						</TableCell>
						<TableCell>Task</TableCell>
						<TableCell align="center">Sub - Task</TableCell>
						<TableCell align="center">Weight</TableCell>
						<TableCell align="center">Contribution Approach</TableCell>
						<TableCell align="center">Due Date</TableCell>
						<TableCell align="center">Assignee</TableCell>
						<TableCell align="right">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>

					{rows.map((row, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>
								<Checkbox color="primary" className="app-checkbox" />
							</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell align="center">{row.subtask || "-"}</TableCell>
							<TableCell align="center">
								<Input
									placeholder="0"
									type="number"
									min="1"
									max="100"
									className="app-input"
									onKeyUp={(event)=>enforceMinMax(event)}
									value={row?.weight}
									onChange={(event)=> handleWeightChange(row, event.target.value) }
								/>
								%
							</TableCell>
							<TableCell align="center">
								<AppSelect
									value={row?.contribution_approach}
									handleChange={(event) => handleContributonChange(event, index)}
									list={ca}
								/>
							</TableCell>
							<TableCell align="center">
								{formatUnixTimestamp(row?.due_date)}
							</TableCell>
							<TableCell align="center">
								<div className="initials-container">
									{row.assignees.length ? (
										<>
											{row?.contribution_approach === "1/N" ? (
												<>
													<>
														{row.assignees
															.slice(0, 3)
															.map((assignee, i) => (
																<div key={i} >
																	{row?.contribution_approach ===
																		"1/N" && (
																		<>
																			{" "}
																			{(
																				100 /
																				row.assignees.length
																			).toFixed(0)}
																			%
																		</>
																	)}
																	<Avatar
																		sx={{
																			width: 24,
																			height: 24,
																			bgcolor:
																				assignee?.color,
																		}}
																	>
																		{assignee.initials}
																	</Avatar>
																	{row.assignees.length - 1 === i
																		? ""
																		: ","}
																</div>
															))}
														{row.assignees.length > 3 && (
															<span>...</span>
														)}
													</>
												</>
											) : (
												<>
													<Button
														variant="outlined"
														onClick={(event) => handleContributonClick(event, row)}
													>
														Set contributions
													</Button>
												</>
											)}
										</>
									) : (
										"-"
									)}
								</div>
							</TableCell>
							<TableCell align="right">
								<Chip
									label={row.status.status}
									color={getChipColor(row.status.status)}
									variant={getChipVariant(row.status.status)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	: <div className="empty-table-state">
	<div className="empty-box" >
		<img src={EmptyBox} alt="" />
	</div>
	<p>No data found</p>
</div>		
	}
		</>
	);
}