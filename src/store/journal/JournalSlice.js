import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true, // Valor booleano para saber si se está guardando la nota o no
        messageSave: '',
        note: [],
        active: null, // Nota activa. Esta llevará toda la información de la nota
    },
    reducers: {
        // Añadir nueva nota
        addNewEmptyNote: (state, action) => {
            
        },
        // Marcar nota activa
        setActiveNote: (state, action) => {

        },
        // Cargar las notas
        setNotes: (state, action) => {

        },
        // Guardar las notas
        setSaving: (state) => {

        },
        // Actualizar nota
        updateNotes: (state, action) => {

        },
        // Borrar nota
        deleteNotes: (state, action) => {

        },
    }
})
// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNotes, deleteNotes } = journalSlice.actions;