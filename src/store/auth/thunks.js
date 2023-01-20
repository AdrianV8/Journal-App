import { registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

// Autencicación con usuario y contraseña
export const checkingAuthentication = (email, password) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }

}

// Autenticación con Google
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

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {

        dispatch( checkingCredentials() );

        const resp = await registerUserWithEmailPassword({email, password, displayName});
        
        console.log(resp);
    }

}

