import { addHours } from 'date-fns'
import { createSlice } from '@reduxjs/toolkit'

//const tempEvent = {
//    _id: new Date().getTime(),
//    title: 'Cumpleanos del Jefe',
//    notes: 'Hay que comprar el pastel',
//    start: new Date(),
//    end: addHours(new Date(), 2),
//    bgColor: '#fafafa',
//    user: {
//      _id: '123',
//      name: 'Francis',
//    },
//}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: false,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((e) => (e.id == payload.id ? payload : e))
            state.activeEvent = null
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter((e) => e.id !== state.activeEvent.id)
                state.activeEvent = null
            }
        },
        onLoadEvents: (state, { payload }) => {
            state.isLoadingEvents = false
            state.events = payload
        },
    },
})

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
} = calendarSlice.actions
