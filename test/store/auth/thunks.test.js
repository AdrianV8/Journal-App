import { logoutFirebaseUser, registerUserWithEmailPassword, signInWithUserPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogOut } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

// Mock a todos los providers de Firebase de google
jest.mock('../../../src/firebase/providers')

describe('Prueba en AuthThunks', () => {
    
    // Definir el dispatch como una jest function
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks )

    test('Should invoke checkingCredential ', async() => { 
    
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials())
        
    });
    
    test('startGoogleSingIn should call checkingCredential and login ', async() => { 
        
        const loginData = { ok: true, ...demoUser }
        await singInWithGoogle.mockResolvedValue( loginData )

        // Thunk a llamar
        await startGoogleSingIn()(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
        
    });
    
    test('startGoogleSingIn should call checkingCredential and logout - Error ', async() => { 
        
        const loginData = { ok: false, errorMessage: 'Error al iniciar sesión' }
        await singInWithGoogle.mockResolvedValue( loginData )
        
        // Thunk a llamar
        await startGoogleSingIn()(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
        
    });

    test('startLoginWithEmailPassword should call checkingCredential and login - Success ', async() => { 
        
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567' }

        await signInWithUserPassword.mockResolvedValue( loginData )
        
        // Thunk a llamar
        await startLoginWithEmailPassword( formData )(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
        
    });

    test('startLoginWithEmailPassword should call checkingCredential and logout - Error ', async() => { 
        
        const loginData = { ok: false, errorMessage: 'Error al iniciar sesión' }
        const formData = { email: demoUser.email, password: '1234567' }

        await signInWithUserPassword.mockResolvedValue( loginData )
        
        // Thunk a llamar
        await startLoginWithEmailPassword( formData )(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
        
    });

    test('startCreatingUserWithEmailPassword should call checkingCredential and login - Success ', async() => { 
        
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567' }

        await registerUserWithEmailPassword.mockResolvedValue( formData.email, formData.password, loginData.displayName )
        
        // Thunk a llamar
        await startLoginWithEmailPassword( formData )(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
        
    });

    test('startCreatingUserWithEmailPassword should call checkingCredential and logout - Error ', async() => { 
        
        const loginData = { ok: false, errorMessage: 'Error al iniciar sesión' }
        const formData = { email: demoUser.email, password: '1234567' }

        await registerUserWithEmailPassword.mockResolvedValue( formData.email, formData.password, loginData.displayName )
        
        // Thunk a llamar
        await startLoginWithEmailPassword( formData )(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
        
    });

    //startCreatingUserWithEmailPassword ERROR

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => { 

        await startLogout()(dispatch)
        
        expect(logoutFirebaseUser).toHaveBeenCalled(); 
        
        expect(dispatch).toHaveBeenCalledWith( clearNotesLogOut() );
        expect(dispatch).toHaveBeenCalledWith( logout( {} ) );
        
    });


})