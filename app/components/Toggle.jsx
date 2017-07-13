import React, {Component} from 'react'
import FaCaretLeft from 'react-icons/lib/fa/caret-left'
import FaCaretRight from 'react-icons/lib/fa/caret-right'

// my module
import styles from './../css/toggle.css'

export default class Toggle extends Component {
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


