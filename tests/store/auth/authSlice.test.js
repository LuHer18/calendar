import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { autheticatedState, initialState, notAutheticatedState } from "../../fixtures/authState"
import { testUserCredentials } from "../../fixtures/testUser"

describe('Pruebas authSlice', () => { 

    test('debe de regresar el estado inicial', () => { 

        expect(authSlice.getInitialState()).toEqual(initialState)

    })

    test('debe de realizar un login', () => { 
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))


        expect(state).toEqual({
            ...autheticatedState,
            user: testUserCredentials
        })
    })

    test('debe de realizar el logout', () => { 
        const state = authSlice.reducer(autheticatedState, onLogout())
        expect(state).toEqual({...notAutheticatedState})
    })

    test('debe de realizar el logout con credenciales', () => { 
        const errorMessage = "Credenciales no validas"
        const state = authSlice.reducer(autheticatedState, onLogout(errorMessage))
        expect(state).toEqual({...notAutheticatedState, errorMessage})
    })

    test('debe de limpiar el mensaje de error', () => { 

        const errorMessage = "Credenciales no validas"
        const state = authSlice.reducer(autheticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage())
        expect(newState.errorMessage).toBe(undefined)
    })
    

})