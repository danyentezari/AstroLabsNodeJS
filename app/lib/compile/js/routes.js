import React, {Component} from 'react'
import {  
    HashRouter as Router, 
    Route, 
    Switch, 
    IndexRoute,
    hashHistory 
} from 'react-router-dom'
import Cards from './containers/Cards'

class Routes extends Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Cards}/>
                </Switch>
            </Router>
        )
    }
}
export default Routes 