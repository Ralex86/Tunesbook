import React from 'react'
import FaClose from 'react-icons/lib/fa/close'

import styles from './../css/notif.css'

const Notif = () => {
    return (
        <div className={styles.notif}>
            <h2>Updates (13/08/17)</h2>
            <p>Currently updating the database and adding jigs. Will add a button to select type of tunes and maybe a guestbook to suggest ideas...</p>
            <p><a href="mailto:hassler@monemail.com">Alexandre Hassler</a></p>
            <FaClose className={styles.notif_close}/>
        </div>
    )
}

export default Notif
