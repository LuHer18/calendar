import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import {  uiSlice } from "../../src/store"
import { configureStore } from "@reduxjs/toolkit"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState}
        }
    })
}

describe('Pruebas en useUiStore', () => { 

    test('debe regresar los valores por defecto', () => { 

        const mockStore = getMockStore({isDateModalOpen: false})

        const {result}  = renderHook(()=> useUiStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider>
        })
        //el renderHook, permite un segundo argumento, en este caso el wrapper que cuyo valor es una función que devuelve un compoente JSX, por lo cual permite renderizar el Provider de react-redux

        expect(result.current).toEqual(  {
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
          })
    })

    test('OpenDateModal debe de colocar en true el valor en isDateModalOpen', () => { 

        const mockStore = getMockStore({isDateModalOpen: false})

        const {result}  = renderHook(()=> useUiStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider>
        });

        const {openDateModal} = result.current;

        act(()=>{openDateModal()})

        expect(result.current.isDateModalOpen).toBeTruthy();


    })
    test('closeDateModal debe de colocar en true el valor en isDateModalOpen', () => { 

        const mockStore = getMockStore({isDateModalOpen: true})

        const {result}  = renderHook(()=> useUiStore(), {
            wrapper: ({children})=> <Provider store={mockStore}>{children}</Provider>
        });

        const {closeDateModal} = result.current;

        act(()=>{closeDateModal()})
        expect(result.current.isDateModalOpen).toBeFalsy();


    })
 })