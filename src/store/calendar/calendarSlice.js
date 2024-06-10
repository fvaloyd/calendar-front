import { addHours } from 'date-fns'
import {createSlice} from '@reduxjs/toolkit'

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleanos del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Francis',
    },
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload)
            state.activeEvent = null
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(e => e._id == payload._id ? payload : e)
            state.activeEvent = null
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(e => e._id !== state.activeEvent._id)
                state.activeEvent = null
            }
        }
    }
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions