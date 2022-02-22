const SET_COMPANY = 'SET_COMPANY';

export const setCompanyData = (data) => ({
    type: SET_COMPANY,
    data
});

const companyReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_COMPANY: {
            return {
                ...state,
                data: action
            }
        }
        default:
            return state;
    }
}

export default companyReducer;