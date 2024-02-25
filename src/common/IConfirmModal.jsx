import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const IConfirmModal = (props) => {
	const { title, message, yesAlertFunc, noAlertFunc, ...rest } = props;
	return confirmAlert({
		title: title,
		message: message,
		buttons: [
			{
				label: props?.noText || "No",
				className:"bg-danger",
				style:{marginLeft:"12rem"},

				onClick: () => noAlertFunc(),
			},{
				label: props?.yesText || "Yes",
				style:{backgroundColor:"#8A2BE2"},
				onClick: () => yesAlertFunc(),
			},
			
		],
		...rest,
	});
};

export default IConfirmModal;
