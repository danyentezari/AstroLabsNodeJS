import C from './constants'
import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const Config = require('../../../../config.app'),conf = new Config();

const consoleMessages = store => next => action => {

	
	let result = next(action)
	if(conf.pipeline == 'production') return result;

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log(`
		${JSON.stringify(store.getState(),null,2)}
	`) 
	console.groupEnd()
	return result;

}

export default (initialState={}) => {
	return applyMiddleware(thunk,consoleMessages)(createStore)(appReducer, initialState)
}