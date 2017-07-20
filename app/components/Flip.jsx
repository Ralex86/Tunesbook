import React from 'react'
import { Motion, spring } from 'react-motion'
import styles from './../css/flip.css'

import 'whatwg-fetch'

class DashboardCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rotate: 0,
            videolist: null,
            link: "",
            url: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.updateAfterSuccess = this.updateAfterSuccess.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        fetch(`http://alexandre.hassler.fr:3000/youtube/${this.props.rhythm}/${this.props.tuneid}`)
            .then(res => res.json())
            .then(list => {
                this.setState({
                    videolist: list
                })    
            })
            .catch(err => console.log(err))
    }


    componentWillReceiveProps(){
        fetch(`http://alexandre.hassler.fr:3000/youtube/${this.props.rhythm}/${this.props.tuneid}`)
            .then(res => res.json())
            .then(list => {
                this.setState({
                    videolist: list
                })    
            })
            .catch(err => console.log(err))
    }

    handleInputChange(event){
        const target = event.target
        const value = target.value
        const name = target.name
        
        console.log(value)
        //cool ES6 feature to remember
        this.setState({
            [name]: value
        })
    }

    updateAfterSuccess(){
        const {rotate} = this.state
        fetch(`http://alexandre.hassler.fr:3000/youtube/${this.props.rhythm}/${this.props.tuneid}`)
            .then(res => res.json())
            .then(list => {
                this.setState({
                    videolist: list
                })    
                this.setState({rotate: rotate + 180 })
            })
            .catch(err => console.log(err))
    }

    handleClick(){
        if(this.state.url && this.state.title && this.state.videolist.length < 5){
            let body =JSON.stringify({
                url: this.state.url,
                title: this.state.title,
                tuneid: this.props.tuneid,
                rhythm: this.props.rhythm
            })
            console.log(body)
            console.log("Sending...")
            fetch('http://alexandre.hassler.fr:3000/submitvideo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            })
                .then(res => res.json())
                .then(message => {
                    console.log(message)
                    this.updateAfterSuccess()
                })
                .catch(err => console.log(err))
        }
    }


    handleVideoClick(youtubeID){
        this.props.handlePlayer(youtubeID)
    }

    render() {
        const { rotate } = this.state
        var { videolist } = this.state
        return (
            <Motion
                style={{y: rotate == 0 ? rotate : spring(rotate)}}
                onRest={() => {
                    window.setTimeout(() => {
                        if (this.state.rotate % 360 === 0) {
                            this.setState({ rotate: 0 })
                        }  
                    }, 0)
                }}
            >
                {({ y }) =>
                        <div
                            className={ styles.dashboardCard }
                            style={{transform: `rotateY(${y}deg)`}}
                            
                        >
                            <div className={ styles.dashboardCardFront }>
                                <ul>
                                    {videolist && videolist.length > 0 ? (
                                        videolist.map(link => (
                                            <li onClick={() => this.handleVideoClick(link.youtubeID)} key={link.id}><span>{ link.title }</span> <span> { link.youtubeID } </span></li> 
                                        ))
                                    
                                    ) : (
                                    <div className={styles.nocontent}>
                                        No video yet!
                                    </div> 
                                    )}
                                </ul>
                                <div className={styles.btn} onClick={() => this.setState({rotate: rotate + 180 })}>
                                    Click to add a new video !   
                                </div>
                            </div>
                            <div className={ styles.dashboardCardBack }>
                                <div className={styles.cancel} onClick={() => this.setState({rotate: rotate + 180 })} >
                                    Cancel
                                </div>
                                <div>
                                    <div className={styles.flipinput}>
                                        <input name="title" onChange={this.handleInputChange} type='text' placeholder='Title of the video' />
                                    </div>
                                    <div className={styles.flipinput}>
                                        <input name="url" onChange={this.handleInputChange} type='text' placeholder='Youtube link' />
                                    </div>
                                </div>
                                <div className={styles.btn} onClick={() => this.handleClick()}>
                                    Add the link to the database !    
                                </div>
                            </div>
                        </div>
                }
            </Motion>
        )
    }
}

export default class Flip extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <DashboardCard tuneid={this.props.tuneid} rhythm={this.props.rhythm}  handlePlayer={this.props.handlePlayer} videolist={this.props.videolist}/>
        )
    }
}
