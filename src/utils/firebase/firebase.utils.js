// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCSHrP4AskqQJefThGJ46pmIUYBMyy-2aI",
	authDomain: "crwn-clothing-db-eb518.firebaseapp.com",
	projectId: "crwn-clothing-db-eb518",
	storageBucket: "crwn-clothing-db-eb518.appspot.com",
	messagingSenderId: "745853629223",
	appId: "1:745853629223:web:228dc2eed7b5d468382f02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
console.log(auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createAt });
		} catch (error) {
			console.log("error creating a user", error.message);
		}
	}

	return userDocRef;
};
