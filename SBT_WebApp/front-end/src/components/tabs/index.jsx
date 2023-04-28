import React from "react";
import "./index.css";

export default function AppTab({ tab, activeTab, handleClick }) {

	return (
		<div className={`app-tab ${activeTab?.id === tab?.id ? "tab-active" : ""} ${tab?.disabled ? "--disabled" : ""}`} style={{backgroundColor:tab.bgColor}} onClick={()=>handleClick(tab)} >
			<span className="app-tab-content">{tab.name}</span>
		</div>
	);
}
