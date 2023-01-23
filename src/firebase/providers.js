import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

/**
 * 
 * @returns Iniciar sesión con Google
 */
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

        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        return{
            ok: false,
            errorMessage,
        }
    }
}

/**
 * 
 * @param {email, password} param0 
 * @returns OK: True -> Devuelve ok: true y datos del usuario. OK: False -> ok: false y mensaje de error.
 */
export const signInWithUserPassword = async({email, password}) => {
    try {

        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = result.user;
        
        return {
            ok: true,
            uid, photoURL, displayName,
        }
        
    } catch (error) {
        return{
            ok: false,
            errorMessage: 'Error al iniciar sesión',
        }
    }
}

/**
 * 
 * @param {email, password, displayName} param0 
 * @returns Registro de usuario con correo y contraseña
 */
export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        
        // Actualizar el display en Firabase
        await updateProfile(FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return{ ok: false, errorMessage: 'Error. Usuario ya registrado.'}
    }
    
}

/**
 * 
 * @returns Logout del usuario
 */
export const logoutFirebaseUser = async() => {
    return await FirebaseAuth.signOut();
}




