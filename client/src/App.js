import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import Planets from './components/planets/Planets';
import Error from './components/system/Error';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route path="/" component={Login} exact/>
                            <Route path="/login" component={Login} />
                            <Route path="/viewPlanets" component={Planets} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
