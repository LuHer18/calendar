export const events = [
    {
        id: '1',
        title: 'Cumpleaños',
        start: new Date('2024-05-15 13:00:00'),
        end: new Date('2024-05-15 14:00:00'),
        notes: 'alguna nota',

    },
    {
        id: '2',
        title: 'Cumpleaños de nadie',
        start: new Date('2024-06-15 13:00:00'),
        end: new Date('2024-06-15 14:00:00'),
        notes: 'alguna nota más',

    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}
export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]}
}