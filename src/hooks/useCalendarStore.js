import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const starSavigEvent = async(calendarEvent)=> {

        if(calendarEvent._id){
            dispatch(onUpdateEvent({...calendarEvent}))
        }else {
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime() }))
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
