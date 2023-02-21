import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false, // Valor booleano para saber si se está guardando la nota o no
        messageSave: '',
        notes: [],
        active: null, // Nota activa. Esta llevará toda la información de la nota
        // active: {
        //     id: 'ABC',
        //     title: '',
        //     body: '',
        //     date: 12345678910,
        //     imageUrls: [],
        // }
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
            state.messageSave='';
        },
        // Cargar las notas
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        // Guardar las notas
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSave = '';
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

            state.messageSave = `La nota '${action.payload.title}' se modificó correctamente.`

        },

        // Establecer las fotos como activas en la nota
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        //Limpiar las notas logout
        clearNotesLogOut: (state) => {
            state.isSaving = false;
            state.messageSave = '',
            state.notes = [],
            state.active = null
        },

        // Borrar nota
        deleteNotes: (state, action) => {
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload );
            
        },
    }
})
// Action creators are generated for each case reducer function
export const { savingNewNotes, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNotes, setPhotosToActiveNote, clearNotesLogOut, deleteNotes } = journalSlice.actions;