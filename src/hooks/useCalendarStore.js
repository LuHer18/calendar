import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarAPi from "../api/calendarAPi";
import { convertEventsToDateEvents } from "../helpers";


export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const starSavigEvent = async(calendarEvent)=> {
        //todo: update event
        if(calendarEvent.id){
            dispatch(onUpdateEvent({...calendarEvent}))
        }else {
            const {data} = await calendarAPi.post('/events', calendarEvent)
            console.log(data)
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user }))
        }
    }
    const starDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }

    const starLoadingEvents = async() => {
        try {

            const {data} = await calendarAPi.get('/events');
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadEvents(events))
            console.log(events)
            
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
