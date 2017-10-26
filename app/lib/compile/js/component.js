import React from 'react'
import { render } from 'react-dom'
import Routes from './routes'
import initData from './initial-state'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { addError } from './store/actions'
import C from './store/constants'

//Clear storage on start.
localStorage.clear();

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) : initData

const saveState = () => 
    localStorage["redux-store"] = JSON.stringify(store.getState())

const store = storeFactory(initialState);
store.subscribe(saveState)

window.store = store;

const component = function(args_component){  
    render(
        <Provider store={store}>
            <Routes/>
        </Provider>,
        document.getElementById(args_component.container) 
    )  
}
module.exports = component;