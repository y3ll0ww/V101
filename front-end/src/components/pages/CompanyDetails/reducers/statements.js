const SET_STATEMENT = 'SET_STATEMENT';

export const setStatement = (statement) => ({
    type: SET_STATEMENT,
    statements
});

const statementReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_STATEMENT: {
            return {
                ...state,
                statements: action
            }
        }
        default:
            return state;
    }
}

export default statementReducer;