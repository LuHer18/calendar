import { renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux"
import { store, uiSlice } from "../../src/store"
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
 })