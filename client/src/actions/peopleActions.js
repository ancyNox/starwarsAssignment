export const FETCH_PEOPLE_BEGIN = 'FETCH_PEOPLE_BEGIN';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_FAILURE = 'FETCH_PEOPLE_FAILURE';
export const FETCH_PEOPLE_INVALID = 'FETCH_PEOPLE_INVALID';

export const fetchPeopleBegin = () => ({
    type: FETCH_PEOPLE_BEGIN
});

export const fetchPeopleSuccess = people => ({
    type: FETCH_PEOPLE_SUCCESS,
    payload: { people }
});
export const fetchPeopleInvalid = () => ({
    type: FETCH_PEOPLE_INVALID
});

export const fetchPeopleFailure = error => ({
    type: FETCH_PEOPLE_FAILURE,
    payload: { error }
});


export function onSubmit(evt){
    return dispatch => {
        let username = evt.target.querySelector('#username').value;
        let password = evt.target.querySelector('#password').value;
        console.log("fetchPeople action");
        dispatch(fetchPeopleBegin());

        return fetch("https://swapi.co/api/people/?search="+username)
            .then(res => res.json())
            .then(people => {
                console.log("peopleActions fetchPople", people.results);
                if(people.results.length>0 && 
                    (people.results[0].birth_year == password && people.results[0].name == username))
                    dispatch(fetchPeopleSuccess(people));
                else 
                    dispatch(fetchPeopleInvalid());
            })
            .catch(error => dispatch(fetchPeopleFailure(error)));
    };
}