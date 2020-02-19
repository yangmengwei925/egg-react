import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import React from 'react'
import Login from '../views/login'
import Registry from '../views/registry'
import Main from '../views/main/index'

function Router(){
    return <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/registry' component={Registry}/>
            <Route path='/main' component={Main}/>
            <Redirect from ="/" to="/main"></Redirect>
        </Switch>
    </BrowserRouter>
}

export default Router