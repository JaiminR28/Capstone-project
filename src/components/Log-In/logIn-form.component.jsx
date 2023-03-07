import { useState } from "react";
import FormInput from "../form-inputs/form-input.component";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";

import "./logIn-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const LogInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Wrong Password entered");
					break;
				case "auth/user-not-found":
					alert("No User found with this Email Address");
					break;
				default:
					console.log(error);
					break;
			}
		}
	};

	// useEffect(() => {
	// 	(async () => {
	// 		const response = await getRedirectResult(auth);
	// 		console.log(response);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(
	// 				response.user
	// 			);
	// 		}
	// 	})();
	// }, []);
	const LogInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Log In with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Log In</Button>
					<Button
						type="button"
						buttonType={"google"}
						onClick={LogInWithGoogle}
					>
						Google Log In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default LogInForm;