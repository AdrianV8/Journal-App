import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        status: false,
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {

        // Login usuario
        login: (state, action) => {
            
        }, 

        // Logout usuario
        logout: (state, payload) => {
            
        },

        // Verificar si el usuario está autenticado o no
        checkingCredentials: (state) => {
            state.status = true;
        }
    }
})
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;