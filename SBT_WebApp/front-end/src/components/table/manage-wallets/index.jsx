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

import Chip from "../../chip";
import AppSelect from "../../select";
import EmptyBox from "../../../assets/table/empty-box.svg";
import EditIcon from "../../../assets/table/edit.svg";
import XIcon from "../../../assets/table/x.svg";
import CheckIcon from "../../../assets/table/check.svg";
import "../index.css";

const columnsHead = [
	{
		label: "SBT ID",
		align: "left",
	},
	{
		label: "Wallet Address",
		align: "left",
	},
	{
		label: "Member Name",
		align: "center",
	},
	{
		label: "Member Email",
		align: "center",
	},
];

export default function TableManageWallets({ rows, handleRowDelete, handleUpdateRow }) {
	const [activeRow, setActiveRow] = React.useState(null);
	

	const handleEdit = (row = [], index) => {
		setActiveRow({ ...row, index });
	};

	const handleSaveRow = () => {
		handleUpdateRow(activeRow)
		setActiveRow(null);
	};

	const handleRowChange = (e) => {
		try {
			const value = e.target.value;
			setActiveRow({ ...activeRow, data:{...activeRow.data,walletaddress: value} });
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<>
			{rows?.length ? (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								{columnsHead?.map((head, idx) => (
									<TableCell align={head.align} key={idx}>
										{head.label}
									</TableCell>
								))}
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow
									key={index}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell align="left">{index + 1}</TableCell>
									<TableCell align="left">
										<div
											className={`table-dynamic-input ${
												activeRow?.index === index ? "is-edit-mode" : ""
											}`}
										>
											{activeRow?.index === index ? (
												<input
													type="text"
													className="app-input no-border"
													value={
														activeRow?.data?.walletaddress
													}
													onChange={handleRowChange}
												/>
											) : (
												`${row?.data?.walletaddress?.slice(
													0,
													5
												)||""}....${row?.data?.walletaddress?.slice(-5)||""}`
											)}
										</div>
									</TableCell>
									<TableCell align="center" style={{ whiteSpace: "nowrap" }}>
										{row?.data?.username}
									</TableCell>
									<TableCell align="center" style={{ whiteSpace: "nowrap" }}>
										{row?.data?.email}
									</TableCell>
									<TableCell align="right">
										<div className="app-table-row-actions">
											{activeRow?.index !== index ? (
												<>
													<div
														className="row-action-edit"
														onClick={() => handleEdit(row, index)}
													>
														<img src={EditIcon} alt="" />
													</div>
													<div
														className="row-action-delete"
														onClick={() => handleRowDelete(index)}
													>
														<img src={XIcon} alt="" />
													</div>
												</>
											) : (
												<div
													className="row-action-check"
													onClick={() => handleSaveRow()}
												>
													<img src={CheckIcon} />
												</div>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<div className="empty-table-state">
					<div className="empty-box">
						<img src={EmptyBox} alt="" />
					</div>
					<p>No data found</p>
				</div>
			)}
		</>
	);
}
