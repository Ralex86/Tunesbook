import React from 'react'
import {Route} from 'react-router-dom'

//my modules
import styles from './../css/discussion.css'

const Discussion = (props) => {
    return (
        <Route exact={true} path="/discussion" render={ ()=> (
            <div className={styles.discussion}>
                Discussion
            </div>
        )} />
    )
}


export default Discussion
