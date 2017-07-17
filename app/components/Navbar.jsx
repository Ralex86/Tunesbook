import React, {Component} from 'react'
import {NavLink, Route} from 'react-router-dom'

import styles from './../css/navbar.css'
import Chat from './Chat.jsx'

export default class Navbar extends React.Component{
    render(){
        return(
            <div className={styles.navbar}>
                <div className={styles.navbar_link}>
                    <NavLink exact to={'/'} className={styles.home}>Tunebook</NavLink>
                    <NavLink exact to={'/discussion'} className={styles.link}>Discussion</NavLink>
                    <NavLink exact to={'/contact'} className={styles.link}>Contact</NavLink>
                </div>
                <Chat/>
            </div>
        )
    }
}
