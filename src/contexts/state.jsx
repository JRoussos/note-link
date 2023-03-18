const currentDate = new Date()
const initialState = {
    receivedSortedNotes: [],
    hashtagArray: [],
    activeHashtags: [],
    displayDate: [
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString(),
        new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1).toISOString()
    ],
    error: {},
    tempNote: {},
    receivedNotesStatus: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_HASHTAG_ARRAY':
            return { ...state, hashtagArray: [ ...new Set( action.hashtagArray )] }
        case 'CHANGE_ACTIVE_HASHTAGS':
            return { ...state, activeHashtags: action.activeHashtags }
        case 'CHANGE_RECEIVED_SORTED_NOTES':
            return { ...state, receivedSortedNotes: action.receivedSortedNotes }
        case 'CHANGE_DISPLAY_DATE': 
            return { ...state, displayDate: action.displayDate }
        case 'CHANGE_RECEIVED_NOTES_STATUS': 
            return { ...state, receivedNotesStatus: action.receivedNotesStatus }
        case 'CHANGE_TEMP_NOTE':
            return { ...state, tempNote: action.tempNote }
        case 'CHANGE_TOAST_LOG':
            return { ...state, error: action.error }
        default:
            throw new Error('Reducer Error');
    }
}

export {initialState, reducer}