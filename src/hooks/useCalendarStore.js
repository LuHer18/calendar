import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarAPi from "../api/calendarAPi";


export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const starSavigEvent = async(calendarEvent)=> {
        //todo: update event
        if(calendarEvent._id){
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

    return {
        //Propiedades
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        //metodos
        setActiveEvent,
        starSavigEvent,
        starDeletingEvent
    }
}
