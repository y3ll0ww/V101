const SET_SELECTION = 'SET_SELECTION';

export const setSelection = (selection) => ({
    type: SET_SELECTION,
    selection
});

const selectionReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_SELECTION: {
            return {
                ...state,
                selection: action
            }
        }
        default:
            return state;
    }
}

export default selectionReducer;