import React,{Component} from 'react'
import YouTube from 'react-youtube'

import styles from './../css/player.css'

export default class Player extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const opts = {
            height: '200',
            width: '350',
            playerVars: {
                autoplay: 1,
                color: "white",
                showinfo: 0,
                rel: 0
            }
        }
        const videoid = this.props.id
        return(
            <div className={styles.youtube}>
                <YouTube
                    videoId={videoid}
                    opts={opts}
                />
            </div>
        )
    }
}
