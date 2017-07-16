import React,{Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import 'whatwg-fetch'

//my modules
import styles from './../css/main.css'
import Chat from './Chat.jsx'
import Toggle from './Toggle.jsx'
import Tune from './Tune.jsx'
import Search from './Search.jsx'
import SortBar from './SortBar.jsx'
import Player from './Player.jsx'
import Intro from './../pages/Intro.jsx'

export default class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            tunes: null,
            rhythm: "",
            filteredTunes: null,
            by: "",
            sidebar: true,
            player: false,
            videoid: ""
        }

        this.updateTuneList = this.updateTuneList.bind(this)
        this.sortById = this.sortById.bind(this)
        this.sortByKey = this.sortByKey.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.handleSidebar = this.handleSidebar.bind(this)
        this.handlePlayer = this.handlePlayer.bind(this)
        this.setRhythm = this.setRhythm.bind(this)
    }

    componentDidMount(){
        fetch('http://alexandre.hassler.fr:3000/tunes/reels')
            .then(res => res.json())
            .then(tunes => {
                this.setState({
                    tunes: tunes,
                    rhythm: "reels",
                    filteredTunes: tunes,
                    by: "id"
                })
            })
            .catch(err => console.log(err))
    }

    handleSidebar(){
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    updateTuneList(list){
        this.setState({
            filteredTunes: list
        })
    }

    sortByName(){
        this.updateTuneList(this.state.tunes.sort(function(a,b) {return (a.T > b.T) ? 1 : ((b.T > a.T) ? -1 : 0)}))
        this.setState({
            by: 'name'
        })
    }
    
    sortByKey(){
        this.updateTuneList(this.state.tunes.sort(function(a,b) {return (a.K > b.K) ? 1 : ((b.K > a.K) ? -1 : 0)}))
        this.setState({
            by: 'key'
        })
    }
    
    sortById(){
        this.updateTuneList(this.state.tunes.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)}))
        this.setState({
            by: 'id'
        })
    }

    setRhythm(rhythm){
        console.log(rhythm)
        fetch(`http://alexandre.hassler.fr:3000/tunes/${rhythm}`)
            .then(res => res.json())
            .then(tunes => {
                this.setState({
                    tunes: tunes,
                    rhythm: rhythm,
                    filteredTunes: tunes,
                    by: "id"
                })
            })
            .catch(err => console.log(err))
    }

    handlePlayer(id){
        this.setState((prevState) => {
            return {
                player: !prevState.player,
                videoid: id
            }
        })
    }

    render(){
        const {tunes, filteredTunes} = this.state
        const updateTuneList = this.updateTuneList
        return(
            <div>
                {this.state.player && this.state.videoid ? (
                    <Player id={this.state.videoid}/>
                ) : (null)}
                <Chat/>
                <div className={styles.root}>
                    <Search tunes={tunes} setRhythm={this.setRhythm} updateTuneList={updateTuneList}/>
                    <SortBar by={this.state.by} sortById={this.sortById} sortByName={this.sortByName} sortByKey={this.sortByKey}/>

                    <div className={styles.sidebar} >
                        {filteredTunes ? (
                            filteredTunes.map(tune => (
                                <NavLink exact to={`/${tune.id}`} key={tune.id} className={styles.sidebar_item} activeClassName={styles.active} >
                                    <div style={{width: '33px', color: '#ccc'}}>
                                        {tune.id}
                                    </div>
                                    <div style={{flex: 1, maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                        {tune.T}
                                    </div>
                                    <div style={{width: '33px', alignSelf: 'flexEnd', color: '#ccc'}}> 
                                        {tune.K}
                                    </div>
                                </NavLink>
                            ))
                        ) : (
                            <div>
                                Loading...
                            </div>
                        )}
                    </div>
                    <div className={styles.container} style={this.state.sidebar ? {marginLeft: '25rem'} : {marginLeft: 0}}>
                        <Toggle handleSidebar={this.handleSidebar} sidebar={this.state.sidebar}/>

                        <div className={styles.content}>
                            <Intro/>
                            {tunes && (
                                <Route path="/:tuneId" render={(routeProps) => (
                                    <Tune handlePlayer={this.handlePlayer} rhythm={this.state.rhythm} {...routeProps} tune={tunes.find( t => t.id == routeProps.match.params.tuneId)}/>
                                )} />
                            )}
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}



