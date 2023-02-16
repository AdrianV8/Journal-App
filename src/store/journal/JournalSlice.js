import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, // Valor booleano para saber si se está guardando la nota o no
        messageSave: '',
        notes: [],
        active: null, // Nota activa. Esta llevará toda la información de la nota
    },
    reducers: {
        // Evitar el posteo de las notas
        savingNewNotes: (state) => {
            state.isSaving = true;
        },

        // Añadir nueva nota
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false
        },
        // Marcar nota activa
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        // Cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        // Guardar las notas
        setSaving: (state) => {
            state.isSaving = true;
        },
        // Actualizar nota
        updateNotes: (state, action) => { // Payload es una nota
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if(note.id === action.payload.id){
                    return action.payload;
                }
                
                return note;
            });
        },
        // Borrar nota
        deleteNotes: (state, action) => {

        },
    }
})
// Action creators are generated for each case reducer function
export const { savingNewNotes, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNotes, deleteNotes } = journalSlice.actions;