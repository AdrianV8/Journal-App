import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./authSlice";

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
        console.log({result});
    }

}

