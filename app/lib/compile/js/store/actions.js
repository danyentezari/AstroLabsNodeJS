import C from './constants'
import fetch from 'isomorphic-fetch'
var Config = require('../../../../config.app'),
    conf = new Config();


export const getCards = (payload)=>(dispatch, getState)=> {
    fetch(conf.domain + '/get-cards', {  
        method: 'GET',  
        headers: new Headers(),
        mode: 'cors'
    })
    .then(response=>response.json())
    .then(response=>dispatch({
        type: C.SET_CARDS,
        payload: response
    }))
}

export const addCard =(payload)=>(dispatch, getState)=> {

    var state = getState(),
        cards = state.cards,
        newCards = cards.slice();

    fetch(conf.domain + '/add-card', {  
        method: 'POST',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({edit_mode: false, title: '', body: '', date: new Date()})
    })
    .then(response=>response.json())
    .then(response=>{

        dispatch({
            type: C.SET_CARDS,
            payload: newCards.concat(response)
        })
    })
}

export const deleteCard = (payload)=>(dispatch, getState)=>{
    var state = getState(),
        cards = state.cards,
        index = payload.index,
        newCards = cards.slice();

    fetch(conf.domain + '/delete-card', {  
        method: 'DELETE',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: newCards[index]._id, 
        })
    })
    .then(response=>response.json())
    .then(response=>{
        console.log('response is', response);
    })

    newCards.splice(payload.index,1);
    dispatch({
        type: C.DELETE_CARD,
        payload: newCards
    });
}

export const editCard = (payload)=>(dispatch, getState)=>{
    var state = getState(),
        cards = state.cards,
        index = payload.index,
        edit_mode = payload.edit_mode,
        newCards = cards.slice();

    newCards[index].edit_mode = !newCards[index].edit_mode;

    // If no longer editing; i.e, clicking 'tick' sign.
    if(!edit_mode)
        fetch(conf.domain + '/change-card', {  
            method: 'PUT',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: newCards[index]._id, 
                edit_mode: false, 
                title: newCards[index].title, 
                body: newCards[index].body
            })
        })
        .then(response=>response.json())
        .then(response=>{
            //console.log('response is', response);
        })

    dispatch({
        type: C.EDIT_CARD,
        payload: newCards
    })
}

export const changeCard =(payload)=>(dispatch, getState)=> {
    
    var state = getState(),
        cards = state.cards,
        index = payload.index,
        body = payload.body,
        _id = payload._id,
        title = payload.title,
        newCards = cards.slice();
        
    newCards[index].body = body;
    newCards[index].title = title;
    newCards[index]._id = _id;
    newCards[index].edit_mode = true;

    dispatch({
        type: C.CHANGE_CARD,
        payload: newCards
    })
}

export const enterEdit =(payload)=>(dispatch, getState)=> {
    var state = getState(),
    cards = state.cards,
    index = payload.index,
    newCards = cards.slice();

    newCards[index].edit_mode = true;

    dispatch({
        type: C.CHANGE_CARD,
        payload: newCards
    })
}

export const exitEdit =(payload)=>(dispatch, getState)=> {
    var state = getState(),
    cards = state.cards,
    index = payload.index,
    newCards = cards.slice();

    newCards[index].edit_mode = false;

    dispatch({
        type: C.CHANGE_CARD,
        payload: newCards
    })
}