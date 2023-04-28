import React from "react";
import PendingIcon from "../../assets/chip/pending.svg";
import SuccessIcon from "../../assets/chip/succsess.svg";
import "./index.css";

export default function Chip({ label, color, variant, isIcon = true }) {
	const getIcon = () => {
		switch (color) {
			case "success":
				return SuccessIcon;
				break;

			case "pending":
				return PendingIcon;
				break;

			default:
				"";
				break;
		}
	};

	return (
		<div className={`app-chip ${color} ${variant}`}>
			{/* {isIcon && getIcon() && <img src={getIcon()} alt="chip-icon" />} */}
			<span>{label}</span>
		</div>
	);
}
