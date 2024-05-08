import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEventBox, CalendarModal, FabAddNew, NavBar, FabDelete } from '../'
import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'



export const CalendarPage = () => {
  const {events, setActiveEvent} = useCalendarStore()
  const {openDateModal} = useUiStore();

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }
  const onDoubleClick = (event) => {
    /* console.log({doubleClick: event}); */
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged= (event) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}
