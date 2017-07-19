import React,{Component} from 'react'
import FaClose from 'react-icons/lib/fa/close'

import styles from './../css/notif.css'


export default class Notif extends Component{
    constructor(props){
        super(props)
        this.state={
            notif: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState((prevState) => {
            return {
                notif: !prevState.notif
            }
        })
    }

    render(){
        
        return(
            this.state.notif ? (
                <div className={styles.notif}>
                    <h2>Updates (18/08/17)</h2>
                    <p>Now the videos for each tune and the youtube player should be correctly bound. Hopefully you will be able to add video yourself soon !</p>
                    <p><a href="mailto:hassler@monemail.com">Alexandre Hassler</a></p>
                    <FaClose className={styles.notif_close} onClick={() => this.handleClick()}/>
                </div>
            ) : null
        )
    }
}
