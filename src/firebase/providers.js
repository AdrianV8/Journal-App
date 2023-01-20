import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

// Iniciar sesión con Google
export const singInWithGoogle = async() => {
    
    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        
        return{
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return{
            ok: false,
            errorMessage,
        }
    }
}

// Registro de usuario con correo y contraseña
export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        console.log(resp);

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error);
        return{ ok: false, errorMessage: error.message}
    }

}
