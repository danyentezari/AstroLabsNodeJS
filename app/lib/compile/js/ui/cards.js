import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import C from '../store/constants'
const Config = require('../../../../config.app'),conf = new Config();

const Buttons = props => {
   
    
    const 
        {index, deleteCard, editCard, data} = props,
        edit_mode = (data.edit_mode == undefined)? 
            false : data.edit_mode;

    var classnames = "btn btn-sm " 
        .concat((edit_mode)? "btn-success": "btn-secondary");
    
    var icon = "fa "
        .concat((edit_mode)? "fa-check": "fa-pencil");

    return(<div className="btn-group" role="group" aria-label="First group">
        <button type="button" className={classnames}
        onClick={()=>
            editCard({index: index})
        }>
            <i className={icon} aria-hidden="true"></i>
        </button>
        <button type="button" className="btn btn-sm btn-danger"
        onClick={()=>deleteCard({index: index})}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
    </div>)
}

const Card = (props)=> {
    var {data, index, changeCard, enterEdit, exitEdit} = props;
    var classnames = "card ".concat((data.edit_mode)? "editmode": "");
    return (
    <div className={classnames}>
        <div className="card-body">
            <div className="btn-toolbar justify-content-between" 
            role="toolbar" aria-label="Toolbar with button groups">
                <input type="text" className="card-title" 
                value={data.title}
                placeholder={"Todo item " + index}
                onChange={(event)=>
                    changeCard({
                        title: event.target.value,
                        body: data.body,
                        _id: data._id,
                        index: index 
                    })
                }
                onFocus={()=>enterEdit({index: index})}
                />
                <Buttons index={index} {...props}/>
            </div>
            <div className="form-group">
                <textarea className="form-control"
                placeholder="Enter description..."
                value={data.body} 
                onChange={event=>
                    changeCard({
                        title: data.title,
                        body: event.target.value, 
                        _id: data._id,
                        index: index 
                    })
                }
                onFocus={()=>enterEdit({index: index})}
                />
            </div>
        </div>
    </div>)
};

class CardContainer extends Component { 
    
    constructor(props) {
        super(props);
        this.props.getCards();
    }

    render() {
        const {cards, addCard} = this.props;
        return (
            <div>
                <button className="btn btn-primary"
                onClick={()=>addCard()}>
                    <i className="fa fa-plus" aria-hidden="true"></i>   
                    &nbsp;<b>Add a card</b>                 
                </button>

                {cards.map((item, i)=>
                    <Card data={item} index={i} key={i} {...this.props}/>)}
            </div>
        )
    }
};

export default CardContainer;