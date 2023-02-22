import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Prueba en authSlice', () => {

    test('Should return initial state and be called "auth" ', () => { 
    
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual( initialState );
        expect(authSlice.name).toBe('counter');
        
    });

    test('Should do the authentication ', () => { 

        const state = authSlice.reducer( initialState, login( demoUser ));
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
        
    });

    test('Should do the logout without arguments ', () => { 

        const state = authSlice.reducer( authenticatedState, logout());

        expect( state ).toEqual({
            status: 'non-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
        
    });

    test('Should do the logout with arguments ', () => { 
        
        const errorMessage = 'Error en las credenciales';
        const state = authSlice.reducer( authenticatedState, logout( {errorMessage} ));
        
        expect( state ).toEqual({
            status: 'non-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
        
    });

    test('Should change state to checking ', () => { 
        
        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        console.log(state);
        expect( state ).toEqual({
            status: true,
            uid: 'ABC123',
            email: 'prueba@gmail.com',
            displayName: 'User Test',
            photoURL: 'https://user.jpg',
            errorMessage: null
        });
        
    });



})