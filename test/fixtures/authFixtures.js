export const initialState = {
    status: 'checking', //  'checking', 'authenticated', 'not-authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: 'ABC123',
    email: 'prueba@gmail.com',
    displayName: 'User Test',
    photoURL: 'https://user.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'prueba@gmail.com',
    displayName: 'User Test',
    photoURL: 'https://user.jpg'
}