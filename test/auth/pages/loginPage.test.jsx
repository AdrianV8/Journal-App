import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, getByLabelText, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice";
import { startGoogleSingIn } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSingIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password});
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
});

describe('Pruebas LoginPage', () => {

    beforeEach( () => jest.clearAllMocks() );
    
    test('Should show the component correctly', () => {
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        )

    // screen.debug();
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
    });

    test('Google button should call startGoogleSignIn', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect( mockStartGoogleSingIn ).toHaveBeenCalled();

    })

    test('Submit should call startLoginWithEmailPassword', () => {
        
        const email = 'prueba@gmail.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, {target: { name: 'email', value: email }} );
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, {target: { name: 'Contraseña', value: password }} );

        fireEvent.submit( screen.getByLabelText('submit-form'));

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    })



})