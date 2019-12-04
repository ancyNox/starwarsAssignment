import { 
    FETCH_PEOPLE_BEGIN,
    FETCH_PEOPLE_SUCCESS,
    FETCH_PEOPLE_FAILURE,
    FETCH_PEOPLE_INVALID
} from "../actions/peopleActions";
import { 
    FETCH_PLANETS_BEGIN,
    FETCH_PLANETS_SUCCESS,
    FETCH_PLANETS_FAILURE,
    NAV_PLANETS_BEGIN,
    LOGOUT
} from "../actions/planetsActions";

const initialState = {
    people: null,
    planets: [],
    loading: false,
    error: null,
    login: false,
    count: 0,
    firstSearch:null
};

export default function allReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PEOPLE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_PEOPLE_SUCCESS:
            return {
                ...state,
                loading: false,
                people: action.payload.people,
                login: true,
                count: 0
            };

        case FETCH_PEOPLE_INVALID:
            return {
                ...state,
                loading: false,
                error: "Invalid User",
                login: false
            };

        case FETCH_PEOPLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                people: null,
                login: false
            };

            case FETCH_PLANETS_BEGIN:
                if(state.count == 0 || state.count >= 15){
                    state.firstSearch = Date().substring(15,24);
                    if(state.people.results[0].name!="Luke Skywalker")
                    state.count = 0;
                }
                state.count++;
                return {
                    ...state,
                    loading: true,
                    error: null
                };
            case NAV_PLANETS_BEGIN:
                return {
                    ...state,
                    loading: true,
                    error: null
                };

        case FETCH_PLANETS_SUCCESS:
            return {
                ...state,
                loading: false,
                planets: action.payload.planets
            };

        case FETCH_PLANETS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                planets: []
            };
            case LOGOUT:
                return{
                    ...state,
                    login: false
                };
        default:
            return state;
    }
}