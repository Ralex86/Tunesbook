import React from 'react'
import FaClose from 'react-icons/lib/fa/close'

import styles from './../css/notif.css'

const Notif = () => {
    return (
        <div className={styles.notif}>
            <h2>Updates (15/08/17)</h2>
            <p>Currently trying to add the youtube feature properly...</p>
            <p><a href="mailto:hassler@monemail.com">Alexandre Hassler</a></p>
            <FaClose className={styles.notif_close}/>
        </div>
    )
}

export default Notif
