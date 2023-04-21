import { useState } from "react";

import FormInput from "../form-inputs/form-input.component";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

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
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
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
		await signInWithGooglePopup();
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
						buttonType={BUTTON_TYPE_CLASSES.google}
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
