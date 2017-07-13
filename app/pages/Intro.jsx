import React from 'react'
import {Route} from 'react-router-dom'
import styles from './../css/intro.css'

const Intro = (props) => {
    return (
            <Route exact={true} path="/" render={ ()=> (
                <div className={styles.intro}>
                    <div className={styles.intro_updates}>
                        <h2>Updates (13/08/17)</h2>
                        <p>Currently updating the database and adding jigs. Will add a button to select type of tunes and maybe a guestbook to suggest ideas...</p>
                        <div><a href="mailto:hassler@monemail.com">Alexandre Hassler</a></div>
                    </div>
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
