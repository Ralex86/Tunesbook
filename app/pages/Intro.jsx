import React from 'react'
import {Route} from 'react-router-dom'

//my modules
import styles from './../css/intro.css'
import Notif from './../components/Notif.jsx'

const Intro = (props) => {
    return (
            <Route exact={true} path="/" render={ ()=> (
                <div className={styles.intro}>
                    <Notif/>
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
    )
}


export default Intro
