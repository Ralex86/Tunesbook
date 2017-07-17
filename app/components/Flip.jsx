import React from 'react'
import { Motion, spring } from 'react-motion'
import styles from './../css/flip.css'

class DashboardCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rotate: 0
        }
    }

    render() {
        const { rotate } = this.state
        return (
            <Motion
                style={{y: rotate == 0 ? rotate : spring(rotate)}}
                onRest={() => {
                    window.setTimeout(() => {
                        if (this.state.rotate % 360 === 0) {
                            this.setState({ rotate: 0 })
                        }  
                    }, 0)
                }}
            >
                {({ y }) =>
                        <div
                            className={ styles.dashboardCard }
                            style={{transform: `rotateY(${y}deg)`}}
                            
                        >
                            <div className={ styles.dashboardCardFront }>
                                <ul>
                                    <li><span>Castkills</span><span>https://youtu.be/uWmB9qdS9MA</span><span>15/08/2017</span></li>
                                    <li><span>Castkills</span><span>https://youtu.be/uWmB9qdS9MA</span><span>15/08/2017</span></li>
                                    <li><span>Castkills</span><span>https://youtu.be/uWmB9qdS9MA</span><span>15/08/2017</span></li>
                                    <li><span>Castkills</span><span>https://youtu.be/uWmB9qdS9MA</span><span>15/08/2017</span></li>
                                    <li><span>Castkills</span><span>https://youtu.be/uWmB9qdS9MA</span><span>15/08/2017</span></li>
                                </ul>
                                <div className={styles.btn} onClick={() => this.setState({rotate: rotate + 180 })}>
                                    Click to add a new video !   
                                </div>
                            </div>
                            <div className={ styles.dashboardCardBack }>
                                <div>
                                    <div className={styles.cancel}>
                                        Cancel
                                    </div>
                                    <div className={styles.flipinput}>
                                        <input type='text' placeholder='Youtube link' />
                                    </div>
                                </div>
                                <div className={styles.btn} onClick={() => this.setState({rotate: rotate + 180 })}>
                                    Add the link to the database !    
                                </div>
                            </div>
                        </div>
                }
            </Motion>
        )
    }
}

export default class Flip extends React.Component {
    render() {
        return(
            <DashboardCard/>
        )
    }
}
