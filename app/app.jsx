import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import Main from './components/Main.jsx'

class App extends React.Component{
    render(){
        return(
                <HashRouter>
                    <Main/>
                </HashRouter>
        )
    }
}


ReactDOM.render((
    <App/>
), document.getElementById('app'))
    

