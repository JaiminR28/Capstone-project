// import { async } from "@firebase/util";
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../Sign-up/signup-form.component";
import LogInForm from "../../Log-In/logIn-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
	return (
		<div className="authentication-container">
			<LogInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
