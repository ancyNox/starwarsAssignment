export const FETCH_PLANETS_BEGIN = 'FETCH_PLANETS_BEGIN';
export const NAV_PLANETS_BEGIN = 'NAV_PLANETS_BEGIN';
export const FETCH_PLANETS_SUCCESS = 'FETCH_PLANETS_SUCCESS';
export const FETCH_PLANETS_FAILURE = 'FETCH_PLANETS_FAILURE';
export const LOGOUT = 'LOGOUT';

export const fetchPlanetsBegin = () => ({
    type: FETCH_PLANETS_BEGIN
});
export const navPlanetsBegin = () => ({
    type: NAV_PLANETS_BEGIN
});
export const logoutUser = login => ({
    type: LOGOUT,
    payload: {login}
});

export const fetchPlanetsSuccess = planets => ({
    type: FETCH_PLANETS_SUCCESS,
    payload: { planets }
});

export const fetchPlanetsFailure = error => ({
    type: FETCH_PLANETS_FAILURE,
    payload: { error }
});

export function fetchPlanets(e) {
    let planet = e.target.value;

    return dispatch => {
        dispatch(fetchPlanetsBegin());

        return fetch("https://swapi.co/api/planets/?search="+planet)
            .then(res => res.json())
            .then(planets => {
                console.log("planetsActions fetchPlanets", planets);
                dispatch(fetchPlanetsSuccess(planets));
            })
            .catch(error => dispatch(fetchPlanetsFailure(error)));
    };
}

export function navigatePlanets(url) {
    //let planet = e.target.value;

    return dispatch => {
        dispatch(navPlanetsBegin());

        return fetch(url)
            .then(res => res.json())
            .then(planets => {
                console.log("planetsActions fetchPlanets", planets);
                dispatch(fetchPlanetsSuccess(planets));
            })
            .catch(error => dispatch(fetchPlanetsFailure(error)));
    };
}

export function logout() {
    return dispatch => {
        dispatch(logoutUser(false));
    };
}