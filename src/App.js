import React from 'react'
import Header from './components/common/Header'
import List from './List'
import NotFound from './NotFound'
import Detail from './Detail'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App(){
    return(
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={List} />
                    <Route path="/currency/:id" exact component={Detail} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App