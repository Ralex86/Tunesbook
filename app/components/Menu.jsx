import React,{Component} from 'react'
import FaBook from 'react-icons/lib/fa/book'
import FaClose from 'react-icons/lib/fa/close'

import styles from './../css/menu.css'

export default class Menu extends Component{
    constructor(props){
        super(props)
        this.state = {
            open: false
        } 

        this.handleClick = this.handleClick.bind(this)
        this.handleRhythm = this.handleRhythm.bind(this)
    }

    handleClick(){
        this.setState((prev,next) => {
            return {open: !prev.open}   
        })
    }
    
    handleRhythm(rhythm){
        this.handleClick()
        this.props.setRhythm(rhythm)
    }

    render(){
        const menu = this.state.open ? styles.open : styles.close
        return (
            <div>
                <FaBook onClick={this.handleClick} className={styles.btn}/>
                <div  className={menu}>
                    <div className={styles.menu_title} onClick={this.handleClick} >
                        <span>
                            Rhythm
                        </span>
                        <FaClose className={styles.close_btn}/>
                    </div>
                    <a onClick={() => this.handleRhythm("reels")}>Reels</a>
                    <a onClick={() => this.handleRhythm("jigs")}>Jigs</a>
                    <a onClick={() => this.handleRhythm("hornpipes")}>Hornpipes</a>
                    <a onClick={() => this.handleRhythm("polkas")}>Polkas</a>
                    <a onClick={() => this.handleRhythm("slowsession")}>Lyon session</a>
                </div>
            </div>
        )
    }
}
