import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import Tunes from './pages/Tunes.jsx'

class App extends React.Component{
    render(){
        return(
                <HashRouter>
                    <Tunes/>
                </HashRouter>
        )
    }
}


ReactDOM.render((
    <App/>
), document.getElementById('app'))
    

