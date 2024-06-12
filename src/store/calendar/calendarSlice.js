import { createSlice } from '@reduxjs/toolkit'

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
        onClearCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = []
            state.activeEvent = null
        },
    },
})

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onClearCalendar,
} = calendarSlice.actions
