import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import "./index.css"

const AppSelect = ({ label, value="", list=[], handleChange }) => {

	return (
		<FormControl variant="standard">
			<label className="select-app-label">
				{label}
			</label>
			<Select
				value={value}
				onChange={handleChange}
			>
				{list.map((ws) => (
					<MenuItem value={ws.value} key={ws?._id}>{ws.value}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default AppSelect;