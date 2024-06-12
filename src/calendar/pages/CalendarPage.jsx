import { Calendar } from 'react-big-calendar'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { localizer, getMessages } from '../../helper'
import { useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect } from 'react'

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  )

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const onDoubleClick = () => {
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
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)
    const style = {
      backgroundColor: isMyEvent ? '#34CF7' : '#465660',
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
