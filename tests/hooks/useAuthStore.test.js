import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
import { notAutheticatedState } from "../fixtures/authState";
import { testUserCredentials } from "../fixtures/testUser";
import calendarAPi from "../../src/api/calendarAPi";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('Pruebas  en useAUthStore', () => { 

    beforeEach(()=> localStorage.clear())

    test('debe de regresar los valores por defecto', () => { 
        const mockStore = getMockStore({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        })
        const {result}  = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> (
                <Provider store={mockStore}
                >
                    {children}
                </Provider>
            )
        });

        
        expect(result.current).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
            starLogin: expect.any(Function),         
            starRegister: expect.any(Function),            
            checkAuthToken: expect.any(Function),
            starLogout: expect.any(Function), 
        })

    })

    test('startLogin debe de realizar el login correctamente', async () => { 
        const mockStore = getMockStore({...notAutheticatedState})
        const {result}  = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> (
                <Provider store={mockStore}
                >
                    {children}
                </Provider>
            )
        });

        await act(async()=> {
           await result.current.starLogin(testUserCredentials)
        })

        const {errorMessage, status, user} = result.current;
        expect ({errorMessage, status, user}).toEqual({errorMessage: undefined, status: 'authenticated', user:{ name: 'Test User', uid: '6644f5d4e620393c90f5c4e4' } })
        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
        

    })

    test('startLogin debe de fallar el login', async () => { 
        const mockStore = getMockStore({...notAutheticatedState})
        const {result}  = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> (
                <Provider store={mockStore}
                >
                    {children}
                </Provider>
            )
        });

        await act(async()=> {
           await result.current.starLogin({email:'emailito@falso.com', password:'1234556'})
        })

        const {errorMessage, status, user} = result.current;
        expect ({errorMessage, status, user}).toEqual({errorMessage: expect.any(String), status: 'not-authenticated', user:{} })
        expect(localStorage.getItem('token')).toBe(null)
        await waitFor(
            ()=> expect(result.current.errorMessage).toBe(undefined)
        )
        

    })

    test('startRegister debe de crear un usuario', async() => { 
        const newUser = {
            email:'emailito@test2.com', 
            password:'1234556', 
            name: 'Test User2' 
        }

        const mockStore = getMockStore({...notAutheticatedState})
        const {result}  = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> (
                <Provider store={mockStore}
                >
                    {children}
                </Provider>
            )
        });

        const spy = jest.spyOn(calendarAPi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: 'unID12343',
                name: 'Test User2',
                token: 'ALGUN-Token'
            }
        })

        await act(async()=> {
            await result.current.starRegister(newUser)
         });
        const {errorMessage, status, user} = result.current
        expect({errorMessage, status, user}).toEqual( {
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User2', uid: 'unID12343' }
          })
        spy.mockRestore();
    })

    test('startRegister debe de fallar', async() => { 


        const mockStore = getMockStore({...notAutheticatedState})
        const {result}  = renderHook(()=> useAuthStore(), {
            wrapper: ({children})=> (
                <Provider store={mockStore}
                >
                    {children}
                </Provider>
            )
        });

        await act(async()=> {
            await result.current.starRegister(testUserCredentials)
         });
        const {errorMessage, status, user} = result.current
        expect({errorMessage, status, user}).toEqual( {
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
          })
        
    })

 })