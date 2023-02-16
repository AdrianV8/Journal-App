import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNotes, setNotes, setSaving, updateNotes } from "./";

/**
 * 
 * @returns Empieza una nueva nota
 */
export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( savingNewNotes() );
        
        // Función que rescata los datos del usuario
        const { uid } = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        /**
         * ---- Insertar una nota en Firebase ----
         * Para publicar nuevas entradas, hay que configurar las Reglas de Firebase
         * allow read, write: if request.auth != null;
         */
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote );

        // Creamos la nueva propiedad 'id' a la nota
        newNote.id = newDoc.id

        // dispatch
        dispatch( addNewEmptyNote(newNote) )
        dispatch( setActiveNote(newNote) )

        // dispatch(newNote)
        // dispatch(activarNota)
    }
}

export const startLoadingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        const loadedNotes = await loadNotes(uid);
        dispatch(setNotes( loadedNotes ))
        
    }
}

export const startSavingNote = () => {

    return async(dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        // Referencia al documento (nota que queremos modificar)
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch( updateNotes( note ) ) // mandamos la nota


    }
}
