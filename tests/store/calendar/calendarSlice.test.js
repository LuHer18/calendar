import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, events, initialState } from "../../fixtures/calendarStates"

describe('Pruebas en calendarSlice', () => {
    test('debe de regresar el estado inicial', () => {
        expect(calendarSlice.getInitialState()).toEqual(initialState)
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0])
    })

    test('onAddNewEvent debe de agregar el evento', () => {
        const newEvent = {
            id: '3',
            title: 'Cumpleaños feliz',
            start: new Date('2024-07-15 13:00:00'),
            end: new Date('2024-07-15 14:00:00'),
            notes: 'alguna nota nueva por agregar',
        }

        const state = calendarSlice.reducer(calendarWithActiveEventState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent])
    })
    test('onUpdateEvent debe de actualizar el evento', () => {
        const udapteEvent = {
            id: '1',
            title: 'Cumpleaños actualizado',
            start: new Date('2024-05-15 13:00:00'),
            end: new Date('2024-05-15 14:00:00'),
            notes: 'alguna nota por actualizar',
        }

        const state = calendarSlice.reducer(calendarWithActiveEventState, onUpdateEvent(udapteEvent));
        expect(state.events).toContain(udapteEvent)
    })

    test('onDeleteEvent debe de borrar el evento activo', () => { 
        //calendarWithActiveEventState
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent())

        expect(state.events).not.toContain(events[0])
        expect(state.activeEvent).toBe(null)
    })
    test('onLoadEvents debe de establecer los eventos', () => { 
        //InitialState
        const state = calendarSlice.reducer(initialState, onLoadEvents(events))

        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

    })

    test('onLogoutCalendar debe de limpiar el estado', () => { 
        //calendarWithActiveEventState
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar())
        expect(state).toEqual(initialState)

    })
})