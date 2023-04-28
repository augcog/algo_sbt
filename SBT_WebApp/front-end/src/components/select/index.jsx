import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import "./index.css"

const AppSelect = ({ label, value="", list, handleChange }) => {

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

{/* <List
						list={workspaces}
						activeItem={selectedWs}
						selectCallback={(item) => setSeletedWs(item)}
                        buttonPlaceholder="Select Org"
					>
						{workspaces.map((item) => {
							return (
								<ListItem key={item._id} data={item}>
									{item.value}
								</ListItem>
							);
						})}
					</List>
						
					<List
						list={spaces}
						activeItem={selectedSpace}
						selectCallback={(item) => setSelectedSpace(item)}
                        buttonPlaceholder="Select Initiative"
					>
						{spaces.map((item) => {
							return (
								<ListItem key={item._id} data={item}>
									{item.value}
								</ListItem>
							);
						})}
					</List> */}