import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { logoutFirebaseUser, registerUserWithEmailPassword, signInWithUserPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { addNewEmptyNote, clearNotesLogOut, savingNewNotes, setActiveNote, startNewNote } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

// Mock a todos los providers de Firebase de google
jest.mock('../../../src/firebase/providers')

describe('Prueba en AuthThunks', () => {
    
    // Definir el dispatch como una jest function
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach( () => jest.clearAllMocks )

    const auth = {
        uid: 'TEST-ID'
    }


    test('Should create a new note ', async() => { 

        const newNote = {
            body: "",
            date: expect.any( Number ),
            id: expect.any( String ),
            title: "",
        };

        getState.mockReturnValue({auth})

        await startNewNote()(dispatch, getState);
        
        expect(dispatch).toHaveBeenCalledWith( savingNewNotes() )

        // Dispatch
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNote(newNote) )
        expect(dispatch).toHaveBeenCalledWith( setActiveNote(newNote) )

        // Borrar notas de firebase
        const collectionRef = collection( FirebaseDB, `${auth.uid}/journal/notes` );
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) )
        await Promise.all( deletePromises );


    });

})