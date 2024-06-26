import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks"

jest.mock('../../../src/hooks/useCalendarStore')

describe('Pruebas en el componente FabDelete', () => { 

    const mockStartDeletingEvent = jest.fn()

    beforeEach(()=> jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => { 

        useCalendarStore.mockReturnValue({
            hasActiveEvent: false
        })

        render(<FabDelete/>)
        const btn = screen.getByLabelText('btn-delete')
        
        expect( btn.classList).toContain('btn')
        expect( btn.classList).toContain('btn-danger')
        expect( btn.style.display).toBe('none')

    })

    test('debe de mostrar el botón si hay un evento activo', () => { 

        useCalendarStore.mockReturnValue({
            hasActiveEvent: true
        })

        render(<FabDelete/>)
        const btn = screen.getByLabelText('btn-delete')
        expect( btn.style.display).toBe('')


    })
    test('debe de llamar starDeletingEvent si hay un evento activo', () => { 

        useCalendarStore.mockReturnValue({
            hasActiveEvent: true,
            starDeletingEvent: mockStartDeletingEvent
        })

        render(<FabDelete/>)
        const btn = screen.getByLabelText('btn-delete')
        
        fireEvent.click(btn);
        
        expect(mockStartDeletingEvent).toHaveBeenCalled();

    })
 })