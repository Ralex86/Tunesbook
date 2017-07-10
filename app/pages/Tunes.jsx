import React,{Component} from 'react'
import {NavLink, Route} from 'react-router-dom'
import 'whatwg-fetch'
import styles from './../css/tunes.css'
import Chat from './../Chat.jsx'
import FaCaretLeft from 'react-icons/lib/fa/caret-left'
import FaCaretRight from 'react-icons/lib/fa/caret-right'
import FaMusic from 'react-icons/lib/fa/music'

export default class Tunes extends Component {
    constructor(props){
        super(props)

        this.state = {
            tunes: null,
            filteredTunes: null,
            by: "",
            sidebar: true
        }

        this.updateTuneList = this.updateTuneList.bind(this)
        this.sortById = this.sortById.bind(this)
        this.sortByKey = this.sortByKey.bind(this)
        this.sortByName = this.sortByName.bind(this)
        this.handleSidebar = this.handleSidebar.bind(this)
    }

    componentDidMount(){
        fetch('http://alexandre.hassler.fr:3000/tunes')
            .then(res => res.json())
            .then(tunes => {
                this.setState({
                    tunes: tunes,
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

    render(){
        const {tunes, filteredTunes} = this.state
        const updateTuneList = this.updateTuneList
        return(
            <div>
            <Chat/>
            <div className={styles.root}>
                <Search tunes={tunes} updateTuneList={updateTuneList}/>
                <SortBar by={this.state.by} sortById={this.sortById} sortByName={this.sortByName} sortByKey={this.sortByKey}/>

                <div className={styles.sidebar} >
                    {filteredTunes ? (
                        filteredTunes.map(tune => (
                            <NavLink exact to={`/${tune.id}`} key={tune.id} className={styles.sidebar_item} activeClassName={styles.active} >
                                <div style={{width: '33px'}}>
                                    {tune.id}
                                </div>
                                <div style={{flex: 1, maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                    {tune.T}
                                </div>
                                <div style={{width: '33px', alignSelf: 'flexEnd'}}> 
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
                        <Route exact={true} path="/" render={ ()=> (
                            <div className={styles.intro}>
                                <div className={styles.intro_message}>
                                    <h2>Welcome !</h2>
                                    <p>
                                        This is a little web app designed for finding reels quickly through a simple and straightfoward interface. Here's what you should know before you start:
                                    </p>
                                    <ol>
                                        <li>You can search for a reel and the sidebar autorefresh as you type</li>
                                        <li>You can sort the list of reels by id, titles and keys</li>
                                        <li>Each reel has its own route and your browser will add it to the history</li>
                                    </ol>
                                    <p>
                                        The database was populated with <a href="http://www.norbeck.nu/abc/">Henrik Norbeck's</a> reels transcriptions. The svg rendering is done on the server side thanks to <a href="http://moinejf.free.fr/js/">Jeff Moine's</a> abc2svg api !
                                    </p>
                                    <p>
                                        This app is open source and its github repo is avaible <a href="https://github.com/Ralex86/Tunesbook">here</a> ! 
                                    </p>
                                </div>
                            </div>
                        )} />

                        {tunes && (
                            <Route path="/:tuneId" render={(routeProps) => (
                                <Tune {...routeProps} tune={tunes.find( t => t.id == routeProps.match.params.tuneId)}/>
                            )} />

                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

class Toggle extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(callback){
        callback()
    }

    render(){
        const handleSidebar = this.props.handleSidebar
        return (
            <div className={styles.toggle} onClick={() => this.handleClick(handleSidebar)}>
                {this.props.sidebar ? <FaCaretLeft/> : <FaCaretRight/>}
                <span className={styles.tooltip}>{this.props.sidebar ? 'Hide sidebar' : 'Show sidebar'}</span>
            </div>
        )
    }
}

class Tune extends Component {
    constructor(props){
        super(props)

        this.state={
            tune: props.tune,
            svg: null,
            showabc: false
        }

        this.handleClick = this.handleClick.bind(this)
    }  

    componentDidMount(){
        fetch(`http://alexandre.hassler.fr:3000/tune?id=${this.props.tune.id}`)
            .then(res => res.json())
            .then(svg => {
                this.setState({
                    svg: svg[0].svg
                })    
            })
            .catch(err => console.log(err))
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.tune.id !== this.props.tune.id){
            fetch(`http://alexandre.hassler.fr:3000/tune?id=${nextProps.tune.id}`)
                .then(res => res.json())
                .then(svg => {
                    this.setState({
                        svg: svg[0].svg
                    })    
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    handleClick(){
        this.setState((prevState, props) => {
            return { showabc: !prevState.showabc } 
        })
    }

    render(){
        const {tune} = this.props
        const {svg} = this.state
        return (
            <div>
                <div onClick={this.handleClick} className={styles.abc_btn}>
                    <FaMusic/> abc
                </div>
                {tune && this.state.showabc ? (
                    <div className={styles.abc}>
                        <div className={styles.abc_header}>
                            <p>X:<span>{tune.id}</span></p>
                            <p>T:<span>{tune.T}</span></p>
                            <p>R:<span>{tune.R}</span></p>
                            <p>M:<span>{tune.M}</span></p>
                            <p>K:<span>{tune.K}</span></p>
                            {tune.body}
                        </div>
                    </div>
                ) : (null)}

                {svg ?(
                    <Svg svg={svg}/>
                ) : (
                    <div>
                        Loading...
                    </div>
                )}
            </div>
        )
    }
}

class Svg extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <div dangerouslySetInnerHTML={{__html: this.props.svg}}>
            </div>    
        )
    }

}

class SortBar extends Component {
    constructor(props){
        super(props)

        this.handleSortId = this.handleSortId.bind(this)
        this.handleSortName = this.handleSortName.bind(this)
        this.handleSortKey = this.handleSortKey.bind(this)
    }

    handleSortId(){
        this.props.sortById()
    }
    
    handleSortName(){
        this.props.sortByName()
    }

    handleSortKey(){
        this.props.sortByKey()
    }

    render(){
        return(

            <div className={styles.header_bar}>
                <div style={this.props.by === "id" ?  {color: '#398df0' ,width: '33px'} : {width: '33px'} } onClick={this.handleSortId}>
                    id
                </div>
                <div style={this.props.by === "name" ?  {color: '#398df0' ,flex: 1, maxWidth: '300px'} : {flex: 1, maxWidth: '300px'} } onClick={this.handleSortName}>
                    Title
                </div>
                <div style={this.props.by === "key" ?  {color: '#398df0' ,width: '33px', alignSelf: 'flexEnd'} : {width: '33px', alignSelf: 'flexEnd'} } onClick={this.handleSortKey} >
                    Key
                </div>
            </div>    
        )
    }
}

class Search extends Component {
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.filteredTunes = this.filteredTunes.bind(this)
    
    }

    filteredTunes(tunes, substring){
        return tunes.filter(value => value["T"].toLowerCase().indexOf(substring.toLowerCase()) !== -1)
    }

    handleChange(e){
        let tunes = this.props.tunes
        let substring = e.target.value
        let filtered_tunes = this.filteredTunes(tunes,substring)
        this.props.updateTuneList(filtered_tunes)
    }

    render(){
        return(
            <div className={styles.header}>
                <div className={styles.search}>
                    <input placeholder="Search a reel..." autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" type="text" onChange={this.handleChange}/>
                </div>
            </div>   
        )
    }
}
