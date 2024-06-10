import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { localizer, getMessages } from '../../helper'
import { useState } from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

import 'react-big-calendar/lib/css/react-big-calendar.css'

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  )

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#34CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
    return {
      style,
    }
  }

  return (
    <>
      <Navbar />

      <Calendar
        defaultView={lastView}
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}
