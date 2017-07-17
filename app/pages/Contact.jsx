import React from 'react'
import {Route} from 'react-router-dom'

//my modules
import styles from './../css/contact.css'

const Contact = (props) => {
    return (
        <Route exact={true} path="/contact" render={ ()=> (
            <div className={styles.contact}>
                contact
            </div>
        )} />
    )
}


export default Contact
