import React from "react";
import AppSelect from "../../select";
import "./index.css"
import { SPACE_VIEWS } from "../../../utils/constants";

export default function AppSubHeader({
	tab,
	selectedWs,
	handleWsChange,
	workspaces,
	selectedSpace,
	handleSpaceChange,
	spaces,
	lists,
	activeList,
	setActiveList,

	showAssignees=true,
	assignees=[],
	handleAssigneehange,
	selectedAssignee,

    showLists=true,
    showSpaces=true,
    spaceView="DROPDOWN",
}) {
	return (
		<div className="page-sub-header">
			<div className="page-sub-header-main">
				<h2 className="app-heading-3">{tab?.name}</h2>
				<div className="space-selction-container">
					{ (tab?.name === "Manage Project" || tab?.name === "Manage Wallets" || tab?.name === "Dashboard") && <>
					<AppSelect
						value={selectedWs?.value}
						handleChange={handleWsChange}
						list={workspaces}
						label={"Select Workspace"}
					/>
                   {(tab?.name === "Manage Project" || tab?.name === "Manage Wallets" || tab?.name === "Dashboard")  &&  <>
                    {
                        SPACE_VIEWS.dropdown === spaceView ?
                        <AppSelect
						value={selectedSpace.value}
						handleChange={handleSpaceChange}
						list={spaces}
						label={"Select Space"}
					/> :
                    <div className="header-tabs">
					{spaces.map((l) => (
						<div
							className={`tab ${l._id === selectedSpace?._id ? "active" : ""}`}
							key={l._id}
                            value={l?.value}
							onClick={handleSpaceChange}
						>
							{l.value}
						</div>
					))}
				</div>
                    }
                    </>}
					</>}

					{
						(showAssignees && (tab?.name === "Mint SBT" || tab?.name === "Revoke SBT"))  && 
						<>
							<AppSelect
							value={selectedAssignee?.value}
							handleChange={handleAssigneehange}
							list={assignees}
							label={"Member"}
						/>
						</>
					}		
				</div>
				{(showLists &&  tab?.name === "Manage Project") && <div className="header-tabs">
					{lists.map((l) => (
						<div
							className={`tab ${l._id === activeList?._id ? "active" : ""}`}
							key={l._id}
							onClick={() => setActiveList(l)}
						>
							{l.value}
						</div>
					))}
				</div>}
			</div>
		</div>
	);
}
