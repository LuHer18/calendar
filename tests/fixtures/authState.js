export const initialState = {
    status: 'not-authenticated', //'authenticated' 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

export const autheticatedState = {
    status: 'authenticated', //'authenticated' 'not-authenticated'
    user: {
        uid: 'ABC',
        name: 'Luis'
    },
    errorMessage: undefined,
}
export const notAutheticatedState = {
    status: 'not-authenticated', //'authenticated' 'not-authenticated'
    user: {},
    errorMessage: undefined,
}