import { useSelector, useDispatch } from 'react-redux'
import {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onSetActiveEvent,
    onUpdateEvent,
} from '../store'
import calendarApi from '../api/calendarApi'
import { convertDbDateToCalendarDate } from '../helper'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector((state) => state.calendar)
    const { user } = useSelector((state) => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
            } else {
                const { data } = await calendarApi.post('/events', calendarEvent)
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
            }
        } catch (err) {
            console.log(err)
            Swal.fire('Error al guardar', err.response.data, 'error')
        }
    }

    const startDeletingEvent = async (calendarId) => {
        try {
            await calendarApi.delete(`/events/${calendarId}`)
            dispatch(onDeleteEvent())
        } catch (err) {
            console.log(err)
            Swal.fire('Error al eliminar', '', 'error')
        }
    }

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events')
            const eventos = convertDbDateToCalendarDate(data.eventos)
            dispatch(onLoadEvents(eventos))
        } catch (err) {
            console.log('Error cargando los eventos')
            console.log(err)
        }
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        deleteEvent: startDeletingEvent,
        startLoadingEvents,
    }
}
