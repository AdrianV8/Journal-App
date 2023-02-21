import { async } from "@firebase/util";
import { logoutFirebaseUser, registerUserWithEmailPassword, signInWithUserPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogOut } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns Autencicación con usuario y contraseña
 */
export const checkingAuthentication = (email, password) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }

}

/**
 * 
 * @returns Autenticación con Google
 */
export const startGoogleSingIn = () => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();

        // Si se cancela o salta  un error en el inicio de sesión
        if( !result.ok ) return dispatch( logout(result.errorMessage) );

        // En caso de que se inicie sesión correctamente
        dispatch( login( result ) );
    }

}

/**
 * 
 * @param {email, password} param0
 * @returns Login de un usuario con email y contraseña 
 */
export const startLoginWithEmailPassword = (email, password) => {
    
    return async( dispatch ) => {

        dispatch(checkingCredentials());
        
        const result = await signInWithUserPassword({email, password});

        if(!result.ok) return dispatch( logout(result) );
        
        dispatch(login(result));
    }

}

/**
 * 
 * @param {email, password, displayName} param0 
 * @returns Registra un usuario con usuario y contraseña
 */
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {

    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const {uid, ok, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        /**
         * En caso de que el usuario ya esté registrado y se intente registrar nuevamente
         */
        if( !ok ) return dispatch( logout( {errorMessage} ) ) // Se envia el objeto que es el mensaje de error

        dispatch( login( uid, displayName, email, photoURL ) );
    }

}
/**
 * 
 * @returns Despacha la acción de logout para cerrar la sesión del usuario
 */
export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebaseUser();
        dispatch( clearNotesLogOut() )
        dispatch( logout({}) );
    }
}


