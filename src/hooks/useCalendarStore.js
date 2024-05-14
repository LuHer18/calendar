import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarAPi from "../api/calendarAPi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const starSavigEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {
                await calendarAPi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                return;
            }
            const { data } = await calendarAPi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'eror')
            
        }
        //todo: update event
        

    }
    const starDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    const starLoadingEvents = async () => {
        try {

            const { data } = await calendarAPi.get('/events');
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log('Error Cargando eventos')
        }
    }

    return {
        //Propiedades
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        //metodos
        setActiveEvent,
        starSavigEvent,
        starDeletingEvent,
        starLoadingEvents
    }
}
