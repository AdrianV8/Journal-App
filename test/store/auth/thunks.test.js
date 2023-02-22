import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks";

jest.mock('../../../src/firebase/providers')

describe('Prueba en AuthThunks', () => {
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks )

    test('Should invoke checkingCredential ', async() => { 
    
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials())
        
    });


})