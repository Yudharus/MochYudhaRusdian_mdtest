const redux = require('redux');
const createStore = redux.createStore;

const initialState = {

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_DATADETAILSURVEY':
            return {
                ...state,
                dataDetailSurvey: action.newValue
            }
        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;