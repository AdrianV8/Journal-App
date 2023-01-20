import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {

        // Login usuario
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        }, 

        // Logout usuario
        logout: (state, {payload}) => {
            state.status = 'non-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage; // Se espera que el payload sea el mensaje de error
        },

        // Verificar si el usuario está autenticado o no
        checkingCredentials: (state) => {
            state.status = true;
        }
    }
})
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;