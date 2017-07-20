import React,{Component} from 'react'
import FaClose from 'react-icons/lib/fa/close'

import styles from './../css/notif.css'

import 'whatwg-fetch'

export default class Notif extends Component{
    constructor(props){
        super(props)
        this.state={
            notif: true,
            list: null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        fetch('http://alexandre.hassler.fr:3000/latest')
            .then(res => res.json())
            .then(list => {
                this.setState({
                    list: list
                })
            })
            .catch(err => console.log(err))
    }

    handleClick(){
        this.setState((prevState) => {
            return {
                notif: !prevState.notif
            }
        })
    }

    render(){
       const {list} = this.state 
        console.log(list)
        return(
            this.state.notif ? (
                <div className={styles.notif}>
                    <h2>Latest videos submissions</h2>
                    <ul>
                        {list ? (
                            list.map((tune,index) => (
                                <li key={index}>
                                    <span> { tune.title } </span>
                                    <span> { tune.CreatedOn.slice(0,10) } </span>
                                </li>
                            ))
                        ) : <span>loading</span>}
                    </ul>
                    <FaClose className={styles.notif_close} onClick={() => this.handleClick()}/>
                </div>
            ) : null
        )
    }
}
