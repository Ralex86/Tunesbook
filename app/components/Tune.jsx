import React, {Component} from 'react'
import FaMusic from 'react-icons/lib/fa/music'
import FaYoutubePlay from 'react-icons/lib/fa/youtube-play'
import Flip from './Flip.jsx'

import 'whatwg-fetch'


//my modules
import Svg from './Svg.jsx'
import styles from './../css/tune.css'

export default class Tune extends Component {
    constructor(props){
        super(props)

        this.state={
            tune: props.tune,
            svg: null,
            showabc: false,
            showlist: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handlePlayer = this.handlePlayer.bind(this)
    }  

    componentDidMount(){
        fetch(`http://alexandre.hassler.fr:3000/svg/${this.props.rhythm}/${this.props.tune.id}`)
            .then(res => res.json())
            .then(svg => {
                this.setState({
                    svg: svg[0].svg
                })    
            })
            .catch(err => console.log(err))
        
        //fetch(`http://alexandre.hassler.fr:3000/youtube/${this.props.rhythm}/${this.props.tune.id}`)
        //    .then(res => res.json())
        //    .then(list => {
        //        this.setState({
        //            videolist: list
        //        })    
        //    })
        //    .catch(err => console.log(err))
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.tune.id !== this.props.tune.id){
            fetch(`http://alexandre.hassler.fr:3000/svg/${nextProps.rhythm}/${nextProps.tune.id}`)
                .then(res => res.json())
                .then(svg => {
                    this.setState({
                        svg: svg[0].svg
                    })    
                })
                .catch(err => console.log(err))

            //fetch(`http://alexandre.hassler.fr:3000/youtube/${nextProps.rhythm}/${nextProps.tune.id}`)
            //    .then(res => res.json())
            //    .then(list => {
            //        this.setState({
            //            videolist: list
            //        })    
            //    })
            //    .catch(err => console.log(err))
        } else {
            return
        }
    }

    handleClick(){
        this.setState((prevState, props) => {
            return { showabc: !prevState.showabc } 
        })
    }
    
    handlePlayer(){
        //this.props.handlePlayer(this.state.videoid)
        this.setState((prevState, props) => {
            return { showlist: !prevState.showlist } 
        })
    }

    render(){
        const {tune} = this.props
        const {svg} = this.state
     
        return (
            <div>
                <div className={styles.btnbar}>
                    <div onClick={this.handlePlayer} className={styles.abc_btn}>
                        <FaYoutubePlay/> <span>Youtube</span>
                    </div>
                    <div onClick={this.handleClick} className={styles.abc_btn}>
                        <FaMusic/> <span>Abc</span>
                    </div>
                </div>

                {this.state.showlist ? (
                    <Flip handlePlayer={this.props.handlePlayer} tuneid={this.props.tune.id} rhythm={this.props.rhythm}/>  
                ) : (null)}
                
                {tune && this.state.showabc ? (
                    <div className={styles.abc}>
                        <div className={styles.abc_header}>
                            <p>X:<span>{tune.id}</span></p>
                            <p>T:<span>{tune.T}</span></p>
                            <p>R:<span>{tune.R}</span></p>
                            <p>M:<span>{tune.M}</span></p>
                            <p>K:<span>{tune.K}</span></p>
                            {tune.body}
                        </div>
                    </div>
                ) : (null)}

                {svg ?(
                    <Svg svg={svg}/>
                ) : (
                    <div>
                        Loading...
                    </div>
                )}
            </div>
        )
    }
}
