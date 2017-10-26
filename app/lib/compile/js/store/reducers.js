import C from './constants'
import { combineReducers } from 'redux'
import configFunc from '../../../../config.app'
const config = configFunc();

/**
 * something
 * @param {*} state 
 */
export const cards = (state=false, action) => {
  switch(action.type){
    case C.SET_CARDS:
    case C.CHANGE_CARD:
    case C.DELETE_CARD:
    case C.EDIT_CARD:
      return action.payload
      break;
    default:
      return state;
  }
}

export default combineReducers({
  cards
})